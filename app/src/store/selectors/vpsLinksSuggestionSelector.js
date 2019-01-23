import { createSelector } from 'reselect'
import { map } from "lodash";

const getVpcLinks = (state, props) => state.entries.vpcLinks[props.accountId];

const getVpcLinksSuggestion = createSelector(
    [getVpcLinks],
    (vpcLinks) => {
        if(!vpcLinks) {
            return null;
        }

        return map(vpcLinks, (value, key) => {
            return {
                label: `${value.name} (${value.status})`,
                value: value.id,
            };
        });
    }
);

export default getVpcLinksSuggestion;
