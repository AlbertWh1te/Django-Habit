import React from "react";

const userContext = React.createContext({
    user: false,
    logoutUser: false
});

export {
    userContext
};