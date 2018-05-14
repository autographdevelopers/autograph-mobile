import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import listProjectorStyles from '../Styles/ListProjector';
import ActivitiesList from '../Components/ActivitiesList';
import withRequiredData from '../HOC/withRequiredData';
import { getMyActivities } from '../Selectors/Activities';
import { myActivitiesScreenActionCreators } from '../Redux/Views/MyActivitiesScreenRedux';

class MyActivitiesScreen extends Component {
  loadMore = () => {
    if (this.props.endReached || this.props.fetchingMore) return;

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
  activitiesData: getMyActivities(state),
  status: state.views.myActivitiesScreen.status,
  endReached: state.views.myActivitiesScreen.endReached,
  fetchingMore: state.views.myActivitiesScreen.fetchingMore,
  nextPage: state.views.myActivitiesScreen.nextPage
});

const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(myActivitiesScreenActionCreators.requestDataForView({ payloads: { activitiesPayload: { params: { page: 1 } }}})),
  requestMoreActivities: params => dispatch(myActivitiesScreenActionCreators.requestMoreActivities(params))
});

const withAsyncLoading = withRequiredData(
  MyActivitiesScreen,
  'status',
  'requestData',
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
