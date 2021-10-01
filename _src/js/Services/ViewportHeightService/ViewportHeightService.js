import vhCheck from 'vh-check';

export class ViewportHeightService {
    /**
     * Run the 'vhCheck' script
     * https://github.com/Hiswe/vh-check
     */
    register() {
        return new Promise((resolve, reject) => {
            return resolve(vhCheck());
        });
    }
}
