import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../Themes';
import { slotsSummary } from '../Lib/utils';
import I18n from '../I18n/index';

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const Bubble = ({ label, customBoxStyles = {}, customTextStyles = {}}) => (
  <View style={[styles.intervalBox, customBoxStyles]}>
    <Text style={[styles.intervalText, customTextStyles]}>{label}</Text>
  </View>
);

export default ScheduleSummary = ({ schedule, weekdayFull=true }) => {
  const summary = Object.values(schedule).reduce((acc, current, index, _) => {
    acc[WEEKDAYS[index]] = slotsSummary(current);
    return acc;
  }, {});

  const getWeekday = day => {
    const weekday = (weekdayFull ? I18n.t(`weekdays.normal.${day}`) : I18n.t(`weekdays.short.${day}`));

    return weekday.capitalize();
  };

  return (
    <ScrollView>
      {Object.keys(schedule).map((day, index) =>
        <View key={`weekday-summary-${index}`} style={styles.weekdaySummary}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {getWeekday(day)}
            </Text>
          </View>

          <View style={styles.intervalsContainer}>
            {summary[day].map((interval, index) =>
              <Bubble label={interval} key={`interval-box-${index}`}/>,
            )}
            {summary[day].length === 0 &&
              <Bubble label={'wolne'}
                      customBoxStyles={styles.freeDayBox}
                      customTextStyles={styles.freeDayText}
              />
            }
          </View>
        </View>,
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intervalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  intervalBox: {
    borderRadius: 4,
    backgroundColor: Colors.subtleGray,
    marginRight: 10,
    marginBottom: 5,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  intervalText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.small,
    backgroundColor: 'transparent',
    color: Colors.black,
  },
  freeDayBox: {
    backgroundColor: Colors.yellow,
    paddingHorizontal: 10
  },
  freeDayText: {},
  weekdaySummary: {},
  headerTextContainer: {
    marginBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.primaryWarm
  },
  headerText: {
    // color: Colors.primaryWarm
  }
});
