import { calendar, contacts, help, informationCircle, logIn, logOut, map, person, personAdd } from 'ionicons/icons';

export const routes = {
  schedule: { title: 'Schedule', path: '/tabs/schedule', icon: calendar },
  speakers: { title: 'Speakers', path: '/tabs/speakers', icon: contacts },
  map: { title: 'Map', path: '/tabs/map', icon: map },
  about: { title: 'About', path: '/tabs/about', icon: informationCircle },
  account: { title: 'Account', path: '/account', icon: person },
  support: { title: 'Support', path: '/support', icon: help },
  logout: { title: 'Logout', path: '/logout', icon: logOut },
  login: { title: 'Login', path: '/login', icon: logIn },
  signup: { title: 'Signup', path: '/signup', icon: personAdd },
  tutorial: { path: '/tutorial' },
  tabs: { path: '/tabs' },
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