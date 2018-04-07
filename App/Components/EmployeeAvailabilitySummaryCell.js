import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fonts, Colors } from '../Themes/index';
import DefaultAvatar from './DefaultAvatar';
import { PieChart } from 'react-native-svg-charts';
import ButtonText from '../Components/ButtonText';
import { slotHelper } from '../Lib/SlotHelpers';
import _ from 'lodash';
import moment from 'moment/moment';

// TODO: There is quite a lot of logic here, extract it to some container and let component only render ready data.

const MoreIndicator = () => (
  <View style={styles.dotsWrapper}>
    <View style={styles.dot}/>
    <View style={styles.dot}/>
    <View style={styles.dot}/>
  </View>
);

const SmallPill = ({interval}) => (
  <View style={styles.intervalContainer}>
    <Text style={styles.intervalText}>{interval}</Text>
  </View>
);

const PIE_CHART_SIZE = 40;

export default EmployeeAvailabilitySummaryCell = ({employee, slots, onCalendarPress}) => {
  const freeSlots = slots.filter(slot => slot.driving_lesson_id === null);
  const freeSlotIds = freeSlots.map(slot => slotHelper.hourToId(moment(slot.start_time).format(slotHelper.TIME_FORMAT)));
  const availableIntervals = slotHelper.summarizeDay(freeSlotIds);
  const lessonSlots = slots.filter(slot => slot.driving_lesson_id !== null);

  const lessonsCount = _.chain(lessonSlots).groupBy('driving_lesson_id').keys().value().length;

  const pieChartData =  [
    {
      key: 1,
      svg: {
        fill: Colors.primaryWarm
      },
      value: slots.length - freeSlots.length
    },
    {
      key: 2,
      svg: {
        fill: Colors.yellowDark
      },
      value: freeSlots.length
    }
  ];

  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <View>
          <Text style={styles.header}>{`${employee.name} ${employee.surname}`}</Text>
          <View style={styles.underline}/>
        </View>
        <DefaultAvatar name={employee.name[0]} customContainerStyle={{marginRight: 0}} customSize={30}/>
      </View>

      <View style={styles.chartRow}>
        <PieChart style={{ height: PIE_CHART_SIZE, width: PIE_CHART_SIZE }}
                  data={pieChartData}
                  innerRadius={0}
                  padAngle={0}
                  />
        <View style={styles.key}>
          <Text style={styles.takenSlots}>{`Umówionych jazd (${lessonsCount})`}</Text>

          { availableIntervals.length !== 0 &&
          <View>
            <Text style={styles.freeSlots}>Wolne terminy w godzinach:</Text>
            <View style={styles.intervalCollection}>
              { availableIntervals.slice(0, 3).map((interval, index) => <SmallPill key={index} interval={interval} />) }
              { availableIntervals.length > 3 && <MoreIndicator/> }
            </View>
          </View>
          }
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTxt}>Sprawdź całą dyspozycyjność lub umów jazdę</Text>
        <ButtonText customTextStyle={{ fontSize: Fonts.size.extraSmall }} onPress={onCalendarPress}>Sprawdź grafik</ButtonText>
      </View>

    </View>
  );
}
const DOT_SIZE = 2;

const styles = {
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    backgroundColor: Colors.snow,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    shadowOpacity: 0.15,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 8,
    borderRadius: 8,
    marginVertical: 5
  },
  takenSlots: {
    color: Colors.primaryWarm,
    fontSize: Fonts.size.small,
  },
  freeSlots: {
    color: Colors.yellowDark,
    fontSize: Fonts.size.small,
    marginBottom: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
  },
  key: {
    marginLeft: 15,
    flex:1,
    justifyContent: 'center'
  },
  footerTxt: {
    fontSize: Fonts.size.extraSmall,
    color: Colors.strongGrey,
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: Fonts.size.medium,
    color: Colors.black
  },
  underline: {
    width: 40,
    height: 3,
    borderRadius: 8,
    backgroundColor: Colors.primaryWarm
  },
  intervalContainer: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
    marginBottom: 5,
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
    flex: 1,
    alignItems: 'center'
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: Colors.strongGrey,
    borderRadius: DOT_SIZE/2
  },
  dotsWrapper: {
    flexDirection: 'row',
    width: 10,
    height: Fonts.size.extraSmall,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 5
  }
};
