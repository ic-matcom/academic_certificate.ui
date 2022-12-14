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
    chaincode: {
        name: string;
        channel: string;
        signer: string; 
    };
}

function getConfig (): IConfig {
    return {
        site: {
            api: 'http://localhost:7001/',
            name: 'academic_certificate.dapp-go',
            current_version: 1,
        },
        auth: {
            grand_type: 'password',                     // Oauth2 flow
        },
        chaincode: {
            name: 'certificate',
            channel: 'mychannel',
            signer: 'User1'
        }
    };
}

const config = getConfig();
export default config;
