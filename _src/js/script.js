// Functions
import fetchInject from 'fetch-inject';

// Services
import { WebFontService } from './Services/WebFontService/WebFontService.js';
import { ViewportHeightService } from './Services/ViewportHeightService/ViewportHeightService.js';

// Run
Promise.all([
    new WebFontService().register(),
    new ViewportHeightService().register()
])
    .then(() => {
        return fetchInject([
            `${window.themeDir}/_assets/js/additional.js?v=${window.themeVersion}`
        ]);
    })
    .catch((error) => {
        console.error(error);
    });
