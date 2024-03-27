/**
 * DataHelper class
 * @class DataHelper
 * @classdesc DataHelper class to get the endpoint based on the environment
 * @public getEndpoint - Method to get the endpoint based on the environment
 * @param dev - boolean - Development environment flag
 * @returns string - Endpoint URL
 */
class DataHelper {
    public static getEndpoint(dev: boolean): any {
        switch (dev) {
            case true:
                return 'http://localhost:3000';
            case false:
                return 'https://api.burny.io/';
            default:
                throw new Error('Invalid switch value');
        }
    }
}

export default DataHelper;