import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import ButtonPrimary from '../../../Components/ButtonPrimary';
import { Colors, Fonts } from '../../../Themes/';
import { connect } from 'react-redux';
import Slot from '../../../Components/Slot';
import { scheduleFormActionCreators } from '../../../Redux/ScheduleFormRedux';
import Bubble from '../../../Components/Bubble';
import { MODALS_IDS, modalActionCreators } from '../../../Redux/ModalRedux';
import FinalizeFormWizard from './FinalizeFormWizard';
import ModalTemplate from '../../../Components/ModalTemplate';
import { FETCHING_STATUS } from '../../../Lib/utils';

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDayIndex: 0,
      startFrom: 12,
      refreshing: false
    };
  }

  _keyExtractor = (item, _) => {return `employee-slot-interval-${item.id}`};

  _renderSlot = day => ({item}) => {
    const isActive = this.props.schedule[day].includes(item.id);

    return <Slot active={isActive} id={item.id} onPress={this.props.toggleSlotState(day, item.id)} />
  };

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
    const slotsIds = new Array(48).fill(0).map((_, index) => ({id: index}));

    return <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scheduleContainer}
      ListHeaderComponent={this.state.startFrom === 12 && <Text style={styles.loadMoreText}>Pull down to load earliers slots.</Text>}
      keyExtractor={this._keyExtractor}
      data={slotsIds.slice(this.state.startFrom)}
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

  successCallback = () => {
    this.props.closeModal();
    this.props.changeFormStatus(FETCHING_STATUS.READY);
    this.props.navigation.goBack(null);
  };

  resetScheduleFormModal = () => {
    this.props.closeModal();
    this.props.changeFormStatus(FETCHING_STATUS.READY);
  };

  render() {
    const { formStatus } = this.props;
    const { t } = this.props.screenProps.I18n,
      saveText = t('save').capitalize();

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.weekdaysPanel}>{this.renderWeekdaysBullets()}</View>
          {this.renderSchedule()}
        <ButtonPrimary float={true} onPress={this.props.openSummaryModal}>{saveText}</ButtonPrimary>
        <ModalTemplate
          modalID={MODALS_IDS.SAVE_EMPLOYEE_AVAILABILITY}
          status={formStatus}
          successMsg={'Pomyslnie zapisano harmonogram.'}
          errorMsg={'Nie udalo sie zapisać harmonogramu, sprobuj ponownie pozniej.'}
          successBtnCallback={this.successCallback}
          errorBtnCallback={this.resetScheduleFormModal}
          closeModalCallback={this.resetScheduleFormModal}
        >
          <FinalizeFormWizard />
        </ModalTemplate>
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

const mapStateToProps = state => ({
  schedule: state.scheduleForm.template,
  formStatus: state.scheduleForm.status,
});

const mapDispatchToProps = dispatch => ({
  toggleSlotState: (day, id) => () => dispatch(
    scheduleFormActionCreators.toggleSlot(day, id)),
  openSummaryModal: () =>
    dispatch(modalActionCreators.open(MODALS_IDS.SAVE_EMPLOYEE_AVAILABILITY)),
  closeModal: () =>  dispatch(modalActionCreators.close()),
  changeFormStatus: status => dispatch(scheduleFormActionCreators.changeStatus(status))
});

// TODO generate WEEKDAYS constant from translations

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityForm);
