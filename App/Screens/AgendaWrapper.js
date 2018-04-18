import React, { Component } from 'react';
import {  Agenda, LocaleConfig } from 'react-native-calendars';
import { timeHelpers } from '../Lib/timeHandlers';
import { connect } from 'react-redux';

LocaleConfig.locales['pl'] = {
  monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzięń'],
  monthNamesShort: ['Sty.','Lut.','Mar','Kwi.','Maj.','Cze.','Lip.','Sie.','Wrz.','Paź.','Lis.','Gru.'],
  dayNames: ['Niedziela', 'Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
  dayNamesShort: ['Nd.', 'Pon.','Wt.','Śr.','Czw.','Pt.','Sob.']
};

LocaleConfig.defaultLocale = 'pl';

class AgendaWrapper extends Component {

  agendaItemChanged = (r1, r2) => r1 != r2;

  render() {
    const {
      selected,
      renderItem,
      onDayPress,
      items,
      currentSchool,
      currentUser: { type },
      scheduleSettings: { booking_advance_period_in_weeks }
    } = this.props;

    const today = timeHelpers.getTimzeZoneDate(currentSchool.time_zone);
    const todayFormatted = today.format('YYYY-MM-DD');
    const maxBookingDateInFuture = today.add(booking_advance_period_in_weeks, 'weeks');
    const maxBookingDateInFutureFormatted = maxBookingDateInFuture.format('YYYY-MM-DD');

    return (
      <Agenda
        minDate={type === 'Student' ? todayFormatted : undefined}
        maxDate={type === 'Student' ? maxBookingDateInFutureFormatted : undefined}
        selected={selected}
        firstDay={1}
        items={items}
        rowHasChanged={this.agendaItemChanged}
        renderItem={renderItem}
        onDayPress={onDayPress}
        renderEmptyDate={(date)=><Text>EmptyDate</Text>}
        theme={styles.customAgendaThemeConfig}
        style={{height: 100}}
        {...this.props}
      />
    )
  }
}

const styles = {
  customAgendaThemeConfig: {
    'stylesheet.agenda.list': {
      day: {
        marginTop: 0,
        width: 0,
      }
    }
  },
};

const mapStateToProps = state => ({
  currentSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  currentUser: state.user,
  scheduleSettings: state.scheduleSettings
});

export default connect(mapStateToProps)(AgendaWrapper)
