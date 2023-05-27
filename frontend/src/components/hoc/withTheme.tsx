import { useSelector } from "react-redux";
import { IRootReducer } from "~/types/types";
import React from "react";

interface IInjectedProps {
    theme: string;
    [prop: string]: any;
}

const withTheme = <P extends IInjectedProps>(Component: any) => {
    return (props: Pick<P, Exclude<keyof P, keyof IInjectedProps>>) => {
        const theme = useSelector((state: IRootReducer) => state.settings.theme);

        return <Component {...props as P} theme={theme} />
    }
};

export default withTheme;

