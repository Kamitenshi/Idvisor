# Description

## Architecture

* lrdf-idvisor-back: back express server to query database
* lrdf-idvisor-front: front app
* lrdf-idvisor-model: shared models between front and back

## Required technologies

* Node: 12.13.1
* Yarn: 1.19.2

## How to use

1. Install dependencies: `yarn`
2. Launch back: `npm run start-back`
3. Launch front: `npm run start-front`

## Must read before development

### Manipulating data

!!!SHOULD BE USED FOR ANY TYPE OF DATA, EVEN STATIC ONES!!!

In order to manipulate data, Redux is available in the project.
Here are the steps to use data:
1. Create a model in a new file: `data/models`
2. Add it to SessionsState: `data/sessions/sessions.state.ts`
3. Get the data in: `data/dataApi.ts`
4. Make the data available with a selector: `data/selectors.ts`
5. Use `connect` and `mapStateToProps` to pass it to your component

*Nota bene*: A simple example can be found in  `pages/Home.tsx` with the Slides component.