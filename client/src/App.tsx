import React, { useEffect, useState, ReactPropTypes } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Header from './containers/Header';
import PageQuestions from './routes/PageQuestions';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from './services/theme';

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

const Scoreland = () => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setUserAuthenticated(true);
  }, []);
  
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <BrowserRouter>
        <Header />
        <Switch>
          {/* <Route path="/login" render={(props) => <Login {...props} setAuth={(e: any) => setUserAuthenticated(e)} />} /> */}
          {/* <Route path="/register" render={(props: ReactPropTypes) => <Register {...props} />} /> */}
          {/* <Route path="/auth" render={(props: ReactPropTypes) => <Auth {...props} />} /> */}
          <PrivateRoute authed={userAuthenticated} path="/questions" component={PageQuestions} />
          {/* <PrivateRoute authed={userAuthenticated} path="/game/:id" component={GamePage} /> */}
          <Redirect from="/" to='/questions' />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
};
/* <Redirect from="/" to='/library' />
<Route component={NotFound}></Route> */
export default Scoreland;