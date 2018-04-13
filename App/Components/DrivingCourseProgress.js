import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText, G, Circle, TSpan } from 'react-native-svg';
import moment from 'moment/moment';

import { Fonts, Colors } from '../Themes/index';
import { FETCHING_STATUS } from '../Lib/utils';

const PIE_CHART_WIDTH = 120;

export default DrivingCourseProgress = ({ drivingCourse, drivingLessonsData }) => {
  const calculateUsedHours = () =>
    drivingLessonsData.filter(drivingLesson =>
      drivingLesson.status === 'active' && moment().isAfter(drivingLesson.start_time)
    ).reduce((slotsCount, drivingLesson) => {
        return slotsCount + drivingLesson.slots.length
      }, 0) * 0.5

  const calculateBookedHours = () =>
    drivingLessonsData.filter(drivingLesson =>
      drivingLesson.status === 'active' && moment().isBefore(drivingLesson.start_time)
    ).reduce((slotsCount, drivingLesson) => {
        return slotsCount + drivingLesson.slots.length
      }, 0) * 0.5

  const { status, data } = drivingCourse;
  const availableHours = data.available_hours;
  const usedHours = calculateUsedHours();
  const bookedHours = calculateBookedHours();

  const divisor = availableHours + usedHours + bookedHours;
  let propgress;

  if(divisor === 0)
    propgress = 0.0
  else
    progress = parseInt((usedHours / divisor) * 100)

  const pieChartData = [
    {
      key: 1,
      amount: availableHours,
      svg: { fill: Colors.lightGrey }
    },
    {
      key: 2,
      amount: usedHours,
      svg: { fill: Colors.primaryWarm }
    },
    {
      key: 3,
      amount: bookedHours,
      svg: { fill: Colors.yellowLight }
    }
  ]

  return (
    <View>
      { (status === FETCHING_STATUS.READY || status === FETCHING_STATUS.SUCCESS) &&
      <View style={styles.container}>
        <PieChart
          style={{ width: PIE_CHART_WIDTH }}
          valueAccessor={({ item }) => item.amount}
          data={pieChartData}
          outerRadius={'92%'}
          innerRadius={'100%'}
          renderDecorator={({ item, pieCentroid, labelCentroid, index }) => (
            <G key={index}>
              <SvgText
                fill={Colors.strongGrey}
                fontWeight="300"
                textAnchor="middle">
                <TSpan fontSize={25}>
                  {progress}
                </TSpan>
                <TSpan fontSize={10} dy='10' x='0'>
                  % godzin
                </TSpan>
                <TSpan fontSize={10} dy='10' x='0'>
                  wykorzystanych
                </TSpan>
              </SvgText>
            </G>
          )}
        />
        <View style={styles.rightSegmentWrapper}>
          <View style={[styles.row, {borderLeftColor: Colors.lightGrey}]}>
            <Text style={styles.hoursIndicator}>{availableHours}</Text>
            <Text style={styles.text}>Dostępne godziny</Text>
          </View>
          <View style={[styles.row, {borderLeftColor: Colors.primaryWarm}]}>
            <Text style={styles.hoursIndicator}>{usedHours}</Text>
            <Text style={styles.text}>Przejeżdżone godziny</Text>
          </View>
          <View style={[styles.row, {borderLeftColor: Colors.yellowLight}]}>
            <Text style={styles.hoursIndicator}>{bookedHours}</Text>
            <Text style={styles.text}>Zarezerwowane godziny</Text>
          </View>
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
    flexDirection: 'row',
    height: PIE_CHART_WIDTH
  },
  rightSegmentWrapper: {
    justifyContent: 'space-around',
    marginLeft: 15,
  },
  row: {
    paddingLeft: 10,
    borderLeftWidth: 5
  },
  text: {
    fontSize: Fonts.size.small,
    color: Colors.strongGrey,
    fontWeight: '400',
    marginRight: 5
  },
  hoursIndicator: {
    fontSize: Fonts.size.regular,
    fontWeight: '400'
  }
});
