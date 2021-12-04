// Functions
import fetchInject from 'fetch-inject';

// Services
import { WebFontService } from './Services/WebFontService/WebFontService';
import { ViewportHeightService } from './Services/ViewportHeightService/ViewportHeightService';

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
