class OffloadServiceWorker {
    constructor() {
        this.registerListeners();
    }

    /**
     * [registerData description]
     * @return {[type]} [description]
     */
    registerListeners() {
        return new Promise((resolve, reject) => {
            self.onmessage = (event) => {
                if (typeof event.data === 'undefined') {
                    return reject('No data supplied');
                }

                if (event.data.event === 'processUrl' && event.data.dataset.url !== 'undefined') {
                    this.processDatasetUrl(event.data.dataset)
                        .then((dataset) => {
                            return self.postMessage({
                                event: 'processedUrl',
                                dataset: dataset
                            })
                        });
                }
            }
        });
    }

    /**
     * [processDatasetUrl description]
     * @param {[type]} dataset  [description]
     */
    processDatasetUrl(dataset) {
        return fetch(dataset.url)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                dataset.bloburl = URL.createObjectURL(blob);

                return dataset;
            });
    }
}

new OffloadServiceWorker();
