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
    }

    /**
     *
     * @returns {Promise<PromiseResult<APIGateway.RestApis, AWSError>>}
     */
    fetchApiList = () => {
        return this._client.getRestApis().promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    fetchApiResources = (params) => {
        return this._client.getResources(params).promise();
    };

}

export default AwsApiGateway;