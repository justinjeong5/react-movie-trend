import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import wrapper from './store/configureStore';

import LandingPage from './components/views/LandingPage/LandingPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import Auth from './hoc/auth'
import LoadingPage from './components/views/LoadingPage/LoadingPage';
import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer'
import MovieDetailPage from './components/views/MovieDetailPage/MovieDetailPage'
import FavoritePage from './components/views/FavoritePage/FavoritePage'

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Router>
        <NavBar />
        <div style={{ paddingTop: '49px', minHeight: 'calc(100vh - 80px)' }} >
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, true)} />
            <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default wrapper.withRedux(App);
