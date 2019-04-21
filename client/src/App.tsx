import React, { useEffect, useState, ReactPropTypes, createContext } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Header from './containers/Header';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from './services/theme';
import { User } from '../../sharedTypes/user.type';
import PageQuestionsList from './routes/PageQuestionsList';
import PageQuestion from './routes/PageQuestion';
import Notification from './components/Notification';

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

type AppContext = {
  User: User;
  notification?: Function;
}

export const UserContext = createContext({} as AppContext);

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');

  const [user, setUser] = useState<User>({
    image: "https://www.wittenberg.edu/sites/default/files/2017-11/nouser_0.jpg",
    points: 0,
    _id: "5cb39b8141827e61cc786a14",
    name: "Lukas Deanshaw",
    createdAt: new Date()
  });
  useEffect(() => {
    setUserAuthenticated(true);
  }, []);
  
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <UserContext.Provider value={{User: user, notification: (text: string): void => setNotification(text)}}>
        <BrowserRouter>
          <Header />
          {notification ? <Notification text={notification} close={() => setNotification('')}/> : null}
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