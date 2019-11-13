import React from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';
import { routes } from '../constants/routes'

interface StateProps {
  hasSeenTutorial: boolean;
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial }) => {
  return hasSeenTutorial ? <Redirect to={routes.schedule.path} /> : <Redirect to={routes.tutorial.path} />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrTutorial
});