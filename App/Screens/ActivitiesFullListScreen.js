/** == Built-in modules ====================================== */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
/** == Components ====================================== */
import ActivitiesList from '../Components/ActivitiesList';
/** == HOCs ====================================== */
import withRequiredData from '../HOC/withRequiredData';
/** == Action Creators ====================================== */
import { activitiesFullListScreenScreenActionCreators } from '../Redux/Views/ActivitiesFullListScreenRedux';
/** == Selectors ====================================== */
import { getFullListActivities } from '../Selectors/Activities';
/** == Styles ====================================== */
import listProjectorStyles from '../Styles/ListProjector';

class ActivitiesFullListScreen extends Component {
  componentWillUnmount() {
    this.props.resetListState();
  }

  loadMore = () => {
    if (this.props.endReached || this.props.fetchingMore) return;

    this.props.requestMoreActivities({ page: this.props.nextPage });
  };

  render() {
    const { activitiesData, fetchingMore } = this.props;

    return (
      <ActivitiesList
        activities={activitiesData}
        fetchingMore={fetchingMore}
        onEndReached={this.loadMore}
      />
    )
  }
}

const mapStateToProps = state => ({
  activitiesData: getFullListActivities(state),
  status: state.views.activitiesFullListScreen.status,
  endReached: state.views.activitiesFullListScreen.endReached,
  fetchingMore: state.views.activitiesFullListScreen.fetchingMore,
  nextPage: state.views.activitiesFullListScreen.nextPage
});

const mapDispatchToProps = (dispatch, otherProps) => {
  const navParams = otherProps.navigation.state.params;
  const activitiesParams = (navParams && navParams.activitiesParams) || {};
  const initScreenParams = {
    payloads: { activitiesPayload: { params: { page: 1, ...activitiesParams } } }
  };

  return {
    requestData: () => dispatch(activitiesFullListScreenScreenActionCreators.requestDataForView(
      initScreenParams
    )),
    requestMoreActivities: params => dispatch(activitiesFullListScreenScreenActionCreators.requestMoreActivities(
      { ...activitiesParams, ...params }
    )),
    resetListState: () => dispatch(activitiesFullListScreenScreenActionCreators.resetState())
  }
};

const withAsyncLoading = withRequiredData(
  ActivitiesFullListScreen,
  'status',
  'requestData',
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
