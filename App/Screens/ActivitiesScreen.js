import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { activityActionCreators } from '../Redux/ActivityRedux';

import listProjectorStyles from '../Styles/ListProjector';
import ActivitiesList from '../Components/ActivitiesList';

class ActivitiesScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1
    }
  }

  componentWillMount() {
    this.props.fetchActivities({ page: this.state.page });
  }

  loadMore = () => {
    if (this.props.endReached) return;

    this.setState({ page: (this.state.page + 1) },
      () => this.props.fetchActivities({ page: this.state.page })
    )
  }

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
  activitiesData: state.activities.myActivitiesIds.map(id => state.activities.data[id]),
  endReached: state.activities.myActivitiesEndReached,
  activitiesFetchingStatus: state.activities.status
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: (params) => dispatch(activityActionCreators.myActivitiesRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesScreen)
