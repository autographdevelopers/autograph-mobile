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
import { slotHelper } from '../Lib/SlotHelpers';

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const Bubble = ({ label, customBoxStyles = [], customTextStyles = []}) => (
  <View style={[styles.intervalBox, ...customBoxStyles]}>
    <Text style={[styles.intervalText, ...customTextStyles]}>{label}</Text>
  </View>
);

export default ScheduleSummary = ({ schedule, weekdayFull=true, customStyles={} }) => {
  const getWeekday = day => {
    const weekday = (weekdayFull ? I18n.t(`weekdays.normal.${day}`) : I18n.t(`weekdays.short.${day}`));

    return weekday.capitalize();
  };

  return (
    <ScrollView style={customStyles.container}>
      {Object.keys(schedule).map((day, index) =>
        <View key={`weekday-summary-${index}`} style={[styles.weekdaySummary, customStyles.weekdaySummary]}>
          <View style={[styles.headerTextContainer, customStyles.headerTextContainer]}>
            <Text style={[styles.headerText, customStyles.headerText]}>
              {getWeekday(day)}
            </Text>
          </View>

          <View style={[styles.intervalsContainer, customStyles.intervalsContainer]}>
            {slotHelper.summarizeDay(schedule[day]).map((interval, index) =>
              <Bubble label={interval} key={`interval-box-${index}`}
                      customBoxStyles={[customStyles.intervalBox]}
                      customTextStyles={[customStyles.intervalText]}/>,
            )}
            {schedule[day].length === 0 &&
              <Bubble label={'wolne'}
                      customBoxStyles={[styles.freeDayBox, customStyles.freeDayBox]}
                      customTextStyles={[styles.freeDayText, customStyles.freeDayText]}
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
    flex: 1,
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
