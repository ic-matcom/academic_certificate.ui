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
            api: 'http://localhost:7000/',
            name: 'Un2x3',
            current_version: 1,
        },
        auth: {
            grand_type: 'password',                     // Oauth2 flow
        },
    };
}

const config = getConfig();
export default config;
