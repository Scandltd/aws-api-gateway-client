import AWS from 'aws-sdk';

class AwsApiGateway
{
    constructor(accessKey, secretKey, region) {
        this._client = new AWS.APIGateway({
            region: region,
            apiVersion: '2015-07-09',
            credentials: {
                accessKeyId: accessKey, 
                secretAccessKey: secretKey
            }
        });
        console.log({
            region: region,
            apiVersion: '2015-07-09',
            credentials: {
                accessKeyId: accessKey, 
                secretAccessKey: secretKey
            }
        });
    }

    /**
     * 
     */
    getApiList = () => {
        return this._client.getRestApis().promise();
    }
}

export default AwsApiGateway;