// file that acts like template for adapting the app to the running environment

interface IConfig {
    site: {
        name: string;
        api: string;
        current_version: number;
    };
    auth: {
        grand_type: string;
    };
}

function getConfig (): IConfig {
    return {
        site: {
            api: 'http://127.0.0.1:7001/',
            name: 'Dapp',
            current_version: 1,
        },
        auth: {
            grand_type: 'password',                     // Oauth2 flow
        },
    };
}

const config = getConfig();
export default config;
