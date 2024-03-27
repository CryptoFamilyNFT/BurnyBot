class DataHelper {
    // Method to retrieve data based on a switch
    public static getEndpoint(dev: boolean): any {
        switch (dev) {
            case true:
                return 'http://localhost:3000/';
            case false:
                return 'https://api.burny.io/';
            default:
                throw new Error('Invalid switch value');
        }
    }
}

export default DataHelper;