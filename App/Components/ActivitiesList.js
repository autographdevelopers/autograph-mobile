import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import moment from 'moment/moment';

import { FETCHING_STATUS } from '../Lib/utils';
import { Fonts, Colors } from '../Themes/index';
import ActivityListItem from './ActivitiesListItem';

export default ActivitiesList = ({ scrollEnabled, activities, fetchingStatus }) => {

  const sortedActivities = () =>
    activities.sort((activity1, activity2) =>
      moment(activity1.created_at).isBefore(activity2.created_at)
    )

  const renderActivities = () => {
    if (fetchingStatus === FETCHING_STATUS.READY || fetchingStatus === FETCHING_STATUS.SUCCESS) {
      return (
        <FlatList
          scrollEnabled={scrollEnabled}
          data={sortedActivities()}
          renderItem={({item, index}) => (
            <ActivityListItem activity={item}
                              onPress={() => {}}/>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(element, _) => `activity-${element.id}`}
          ListEmptyComponent={
            <Text style={styles.emptyActivities}>
              Brak aktywności
            </Text>
          }
        />
      )
    }
  }

  return (
    <View style={{flex: 1}}>
      {renderActivities()}
    </View>
  )
};

const styles = StyleSheet.create({
  emptyActivities: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    fontWeight: '500',
    alignSelf: 'center',
    margin: 15
  }
});
