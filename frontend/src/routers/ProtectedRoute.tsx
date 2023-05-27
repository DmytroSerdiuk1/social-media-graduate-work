import { Redirect, Route } from "react-router-dom";
import withAuth from "~/components/hoc/withAuth";
import { LOGIN } from "~/constants/routes";
import { RouteProps} from "react-router";
import { FC } from "react";

interface IProps extends RouteProps {
    component: any;
    isAuth: boolean;
}

const ProtectedRoute: FC<IProps> = ({ isAuth, component: Component, path, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props: any) => {
                return isAuth ? <Component {...props} /> : <Redirect to={LOGIN} />
            }}
        />
    );
}

export default withAuth(ProtectedRoute);
