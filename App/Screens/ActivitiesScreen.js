import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { activityActionCreators } from '../Redux/ActivityRedux';

import listProjectorStyles from '../Styles/ListProjector';
import ActivitiesList from '../Components/ActivitiesList';

class ActivitiesScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchActivities({});
  }

  render() {
    const { activitiesData, activitiesFetchingStatus } = this.props;

    console.tron.log(activitiesData)

    return (
      <View style={{flex: 1}}>
        <ActivitiesList
          activities={activitiesData}
          fetchingStatus={activitiesFetchingStatus}
          scrollEnabled={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
  activitiesData: state.activities.myActivitiesIds.map(id => state.activities.data[id]),
  activitiesFetchingStatus: state.activities.status
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: (params) => dispatch(activityActionCreators.myActivitiesRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesScreen)
