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

    public static getBBB(devs: boolean) {
        switch (devs) {
            case true:
                return '0xafE766fEf41Dc0C07FEa5d23e888486a79b60b4d';
            case false:
                return '0xafE766fEf41Dc0C07FEa5d23e888486a79b60b4d'; // development addy
            default:
                throw new Error('Invalid switch value');
        }
    }

    public static getV2(devs: boolean) {
        switch (devs) {
            case true:
                return '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008';
            case false:
                return '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008'; // development addy
            default:
                throw new Error('Invalid switch value');
        }
    }
}

export default DataHelper;