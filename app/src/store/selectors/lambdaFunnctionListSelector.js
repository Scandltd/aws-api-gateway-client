import { createSelector } from 'reselect'

const getLambdaFunctions = (state, props) => state.list.lambdaFunction[props.accountId];

const getLambdaFunctionList = createSelector(
    [getLambdaFunctions],
    (lambdaFunctions) => {
        console.log('selector', lambdaFunctions);
        if (!lambdaFunctions) {
            return null;
        }

        return lambdaFunctions.map((item) => {
            return {
                label: item.FunctionName,
                value: item.FunctionArn,
            };
        });
    }
);

export default getLambdaFunctionList;
