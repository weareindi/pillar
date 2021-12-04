/* eslint no-var: 0 */

/**
 * Cut the mustard
 * Read: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard for more information
 */
(function () {
    if (!window.ctm) {
        window.ctm = {};
    }

    var self = window.ctm;

    self.construct = function () {
        self.getSurfaces();

        if (self.validEnvironment()) {
            return self.registerEnhanced();
        }

        // The user has javascript but their browser doesn't meet our enhanced requirements
        return self.registerCore();
    };

    self.validEnvironment = function () {
        if (self.coreRequired() || !('querySelector' in document && 'localStorage' in window && 'addEventListener' in window)) {
            return false;
        }

        return true;
    };

    self.coreRequired = function (required) {
        // If parameter passed then we save state and reload page
        if (typeof required !== 'undefined') {
            window.localStorage.setItem('core', required);
            location.reload();
        }

        // Check localstorage and return value
        return JSON.parse(window.localStorage.getItem('core')) ? true : false;
    };

    self.getSurfaces = function () {
        self.surfaces = {
            html: document.getElementsByTagName('html')[0],
            head: document.getElementsByTagName('head')[0],
            body: document.getElementsByTagName('body')[0]
        };
    };

    self.registerEnhanced = function () {
        self.surfaces.html.className += ' enhanced';
        self.appendStylesheet(window.themeDir + '/_assets/css/enhanced.css?v=' + window.themeVersion);
        self.appendScript(window.themeDir + '/_assets/js/script.js?v=' + window.themeVersion);
    };

    self.registerCore = function () {
        self.appendStylesheet(window.themeDir + '/_assets/css/core.css?v=' + window.themeVersion);
    };

    self.appendStylesheet = function (src) {
        var element = document.createElement('link');
        element.rel = 'stylesheet';
        element.type = 'text/css';
        element.href = src;
        self.surfaces.head.appendChild(element);
    };

    self.appendScript = function (src) {
        var element = document.createElement('script');
        element.src = src;
        element.defer = true;
        self.surfaces.body.appendChild(element);
    };

    self.construct();
})();
