import React, { useEffect, useState, ReactPropTypes, createContext } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Header from './containers/Header';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './services/theme';
import { User } from '../../sharedTypes/user.type';
import PageQuestionsList from './routes/PageQuestionsList';
import PageQuestion from './routes/PageQuestion';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props: any) => authed
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export const UserContext = createContext({} as User);

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    image: "https://www.wittenberg.edu/sites/default/files/2017-11/nouser_0.jpg",
    points: 5,
    _id: "5cb39a7d41827e61cc786a13",
    name: "Juozas Rastenis",
    createdAt: new Date()
  });
  
  useEffect(() => {
    setUserAuthenticated(true);
  }, []);
  
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Header />
          <Switch>
            {/* <Route path="/login" render={(props) => <Login {...props} setAuth={(e: any) => setUserAuthenticated(e)} />} /> */}
            {/* <Route path="/register" render={(props: ReactPropTypes) => <Register {...props} />} /> */}
            {/* <Route path="/auth" render={(props: ReactPropTypes) => <Auth {...props} />} /> */}
            <PrivateRoute authed={userAuthenticated} path="/questions/:id" component={PageQuestion} />
            <PrivateRoute authed={userAuthenticated} path="/questions" component={PageQuestionsList} />
            {/* <PrivateRoute authed={userAuthenticated} path="/game/:id" component={GamePage} /> */}
            <Redirect from="/" to='/questions' />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  )
};
/* <Redirect from="/" to='/library' />
<Route component={NotFound}></Route> */
export default App;