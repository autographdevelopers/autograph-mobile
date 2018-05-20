import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fonts, Colors } from '../Themes/index';
import { PieChart } from 'react-native-svg-charts';
import ButtonText from '../Components/ButtonText';
import { slotHelper } from '../Lib/SlotHelpers';
import _ from 'lodash';
import moment from 'moment/moment';
import SectionHeader from './SectionHeader';

const MoreIndicator = () => (
  <View style={styles.dotsWrapper}>
    <View style={styles.dot}/>
    <View style={styles.dot}/>
    <View style={styles.dot}/>
  </View>
);

const SmallPill = ({ interval }) => (
  <View style={styles.intervalContainer}>
    <Text style={styles.intervalText}>{interval}</Text>
  </View>
);

const PIE_CHART_SIZE = 40;

export default EmployeeAvailabilitySummaryCell = ({ employee, slots, onCalendarPress }) => {
  const freeSlots = slots.filter(slot => slot.driving_lesson_id === null &&
    moment(slot.start_time).isAfter());
  const freeSlotIds = freeSlots.map(slot => slotHelper.hourToId(
    moment(slot.start_time).format(slotHelper.TIME_FORMAT)));
  const availableIntervals = slotHelper.summarizeDay(freeSlotIds);
  const lessonSlots = slots.filter(slot => slot.driving_lesson_id !== null);

  const lessonsCount = _.chain(lessonSlots)
                        .groupBy('driving_lesson_id')
                        .keys()
                        .value().length;

  const pieChartData = [
    {
      key: 1,
      svg: {
        fill: Colors.primaryWarm,
      },
      value: slots.length - freeSlots.length,
    },
    {
      key: 2,
      svg: {
        fill: Colors.yellowDark,
      },
      value: freeSlots.length,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SectionHeader title={`${employee.name} ${employee.surname}`} />
        <ButtonText customTextStyle={{ fontSize: Fonts.size.small }}
                    onPress={onCalendarPress}
                    customStyle={{alignSelf: 'flex-start'}}
        >
          Sprawdź grafik
        </ButtonText>
      </View>

      <View style={styles.chartRow}>
        <PieChart style={{ height: PIE_CHART_SIZE, width: PIE_CHART_SIZE }}
                  data={pieChartData}
                  outerRadius={'80%'}
                  innerRadius={'100%'}
                  padAngle={0.15}
        />
        <View style={styles.key}>
          <View style={[styles.legend, styles.takenSlotsContainer]}>
            <Text
              style={styles.legendText}>{`Umówionych jazd (${lessonsCount})`}</Text>
          </View>

          <View>
            <View style={[styles.legend, styles.freeSlotsContainer]}>
              <Text style={styles.legendText}>Wolne terminy w
                godzinach:</Text>
            </View>
          </View>
        </View>
      </View>
      {availableIntervals.length !== 0 &&
      <View style={styles.intervalCollection}>
        {availableIntervals.slice(0, 3)
                           .map((interval, index) => <SmallPill key={index}
                                                                interval={interval}/>)}
        {availableIntervals.length > 3 && <MoreIndicator/>}
      </View>
      }
    </View>
  );
};
const DOT_SIZE = 2;

const styles = {
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,

    backgroundColor: Colors.snow,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    shadowOpacity: 0.15,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 8,
    borderRadius: 8,
  },
  legendText: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  key: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  intervalContainer: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
    marginRight: 5,
  },
  intervalText: {
    color: Colors.black,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.extraSmall,
  },
  intervalCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: Colors.strongGrey,
    borderRadius: DOT_SIZE / 2,
  },
  dotsWrapper: {
    flexDirection: 'row',
    width: 10,
    height: Fonts.size.extraSmall,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 5,
  },
  freeSlotsContainer: {
    borderLeftColor: Colors.yellowDark,
  },
  takenSlotsContainer: {
    borderLeftColor: Colors.primaryWarm,
    marginBottom: 2,
  },
  legend: {
    borderLeftWidth: 4,
    paddingLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  }
};
