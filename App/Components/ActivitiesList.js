import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { Fonts, Colors } from '../Themes/index';
import ActivityListItem from './ActivitiesListItem';

export default ActivitiesList = ({
                                   scrollEnabled,
                                   activities,
                                   fetchingStatus,
                                   fetchingMore = false,
                                   customListStyle = {},
                                   customListWrapperStyle = {},
                                   onEndReached = () => {} }) => {


  const renderFooter = () => {
    if(fetchingMore) {
      return <ActivityIndicator color={Colors.primaryWarm} size={'small'} style={{alignSelf: 'center', marginVertical: 10}} />
    } else {
      return null;
    }
  };

  return (
    <View style={customListWrapperStyle}>
      <FlatList
        contentContainerStyle={customListStyle}
        ListFooterComponent={renderFooter()}
        data={activities}
        renderItem={({item, index}) => (
          <ActivityListItem activity={item} onPress={() => {}}/>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={ element => `activity-${element.id}`}
        ListEmptyComponent={
          <Text style={styles.emptyActivities}>
            Brak aktywności
          </Text>
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
      />
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
