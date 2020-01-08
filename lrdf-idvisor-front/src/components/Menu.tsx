import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { Role } from 'lrdf-idvisor-model';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../app/rootReducer';
import { getRole, logout } from '../features/session/sessionSlice';
import { AppPage } from './PageWithMenu';


interface MenuProps extends RouteComponentProps {
  appPages: AppPage[]
  role: Role
}

const Menu: React.FunctionComponent<MenuProps> = ({ appPages, role }) => {
  const dispatch = useDispatch()

  const buttonLogout = () => {
    dispatch(logout())
  }

  return (
    <IonMenu type="overlay" contentId='menucontent'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id='menucontent'>
        <IonList>
          {appPages.map((appPage, index) => {
            if (!appPage.role || appPage.role === role)
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem routerLink={appPage.url} routerDirection="forward">
                    <IonIcon slot="start" icon={appPage.icon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              )
            else return null;;
          })}
          <IonMenuToggle key={appPages.length} autoHide={false}>
            <IonItem onClick={buttonLogout} href={'/'} routerDirection="none">
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>Se déconnecter</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

const mapToProps = (state: RootState) => ({
  role: getRole(state)
})

export default connect(mapToProps)(withRouter(Menu))
