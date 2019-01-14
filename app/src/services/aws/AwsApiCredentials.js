// import AWS from 'aws-sdk';

class AwsApiCredentials {
    static authenticate(data) {
        return Promise.resolve({
            "id": "10",
            "name": "Zhenya's account auth",
            "credentials": {
                "accessKeyId": "AKIAI6BK3DWBGMTMK4CQ",
                "secretAccessKey": "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",
                "region": "eu-west-1"
            }
        },);
    }
}

export default AwsApiCredentials;