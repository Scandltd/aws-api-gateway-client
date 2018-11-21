import AWS from 'aws-sdk';

/**
 *
 */
class AwsApiGateway
{
    /**
     *
     * @param accessKey
     * @param secretKey
     * @param region
     */
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

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    createRestApi = (params) => {
        return this._client.createRestApi(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    deleteRestApi = (params) => {
        return this._client.deleteRestApi(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    updateRestApi = (params) => {
        return this._client.updateRestApi(params).promise();
    };
}

export default AwsApiGateway;