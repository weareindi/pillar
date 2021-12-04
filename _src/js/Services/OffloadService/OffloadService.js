import packageInfo from '../../../../package.json';
import { OffloadSurfaceService } from './OffloadSurfaceService';

export class OffloadService {
    constructor(options) {
        // doesn't support web workers? bail
        if (!this.supportsWorkers()) {
            return;
        }

        // prepare options
        const defaults = {
            path: '',
            version: packageInfo.version
        };

        // update options with user defined parameters
        this.options = Object.assign(defaults, options);

        // init
        this.processContainer(document.body)
            .then(() => {
                return this.registerBinds();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * [supportsWorkers description]
     * @return {[type]} [description]
     */
    supportsWorkers() {
        return ('Worker' in window);
    }

    /**
     * [processContainer description]
     * @param  {[type]} container               [description]
     * @return {[type]}           [description]
     */
    processContainer(container) {
        return this.getSurfaces(container)
            .then((surfaces) => {
                return this.processSurfaces(surfaces);
            });
    }

    /**
     * [getSurfaces description]
     * @param  {[type]} container               [description]
     * @return {[type]}           [description]
     */
    getSurfaces(container) {
        return new Promise((resolve, reject) => {
            const surfaces = container.querySelectorAll('[offload]');

            // bail if no offload matches
            if (!surfaces.length) {
                return;
            }

            return resolve(surfaces);
        });
    }

    /**
     * [processSurfaces description]
     * @param  {[type]} surfaces               [description]
     * @return {[type]}          [description]
     */
    processSurfaces(surfaces) {
        const promises = [];

        surfaces.forEach((surface, i) => {
            const promise = new Promise((resolve, reject) => {
                return resolve(new OffloadSurfaceService(this.options, surface));
            });

            promises.push(promise);
        });

        return Promise.all(promises);
    }

    /**
     * [registerBinds description]
     * @return {[type]} [description]
     */
    registerBinds() {
        // observe dom
        const observer = new MutationObserver((mutations, observer) => {
            mutations.forEach((mutation, i) => {
                this.processContainer(mutation.target)
                    .catch((error) => {
                        console.error(error);
                    });
            });
        });
        observer.observe(document.body, {
            attributes: false,
            childList: true,
            subtree: true
        });
    }
}
