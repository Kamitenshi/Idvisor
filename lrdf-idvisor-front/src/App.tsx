import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ProtectedRoute from './features/session/ProtectedRoute';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Sign from './pages/Sign';
import UniversityCreation from './pages/UniversityCreation';
import UniversityPage from './pages/UniversityPage';
import WorkshopPage from './pages/Workshop';
/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/sign/:type" component={Sign} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute path="/chat" component={Chat} />
        <Route path="/workshop" component={WorkshopPage} />
        <Route path="/search" component={Search} />
        <Route path="/university" component={UniversityCreation} exact={true} />
        <Route path="/university/page/:name" component={UniversityPage} />
        <Route path="/" render={() => <Redirect to="/workshop" />} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
