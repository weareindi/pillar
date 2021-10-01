export class OffloadSurfaceService {
    constructor(options, surface) {
        // register local options
        this.options = options;

        // register local surface
        this.surface = surface;

        // intersecting
        this.intersecting = false;

        // current dataset
        this.current = 0;

        // init
        this.registerDatasets()
            .then(() => {
                return Promise.all([
                    this.registerWorker(),
                    this.registerIntersectionObserver(),
                    this.registerWorkerListener(),
                    this.registerMediaQueryListener()
                ]);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * [registerWorker description]
     * @return {[type]} [description]
     */
    registerWorker() {
        return new Promise((resolve, reject) => {
            // create worker
            this.worker = new Worker(`${this.options.path}OffloadServiceWorker.js?v=${this.options.version}`);

            return resolve();
        });
    }

    /**
     * [registerObserver description]
     * @return {[type]} [description]
     */
    registerIntersectionObserver() {
        return new Promise((resolve, reject) => {
            // is element in view?
            const observer = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];

                    if (entry.isIntersecting) {
                        this.isIntersecting = true;
                        this.processImage();
                    } else {
                        this.isIntersecting = false;
                    }
                }
            }, {
                threshold: 0,
                rootMargin: '100px'
            });
            observer.observe(this.surface);

            return resolve();
        });
    }

    /**
     * [processImage description]
     * @return {[type]} [description]
     */
    processImage() {
        this.getCurrentDataset()
            .then((dataset) => {
                if (!this.hasBlob(dataset)) {
                    return this.getBlob(dataset);
                }

                return this.setStyle(dataset);
            });
    }

    /**
     * [hasBlob description]
     * @return {Boolean} [description]
     */
    hasBlob(dataset) {
        if (typeof dataset.bloburl !== 'undefined') {
            return true;
        }

        return false;
    }

    /**
     * [getBlob description]
     * @return {[type]} [description]
     */
    getBlob(dataset) {
        return new Promise((resolve, reject) => {
            return this.worker.postMessage({
                event: 'processUrl',
                dataset: dataset
            });
        });
    }

    /**
     * [isIntersecting description]
     * @return {Boolean} [description]
     */
    isIntersecting() {
        return new Promise((resolve, reject) => {
            return resolve(this.intersecting);
        });
    }

    /**
     * [registerWorkerListener description]
     * @return {[type]} [description]
     */
    registerWorkerListener() {
        return new Promise((resolve, reject) => {
            this.worker.addEventListener('message', (event) => {
                if (typeof event.data === 'undefined') {
                    return reject('No data returned');
                }

                if (typeof event.data.event === 'undefined') {
                    return reject('No event returned');
                }

                if (event.data.event === 'processedUrl' && typeof event.data.dataset !== 'undefined') {
                    return this.updateDatasets(event.data.dataset)
                        .then(() => {
                            return this.getCurrentDataset();
                        })
                        .then((dataset) => {
                            return this.setStyle(dataset);
                        });
                }
            });

            return resolve();
        });
    }

    /**
     * [updateDataset description]
     * @param {[type]} newDataset  [description]
     */
    updateDatasets(newDataset) {
        return new Promise((resolve, reject) => {
            this.datasets = this.datasets.map((dataset) => {
                if (dataset.uid === newDataset.uid) {
                    return newDataset;
                }

                return dataset;
            });

            return resolve();
        });
    }

    /**
     * [registerMediaQueryListener description]
     * @return {[type]}             [description]
     */
    registerMediaQueryListener() {
        return this.getMediaQueries()
            .then((mqs) => {
                mqs.forEach((mq, i) => {
                    mq.addEventListener('change', (event) => {
                        if (!this.isIntersecting) {
                            return;
                        }

                        return this.processImage();
                    });
                });

                return Promise.resolve();
            });
    }

    /**
     * [registerDatasets description]
     * @param  {[type]} surface               [description]
     * @return {[type]}         [description]
     */
    registerDatasets() {
        return this.getDatasets()
            .then((datasets) => {
                return this.sortDatasets(datasets);
            })
            .then((datasets) => {
                return this.datasets = datasets;
            });
    }

    /**
     * [getDatasets description]
     * @param  {[type]} surface               [description]
     * @return {[type]}         [description]
     */
    getDatasets() {
        return new Promise((resolve, reject) => {
            // get json string
            const json = this.surface.getAttribute('offload');

            // convert to object
            const datasets = JSON.parse(json);

            // apply uids
            datasets.map((item, index) => {
                item.uid = index;
                return item;
            });

            // remove attribute so we dont process it again
            this.surface.removeAttribute('offload');
            this.surface.setAttribute('processed', JSON.stringify(datasets));

            // return object
            return resolve(datasets);
        });
    }

    /**
     * [sortDatasets description]
     * @param  {[type]} datasets               [description]
     * @return {[type]}             [description]
     */
    sortDatasets(datasets) {
        return new Promise((resolve, reject) => {
            datasets.sort((a, b) => {
                if (typeof a.minwidth === 'undefined') {
                    return -1;
                }

                if (parseFloat(a.minwidth) < parseFloat(b.minwidth)) {
                    return -1;
                }

                return 1;
            });

            return resolve(datasets);
        });
    }

    /**
     * [getMediaQueries description]
     * @return {[type]} [description]
     */
    getMediaQueries() {
        return new Promise((resolve, reject) => {
            const mqs = [];

            this.datasets.forEach((dataset, i) => {
                const minwidth = typeof dataset.minwidth !== 'undefined' ? dataset.minwidth : '0em';
                const mq = window.matchMedia(`(min-width: ${minwidth})`);
                mqs.push(mq);
            });

            return resolve(mqs);
        });
    }

    /**
     * [getBreakpoint description]
     * @return {[type]} [description]
     */
    getCurrentDataset() {
        return this.getCurrentMediaQuery()
            .then((mq) => {
                // find matching data result
                const dataset = this.datasets.find((dataset) => {
                    const datasetMinWidth = typeof dataset.minwidth !== 'undefined' ? parseInt(dataset.minwidth.replace(/\D/g,'')) : 0;
                    const mqMinWidth = parseInt(mq.media.replace(/\D/g,''));

                    if (datasetMinWidth === mqMinWidth) {
                        return true;
                    }

                    return false;
                });

                // return
                return dataset;
            })
    }

    /**
     * [getCurrentMediaQuery description]
     * @return {[type]} [description]
     */
    getCurrentMediaQuery() {
        return this.getMediaQueries()
            .then((mqs) => {
                // loop through in reverse so we capture the largest match first
                for (let i = mqs.length - 1; i >= 0; i--) {
                    const mq = mqs[i];

                    if (mq.matches) {
                        return mq;
                    }
                }
            });
    }

    /**
     * [setStyle description]
     * @param {[type]} dataset  [description]
     */
    setStyle(dataset) {
        return new Promise((resolve, reject) => {
            this.surface.style.paddingTop = `${dataset.ratio}%`;
            this.surface.style.backgroundImage = `url('${dataset.bloburl}')`;

            return resolve();
        });
    }
}
