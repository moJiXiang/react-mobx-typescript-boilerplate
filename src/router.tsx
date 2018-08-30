import dynamic from "dva/dynamic";
import { Route, routerRedux, Switch } from "dva/router";
import * as React from "react";

const { ConnectedRouter } = routerRedux;

export default function({ history, app }) {
    const App = dynamic({
        app,
        models: () => [
            import("./models/count"),
        ],
        component: () => import("./routes/App/App"),
    });

    const Home = dynamic({
        app,
        models: () => [
            import("./models/count"),
        ],
        component: () => import("./routes/Home/Home"),
    });

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/app" component={App} />
                <Route path="/home" component={Home} />
            </Switch>
        </ConnectedRouter>
    );
}
