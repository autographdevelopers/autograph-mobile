import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { activityActionCreators } from '../Redux/Entities/ActivityRedux';

import listProjectorStyles from '../Styles/ListProjector';
import ActivitiesList from '../Components/ActivitiesList';
import withRequiredData from '../HOC/withRequiredData';
import { getMyActivites } from '../Selectors/Activities';
import { myActivitiesScreenActionCreators } from '../Redux/Views/MyActivitiesScreenRedux';

class ActivitiesScreen extends Component {
  loadMore = () => {
    if (this.props.endReached) return;

   this.props.fetchActivities({ page: this.props.nextPage });
  };

  render() {
    const { activitiesData, activitiesFetchingStatus } = this.props;

    return (
      <View style={{flex: 1}}>
        <ActivitiesList
          activities={activitiesData}
          fetchingStatus={activitiesFetchingStatus}
          scrollEnabled={true}
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
  activitiesData: getMyActivites(state),
  status: state.views.myActivitiesScreen.status,
  endReached: state.views.myActivitiesScreen.endReached,
  activitiesFetchingStatus: state.entities.activities.status,
  nextPage: state.views.myActivitiesScreen.nextPage
});

const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(myActivitiesScreenActionCreators.requestDataForView({ payloads: { activitiesPayload: { params: { page: 1 } }}})),
  fetchActivities: (params) => dispatch(activityActionCreators.myActivitiesRequest(params))
});

const withAsyncLoading = withRequiredData(
  ActivitiesScreen,
  'status',
  'requestData',
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
