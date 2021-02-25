import React from "react";
import {InternetLogTable, IntranetLogTable} from "../utils/log";

export const InternetOrder = () => {
    return (
        <InternetLogTable url={'/internet/query/payLog'}/>
    )
}
export const IntranetOrder = () => {
    return (
        <IntranetLogTable url={'/intranet/query/payLog'}/>
    )
}

