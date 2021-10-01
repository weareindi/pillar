export class WebFontService {
    register() {
        return Promise.all([
            this.loadFont('opensans', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap')
        ])
            .then((loaded) => {
                for (let i = 0; i < loaded.length; i++) {
                    const fontname = loaded[i];

                    document.documentElement.className += ` font--${fontname}`;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    loadFont(fontname, url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet preload';
            link.as = 'style';
            link.href = url;
            link.preload = true;
            link.addEventListener('load', () => {
                return resolve(fontname);
            });
            link.addEventListener('error', (error) => {
                return reject(error);
            });
            document.head.appendChild(link);
        });
    }
}
