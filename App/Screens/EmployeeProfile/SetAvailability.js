import React, { Component } from 'react';
import {
  Alert,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Colors, Fonts } from '../../Themes/';
import { connect } from 'react-redux';
import Layout from '../../Components/Layout';
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

    return this.props.schedule[day].map(
      (item, index) => {
        return <Slot slot={item}
                     onPress={this.props.toggleSlotState(day, item.start_hour)}
                     key={`employee-slot-aval-${index}`}/>;
      });
  };

  changeDay = index => () => {
    this.setState({
      currentDayIndex: index
    })
  };

  nextDay = () => {
    this.setState({
      currentDayIndex: (this.state.currentDayIndex + 1) % WEEKDAYS.length
    });
  };

  prevDay = () => {
    this.setState({
      currentDayIndex: (this.state.currentDayIndex - 1) === -1 ? WEEKDAYS.length - 1 : (this.state.currentDayIndex - 1)
    });
  };

  renderWeekdaysBullets = () => {
    return WEEKDAYS.map((item, index) => {
      const label = item.slice(0, 3).capitalize();

      return <Bubble active={index===this.state.currentDayIndex}
                     label={label}
                     onPress={this.changeDay(index)}
                     key={`weekday-bubble-${index}`}
      />
    })
  };

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ListHeader title={'Dyspozycyjnosc'}/>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 30, paddingBottom: 90}}>
            <View style={[styles.currentDayIndexRow]}>
              <TouchableOpacity onPress={this.prevDay}>
                <Icon name={'angle-left'} size={30} color={Colors.primaryWarm}/>
              </TouchableOpacity>
              <Text style={styles.currentWeekday}>{WEEKDAYS[this.state.currentDayIndex].capitalize()}</Text>
              <TouchableOpacity onPress={this.nextDay}>
                <Icon name={'angle-right'} size={30} color={Colors.primaryWarm}/>
              </TouchableOpacity>
            </View>

            <View style={styles.weekdaysPanel}>{this.renderWeekdaysBullets()}</View>
            {this.renderSchedule()}
          </ScrollView>
        <ButtonPrimary float={true} >Zapisz</ButtonPrimary>
      </View>
    );
  }
}

const styles = {
  weekdaysPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  currentDayIndexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  currentWeekday: {
    marginHorizontal: 35,
    width: '50%',
    fontSize: Fonts.size.regular,
    color: Colors.softBlack,
    textAlign: 'center'
  },
}

const mapStateToProps = state => {
  return {
    schedule: state.employeeAvailabilitySlots.schedule,
  };
};

const mapDispatchToProps = dispatch => ( {
  toggleSlotState: (day, hour) => () => dispatch(
    employeeAvailabilitySlotsActionCreators.toggleSlot(day, hour)),
} );

export default connect(mapStateToProps, mapDispatchToProps)(SetAvailability);
