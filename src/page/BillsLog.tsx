import React from "react";

import {InternetLogTable,IntranetLogTable} from "../utils/log";


export const InternetBills = () => {
    return (
        <InternetLogTable url={'/internet/query/billLog'}/>
    )
}

export const IntranetBills = () => {
    return (
        <IntranetLogTable url={'/intranet/query/billLog'}/>
    )
}

