import React, { Component } from 'react';
import {
  Alert,
  Text,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Colors, Fonts } from '../../Themes/';
import { connect } from 'react-redux';
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
      startFrom: 12,
      refreshing: false
    };
  }

  _keyExtractor = (item, index) => `employee-slot-aval-${index}`;

  _renderSlot = day => ({ item, index }) => {

    return (
      <Slot slot={item} first={index==0} onPress={this.props.toggleSlotState(day, item.start_hour)} />
    )
  };

  _showEarlierSlots = () => {
    console.log('show earlier slots!')//KURWNBDLACZRGO ENI DZIALSZS

    this.setState({
      refreshing: true,
      startFrom: 0
    })
  };

  renderSchedule = () => {
    const day = WEEKDAYS[this.state.currentDayIndex];

    return <FlatList
      ListHeaderComponent={<Text style={styles.loadMoreText}>Pull down to load earliers slots.</Text>}
      keyExtractor={this._keyExtractor}
      data={this.props.schedule[day].slice(this.state.startFrom)}
      renderItem={this._renderSlot(day)}
      onRefresh={this._showEarlierSlots}
      refreshing={this.state.refreshing}
    />;
  };

  changeDay = index => () => {
    this.setState({
      currentDayIndex: index,
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
    const { t } = this.props.screenProps.I18n,
      currentDayText = t(
        `weekdays.normal.${WEEKDAYS[this.state.currentDayIndex]}`).capitalize(),
      saveText = t('save').capitalize();

    return (
      <View style={{ flex: 1 }}>
        {/*<View style={[styles.currentDayIndexRow]}>*/}
          {/*<TouchableOpacity onPress={this.prevDay}>*/}
            {/*<Icon name={'angle-left'} size={30} color={Colors.primaryWarm}/>*/}
          {/*</TouchableOpacity>*/}
          {/*<Text style={styles.currentWeekday}>{currentDayText}</Text>*/}
          {/*<TouchableOpacity onPress={this.nextDay}>*/}
            {/*<Icon name={'angle-right'} size={30} color={Colors.primaryWarm}/>*/}
          {/*</TouchableOpacity>*/}
        {/*</View>*/}
        <View style={styles.weekdaysPanel}>{this.renderWeekdaysBullets()}</View>
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scheduleContainer}>
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
    paddingHorizontal: 30, // assign to var
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
    paddingBottom: 90,
  },
  loadMoreText: {
    textAlign: 'center',
    fontSize: Fonts.size.small,
    paddingVertical: 10,
    color: Colors.strongGrey
  }
};

const mapStateToProps = state => {
  return {
    schedule: state.employeeAvailabilitySlots.schedule,
  };
};

const mapDispatchToProps = dispatch => ( {
  toggleSlotState: (day, hour) => () => dispatch(
    employeeAvailabilitySlotsActionCreators.toggleSlot(day, hour)),
} );

// TODO extract weekdaypicker(used also in schedule boundaries) to separate component
// TODO generate WEEKDAYS constant from translations

export default connect(mapStateToProps, mapDispatchToProps)(SetAvailability);
