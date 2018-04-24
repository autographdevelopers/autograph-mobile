import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import moment from 'moment/moment';

import { FETCHING_STATUS } from '../Lib/utils';
import { Fonts, Colors } from '../Themes/index';
import ActivityListItem from './ActivitiesListItem';

export default ActivitiesList = ({
                                   scrollEnabled,
                                   activities,
                                   fetchingStatus,
                                   customListStyle = {},
                                   customListWrapperStyle = {},
                                   onEndReached = () => {} }) => {
  const renderActivities = () => {
    if (fetchingStatus === FETCHING_STATUS.READY || fetchingStatus === FETCHING_STATUS.SUCCESS) {
      return (
        <FlatList
          scrollEnabled={scrollEnabled}
          contentContainerStyle={customListStyle}
          data={activities}
          renderItem={({item, index}) => (
            <ActivityListItem activity={item}
                              onPress={() => {}}/>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(element) => `activity-${element.id}`}
          ListEmptyComponent={
            <Text style={styles.emptyActivities}>
              Brak aktywności
            </Text>
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0}
        />
      )
    }
  }

  return (
    <View style={customListWrapperStyle}>
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
