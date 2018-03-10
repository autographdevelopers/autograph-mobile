import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../Themes';
import ButtonText from './ButtonText';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';
import I18n from '../I18n/index';
import ScheduleSummary from '../Components/ScheduleSummary';

export default ScheduleBox = ({ schedule, onRemovePress, onEditPress, title }) => {
  const customScheduleStyles = {
    weekdaySummary: styles.weekdayRow,
    headerTextContainer: styles.weekdayContainer,
    headerText: styles.weekdayLabel,
    intervalsContainer: styles.intervalsContainer,
    intervalBox: styles.box,
    intervalText: styles.interval,
    freeDayBox: styles.freeDayBox
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <ScheduleSummary schedule={schedule} customStyles={customScheduleStyles} weekdayFull={false}/>
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
    marginBottom: 0,
    borderBottomWidth: 0,
    borderBottomColor: 0
  },
  box: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    marginRight: 5,
    marginBottom: 0,
  },
  weekdayLabel: {
    color: Colors.black,
    fontSize: Fonts.size.small,
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
    fontSize: Fonts.size.small,
  },
  container: {
    width: '90%',
    minHeight: 200,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: Colors.snow,
    shadowColor: Colors.mediumGrey,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 1,
    shadowOffset: { width: 0.5, height: 0.5 },
    marginBottom: 15
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
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.light,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.subtleGray,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  freeDayBox: {
    paddingHorizontal: 5
  }
};
