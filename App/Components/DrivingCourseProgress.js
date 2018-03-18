import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, Colors } from '../Themes/index';
import { FETCHING_STATUS } from '../Lib/utils';
import SpinnerView from '../Components/SpinnerView';

import {
  isDrivingSchoolRelationActive,
  isDrivingSchoolAwaitingActivation,
  isDrivingSchoolRelationPending
} from '../Lib/DrivingSchoolHelpers';

export default DrivingCourseProgress = ({ drivingCourse }) => {
  const { status, data } = drivingCourse

  return (
    <View style={styles.container}>
      { (status === FETCHING_STATUS.READY || status === FETCHING_STATUS.SUCCESS) &&
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>Dostępne godziny:</Text>
          <Text style={styles.hoursIndicator}>{data.available_hours}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Przejeżdżone godziny:</Text>
          <Text style={styles.hoursIndicator}>{data.used_hours}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Zarezerwowane godziny:</Text>
          <Text style={styles.hoursIndicator}>{data.booked_hours}</Text>
        </View>
      </View>
      }

      { status === FETCHING_STATUS.FETCHING &&
      <ActivityIndicator color={Colors.primaryWarm}
                         size={'large'}
                         style={{alignSelf: 'center'}} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    marginLeft: 15,
    height: 70
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: Fonts.size.small,
    color: Colors.strongGrey,
    fontWeight: '400',
    marginRight: 5
  },
  hoursIndicator: {
    fontSize: Fonts.size.small,
    fontWeight: '400'
  }
});
