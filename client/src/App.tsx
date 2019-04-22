import React, { useEffect, useState, ReactPropTypes, createContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "./containers/Header";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { theme } from "./services/theme";
import { User } from "../../sharedTypes/user.type";
import PageQuestionsList from "./routes/PageQuestionsList";
import PageQuestion from "./routes/PageQuestion";
import PageAuthentication from "./routes/PageAuthentication";
import decode from "jwt-decode";

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props: any) => (authed ? <Component {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />)}
        />
    );
}

const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    try {
        return decode(token);
    } catch (e) {
        return false;
    }
    return true;
};

type AppContext = {
    User: User;
    isLoggedIn: boolean;
};

export const AppContext = createContext({} as AppContext);

const App = () => {
    const [user, setUser] = useState<User>(checkAuth().user || ({} as User));
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!checkAuth().user);
    const afterLogin = () => {
        setUser(checkAuth().user);
        setIsLoggedIn(!!checkAuth().user);
    };
    return (
        <MuiThemeProvider theme={createMuiTheme(theme)}>
            <AppContext.Provider value={{ User: user, isLoggedIn }}>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/login" render={(props: any) => <PageAuthentication {...props} setAuth={() => afterLogin()} />} />
                        <PrivateRoute authed={checkAuth} path="/questions/:id" component={PageQuestion} />
                        <PrivateRoute authed={checkAuth} path="/questions" component={PageQuestionsList} />
                        {isLoggedIn ? <Redirect from="/" to="/questions" /> : <Redirect from="/" to="/login" />}
                    </Switch>
                </BrowserRouter>
            </AppContext.Provider>
        </MuiThemeProvider>
    );
};

export default App;
