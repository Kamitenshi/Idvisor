import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { hammer } from 'ionicons/icons';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from '../data/connect';
import { setDarkMode } from '../data/user/user.actions';
import { pages } from '../constants/routes'


interface Pages {
  title: string,
  path: string,
  icon: { ios: string, md: string },
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode }) => {
  const [disableMenu, setDisableMenu] = useState(false);

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button routerLink={p.path} routerDirection="none">
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={disableMenu} contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>Navigate</IonListHeader>
          {renderlistItems(pages.appPages)}
        </IonList>
        <IonList>
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(pages.loggedInPages) : renderlistItems(pages.loggedOutPages)}
        </IonList>
        <IonList>
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem onClick={() => {
            setDisableMenu(true);
            history.push('/tutorial');
          }}>
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel>Dark Theme</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
