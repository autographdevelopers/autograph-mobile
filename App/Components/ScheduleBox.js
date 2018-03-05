import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../Themes';
import { slotsSummary } from '../Lib/utils';
import ButtonText from './ButtonText';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';
import I18n from '../I18n/index';

export default ScheduleBox = ({ schedule, onRemovePress, onEditPress }) => {

  const renderSummary = () =>
    <ScrollView>
      {Object.keys(schedule).map((item, index) => {
        return (
          <View style={styles.weekdayRow} key={`weekday-${index}-row`}>
            <View style={styles.weekdayContainer}>
              <Text style={styles.weekdayLabel}>{I18n.t(`weekdays.short.${item}`).capitalize()}.</Text>
            </View>

            <View style={styles.intervalsContainer}>
              {slotsSummary(schedule[item]).map((interval, index) =>
                <Text style={styles.interval} key={`interval-${index}`}>{interval}</Text>)
              }
              {slotsSummary(schedule[item]).length ===0 && <Text style={styles.freeDayText}>wolne</Text>}
            </View>
          </View>
        );
      })
      }
    </ScrollView>;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Aktualny grafik (do 21.01.2018)</Text>
        </View>
        {renderSummary()}
      </View>
      <View style={styles.footer}>
        <ButtonText icon={<IconF size={15} name={'cog'} color={Colors.primaryWarm}/>} onPress={onEditPress}>Edytuj</ButtonText>
        <ButtonText icon={<IconE size={15} name={'trash'} color={Colors.salmon}/>}
                    customTextStyle={{color: Colors.salmon}}
                    onPress={onRemovePress}
        >
          Usuń
        </ButtonText>
      </View>
    </View>
  );
};

const styles = {
  weekdayContainer: {
    width: 50,
  },
  weekdayLabel: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    fontWeight: '500'
  },
  intervalsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  interval: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    marginRight: 5,
  },
  container: {
    width: '90%',
    minHeight: 200,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: Colors.snow,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    borderBottomColor: Colors.primaryWarm,
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 10,
  },
  headerText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.subtleGray,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  freeDayText: {
    color: Colors.yellow
  }
};
