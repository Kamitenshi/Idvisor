import { calendar, contacts, help, informationCircle, logIn, logOut, map, person, personAdd } from 'ionicons/icons';

export const routes = {
  about: { title: 'About', path: '/tabs/about', icon: informationCircle },
  account: { title: 'Account', path: '/account', icon: person },
  home: { path: '/home'},
  login: { title: 'Login', path: '/login', icon: logIn },
  logout: { title: 'Logout', path: '/logout', icon: logOut },
  map: { title: 'Map', path: '/tabs/map', icon: map },
  schedule: { title: 'Schedule', path: '/tabs/schedule', icon: calendar },
  signup: { title: 'Signup', path: '/signup', icon: personAdd },
  speakers: { title: 'Speakers', path: '/tabs/speakers', icon: contacts },
  support: { title: 'Support', path: '/support', icon: help },
  tabs: { path: '/tabs' },
  tutorial: { path: '/tutorial' },
};

export const pages = {
  appPages: [
    routes.schedule,
    routes.speakers,
    routes.map,
    routes.about
  ],
  loggedInPages: [
    routes.account,
    routes.support,
    routes.logout
  ],
  loggedOutPages: [
    routes.login,
    routes.support,
    routes.signup
  ]
};