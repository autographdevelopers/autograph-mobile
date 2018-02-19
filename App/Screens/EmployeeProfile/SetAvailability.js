import React, { Component } from 'react';
import {
  Alert,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Colors, Fonts } from '../../Themes/';
import { connect } from 'react-redux';
import ListHeader from '../../Components/ListHeader';
import Slot from '../../Components/Slot';
import { employeeAvailabilitySlotsActionCreators } from '../../Redux/employeeAvailabilitySlots';
import Bubble from '../../Components/Bubble';
import Icon from 'react-native-vector-icons/FontAwesome';

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'];

class SetAvailability extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDayIndex: 0,
    };
  }

  renderSchedule = () => {
    const day = WEEKDAYS[this.state.currentDayIndex];

    return this.props.schedule[day].map((item, index) =>
       <Slot slot={item}
                     onPress={this.props.toggleSlotState(day, item.start_hour)}
                     key={`employee-slot-aval-${index}`}/>
      );
  };

  changeDay = index => () => {
    this.setState({
      currentDayIndex: index
    });
  };

  nextDay = () => {
    const next = ( this.state.currentDayIndex + 1 ) % WEEKDAYS.length;

    this.changeDay(next)();
  };

  prevDay = () => {
    const current = this.state.currentDayIndex;
    const prev = current - 1 === -1 ? WEEKDAYS.length - 1 : current - 1;

    this.changeDay(prev)();
  };

  renderWeekdaysBullets = () => {
    const { t } = this.props.screenProps.I18n;

    return WEEKDAYS.map((item, index) => {
      const label = t(`weekdays.short.${WEEKDAYS[index]}`);

      return <Bubble active={index === this.state.currentDayIndex}
                     label={label}
                     onPress={this.changeDay(index)}
                     key={`weekday-bubble-${index}`}
      />;
    });
  };

  render() {

    const { t } = this.props.screenProps.I18n;
    const currentDayText = t(`weekdays.normal.${WEEKDAYS[this.state.currentDayIndex]}`).capitalize();
    const saveText = t('save').capitalize();
    const availabilityText = t('availability');

    return (
      <View style={{ flex: 1 }}>
        <ListHeader title={availabilityText}/>
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scheduleContainer}>
          <View style={[styles.currentDayIndexRow]}>
            <TouchableOpacity onPress={this.prevDay}>
              <Icon name={'angle-left'} size={30} color={Colors.primaryWarm}/>
            </TouchableOpacity>
            <Text style={styles.currentWeekday}>{currentDayText}</Text>
            <TouchableOpacity onPress={this.nextDay}>
              <Icon name={'angle-right'} size={30} color={Colors.primaryWarm}/>
            </TouchableOpacity>
          </View>
          <View style={styles.weekdaysPanel}>
            {this.renderWeekdaysBullets()}
          </View>
          {this.renderSchedule()}
        </ScrollView>
        <ButtonPrimary float={true}>{saveText}</ButtonPrimary>
      </View>
    );
  }
}

const styles = {
  weekdaysPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  currentDayIndexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  currentWeekday: {
    marginHorizontal: 35,
    width: '50%',
    fontSize: Fonts.size.regular,
    color: Colors.softBlack,
    textAlign: 'center',
  },
  scheduleContainer: {
    paddingHorizontal: 30,
    paddingBottom: 90
  }
};

const mapStateToProps = state => {
  return {
    schedule: state.employeeAvailabilitySlots.schedule,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleSlotState: (day, hour) => () => dispatch(
    employeeAvailabilitySlotsActionCreators.toggleSlot(day, hour)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetAvailability);
