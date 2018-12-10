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

    /**
     *
     * @param params
     *
     * @returns {Promise<ManagedUpload.SendData> | Promise<PromiseResult<D, E>> | string | Promise<any> | *}
     */
    getRestApi = (params) => {
        return this._client.getRestApi(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    deleteResource = (params) => {
        return this._client.deleteResource(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    createRestApiResource = (params) => {
        return this._client.createResource(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<APIGateway.Method, AWSError>>}
     */
    createRestApiMethod = (params) => {
        return this._client.putMethod(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    putIntegration = (params) => {
        return this._client.putIntegration(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    putMethodResponse = (params) => {
        return this._client.putMethodResponse(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    deleteMethod = (params) => {
        return this._client.deleteMethod(params).promise();
    };

    /**
     *
     * @param params
     *
     * @returns {Promise<PromiseResult<D, E>>}
     */
    getVpcLinks = (params) => {
        return this._client.getVpcLinks(params).promise();
    };
}

export default AwsApiGateway;