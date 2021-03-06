# Description

## Architecture

* lrdf-idvisor-back: back express server to query database
* lrdf-idvisor-front: front app
* lrdf-idvisor-model: shared models between front and back
* database: used for debugging purposes

## Required technologies

* Node: 12.13.1
* Yarn: 1.19.2

## Optional technologies

* Docker & docker-compose

## How to use

1. Install dependencies: `yarn`
2. Launch db: `cd dev-database && docker-compose up -d`
3. Launch back: `npm run start-back`
4. Launch front: `npm run start-front`

### Environment variables

Place .env files at the root of its project

*lrdf-idvisor-back*:
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_DB=postgres
SERVER_PORT=4000
PGADMIN_DEFAULT_EMAIL=test@test.fr
PGADMIN_DEFAULT_PASSWORD=test
FRONT_ADRESS=localhost:3000
```

*lrdf-idvisor-front*:
```
REACT_APP_BACK_ADRESS=localhost:4000
```

## Must read before development

### Manipulating data on Front Side

!!!SHOULD BE USED FOR ANY TYPE OF DATA, EVEN STATIC ONES!!!

In order to manipulate data, Redux is available in the project.
Here are the steps to use data:
1. Create a model in a new file: `data/models`
2. Add it to SessionsState: `data/sessions/sessions.state.ts`
3. Get the data in: `data/dataApi.ts`
4. Make the data available with a selector: `data/selectors.ts`
5. Use `connect` and `mapStateToProps` to pass it to your component

*Nota bene*: A simple example can be found in  `pages/Home.tsx` with the Slides component.

### Adding a library

1. Go to the right part of the project
2. For production libraries : `yarn add 'package'`
3. For development libraries : `yarn add 'package' --dev`

## Development accesses

### Front

* Port: 3000

### Backend

* Port: 4000

### Postgres

* Port: 5432
* user: postgres

*Nota bene*: command to connect `psql -U postgres` 

### PgAdmin

* Port: 8080
* mail: test@test.fr
* password: test

## Support

### Database

[tutorial](documentation : https://wanago.io/2019/01/14/express-postgres-relational-databases-typeorm/)


## Development Examples

### Selector

```
const sessionSelector = (state: RootState) => state.session

const username = createSelector(
  sessionSelector,
  session => {
    return session.username
  }
)
const mapState = (state: RootState) => ({
  username: username(state)
})
```