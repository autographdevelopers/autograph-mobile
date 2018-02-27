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

  _keyExtractor = (item, _) => `employee-slot-aval-${item.id}`;

  _renderSlot = day => ({ item, _ }) => (
      <Slot slot={item} onPress={this.props.toggleSlotState(day, item.id)} />
  );

  _showEarlierSlots = () => {
    this.setState({
      refreshing: true,
    });

    /** Let user knows to load earlier virtual request is processed*/
    setTimeout(()=> {
      this.setState({
        refreshing: false,
        startFrom: 0
      });
    }, 1000);
  };

  renderSchedule = () => {
    const day = WEEKDAYS[this.state.currentDayIndex];

    return <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scheduleContainer}
      ListHeaderComponent={this.state.startFrom === 12 && <Text style={styles.loadMoreText}>Pull down to load earliers slots.</Text>}
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
      saveText = t('save').capitalize();

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.weekdaysPanel}>{this.renderWeekdaysBullets()}</View>
          {this.renderSchedule()}
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
  scheduleContainer: {
    paddingHorizontal: 30,
    paddingBottom: 90,
  },
  loadMoreText: {
    textAlign: 'center',
    paddingLeft: 45, // the same as width of the left side of the slot - needed for centering
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
  toggleSlotState: (day, id) => () => dispatch(
    employeeAvailabilitySlotsActionCreators.toggleSlot(day, id)),
} );

// TODO generate WEEKDAYS constant from translations

export default connect(mapStateToProps, mapDispatchToProps)(SetAvailability);
