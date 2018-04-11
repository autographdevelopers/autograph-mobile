import React, { Component } from 'react';
import {  Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pl'] = {
  monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzięń'],
  monthNamesShort: ['Sty.','Lut.','Mar','Kwi.','Maj.','Cze.','Lip.','Sie.','Wrz.','Paź.','Lis.','Gru.'],
  dayNames: ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'],
  dayNamesShort: ['Pn.','Wt.','Śr.','Czw.','Pt.','Sob.','Nd.']
};

LocaleConfig.defaultLocale = 'pl';

export default class AgendaWrapper extends Component {

  agendaItemChanged = (r1, r2) => r1 != r2;

  render() {
    const {
      selected,
      renderItem,
      onDayPress,
      items
    } = this.props;

    return (
      <Agenda
        selected={selected}
        items={items}
        rowHasChanged={this.agendaItemChanged}
        renderItem={renderItem}
        onDayPress={onDayPress}
        renderEmptyDate={(date)=><Text>EmptyDate</Text>}
        theme={styles.customAgendaThemeConfig}
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
  }
};
