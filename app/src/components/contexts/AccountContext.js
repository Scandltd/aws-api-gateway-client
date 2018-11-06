import React from "react";

const AccountContext = React.createContext(
    {
        accounts: []
    } // default value
);

export default AccountContext;
