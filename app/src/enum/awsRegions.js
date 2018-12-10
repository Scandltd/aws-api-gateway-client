import { mapKeys } from 'lodash';

const AWS_REGIONS = {
    usEast2: "us-east-2",
    usEast1: "us-east-1",
    usWest1: "us-west-1",
    usWest2: "us-west-2",
    apSouth1: "ap-south-1",
    apNortheast3: "ap-northeast-3",
    apNortheast2: "ap-northeast-2",
    apSoutheast1: "ap-southeast-1",
    apSoutheast2: "ap-southeast-2",
    apNortheast1: "ap-northeast-1",
    caCentral1: "ca-central-1",
    cnNorth1: "cn-north-1",
    cnNorthwest1: "cn-northwest-1",
    euCentral1: "eu-central-1",
    euWest1: "eu-west-1",
    euWest2: "eu-west-2",
    euWest3: "eu-west-3",
    saEast1: "sa-east-1",
    usGovEast1: "us-gov-east-1",
    usGovWest1: "us-gov-west-1"
};

export default AWS_REGIONS;

/**
 *
 * @returns {*}
 */
export const getAwsRegionsOptionsList = function() {
    return mapKeys(AWS_REGIONS, function(value, key){
        return key;
    });
};
