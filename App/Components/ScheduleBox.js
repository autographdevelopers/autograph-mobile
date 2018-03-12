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
import ScheduleSummary from '../Components/ScheduleSummary';

export default ScheduleBox = ({ schedule, onRemovePress, onEditPress, title }) => {
  const customScheduleStyles = {
    weekdaySummary: styles.weekdayRow,
    headerTextContainer: styles.weekdayContainer,
    headerText: styles.weekdayLabel,
    intervalsContainer: styles.intervalsContainer,
    intervalBox: styles.box,
    intervalText: styles.interval,
    freeDayBox: {}
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
    borderBottomColor: Colors.primaryWarm
  },
  box: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    marginRight: 5,
    marginBottom: 0,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  weekdayLabel: {
    paddingVertical: 4,
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
    color: Colors.black,
    fontSize: Fonts.size.small,
  },
  container: {
    width: '90%',
    minHeight: 200,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.snow,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.mediumGrey
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
  freeDayText: {
    color: Colors.yellow
  }
};