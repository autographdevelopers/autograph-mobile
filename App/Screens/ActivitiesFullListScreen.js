import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import listProjectorStyles from '../Styles/ListProjector';
import ActivitiesList from '../Components/ActivitiesList';
import withRequiredData from '../HOC/withRequiredData';
import { activitiesFullListScreenScreenActionCreators } from '../Redux/Views/ActivitiesFullListScreenRedux';
import { getFullListActivities } from '../Selectors/Activities';

class ActivitiesFullListScreen extends Component {
  componentWillUnmount() {
    this.props.resetListState();
  }

  loadMore = () => {
    if (this.props.endReached) return;

   this.props.requestMoreActivities({ page: this.props.nextPage });
  };

  render() {
    const { activitiesData, fetchingMore } = this.props;

    return (
      <View style={{flex: 1}}>
        <ActivitiesList
          activities={activitiesData}
          fetchingMore={fetchingMore}
          onEndReached={this.loadMore}
          customListStyle={[listProjectorStyles.containerStyle, styles.customListStyle]}
          customListWrapperStyle={styles.customListWrapperStyle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  customListStyle: {
    // margin: 15
  },
  customListWrapperStyle: {
    flex: 1
  }
});


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
