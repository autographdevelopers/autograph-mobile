/** Lib dependencies */
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment/moment';
/** Custom dependencies */
import ScheduleBox from '../../../Components/ScheduleBox';
import BubbleBackground from '../../../Components/BubbleBackground';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import ButtonPrimary from '../../../Components/ButtonPrimary';
import BindingFromBox from '../../../Components/BindingFromBox';
import ModalTemplate from '../../../Components/ModalTemplate';
import { Colors, Fonts } from '../../../Themes/index';
import { modalActionCreators, MODALS_IDS } from '../../../Redux/Views/Modals/ModalRedux';
import { scheduleActionCreators } from '../../../Redux/Entities/ScheduleRedux';
import { scheduleFormActionCreators } from '../../../Redux/Views/ScheduleFormRedux';
import { TEMPLATE_TYPES } from '../../../Redux/Views/ScheduleFormRedux';
import { FETCHING_STATUS, isTemplateEmpty } from '../../../Lib/utils';
import { scheduleSettingsActionCreators } from '../../../Redux/Entities/ScheduleSettingsRedux';

class AvailabilityIndex extends Component {
  componentWillMount = () => {
    this.props.showScheduleSettingsRequest();
    this.props.showScheduleRequest();
  };

  handleEditPress = template_type => () => {
    this.props.initForm(this.props[template_type], template_type, this.props.new_template_binding_from);

    const { user, index } = this.props.navigation.state.params;

    this.props.navigation.navigate('setAvailability', { user, index, title: 'Ustaw dyspozycyjnosc' });
  };

  pageContents = () => {
    const {
      current_template,
      new_template,
      new_template_binding_from,
      scheduleStatus,
      scheduleSettingsStatus
    } = this.props;

    if ([FETCHING_STATUS.FETCHING, FETCHING_STATUS.READY].includes(scheduleStatus) || [FETCHING_STATUS.FETCHING, FETCHING_STATUS.READY].includes(scheduleSettingsStatus)) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating size="large" color={Colors.primaryWarm}/>
        </View>
      );
    }
    else if (isTemplateEmpty(current_template) && !new_template_binding_from) {
        return (
          <BubbleBackground>
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.placeholderBox}>
                <Text style={styles.title}>Mój Grafik</Text>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit melt..Lorem ipsum dolor sit meltLorem
                  ipsum dolor sit meltLorem ipsum dolor sit meltLorem ipsum dolor
                  sit meltLorem ipsum dolor sit meltLorem ipsum dolor sit meltLorem
                  ipsum dolor sit melt.</Text>
                <TouchableOpacity onPress={this.handleEditPress(TEMPLATE_TYPES.NEW_TEMPLATE)} style={styles.button}>
                  <Text style={styles.buttonText}>STWÓRZ GRAFIK</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BubbleBackground>
        )
    } else if (!isTemplateEmpty(current_template) && new_template_binding_from === null) {
      return (
        <ScheduleBox title={'Aktualny grafik'}
                     schedule={current_template}
                     onEditPress={this.handleEditPress(TEMPLATE_TYPES.CURRENT_TEMPLATE)}
                     onRemovePress={this.openRemoveScheduleModal(TEMPLATE_TYPES.CURRENT_TEMPLATE)}/>
      );
    } else if (new_template_binding_from) {
      return (
        <ScrollView contentContainerStyle={{paddingVertical: 15}}>
          <ScheduleBox title={`Aktualny grafik (do ${new_template_binding_from})`}
                       schedule={current_template}
                       onEditPress={this.handleEditPress(TEMPLATE_TYPES.CURRENT_TEMPLATE)}
                       onRemovePress={this.openRemoveScheduleModal(TEMPLATE_TYPES.CURRENT_TEMPLATE)}/>

          <BindingFromBox onPress={this.openBindingDateModal}
                          date={new_template_binding_from}
                          label={'zmiana w grafiku'} />

          <ScheduleBox title={`Następny grafik (od ${new_template_binding_from})`}
                       schedule={new_template}
                       onEditPress={this.handleEditPress(TEMPLATE_TYPES.NEW_TEMPLATE)}
                       onRemovePress={this.openRemoveScheduleModal(TEMPLATE_TYPES.NEW_TEMPLATE)} />
        </ScrollView>
      );
    }
  };

  closeBindingDateModalCallback = () => {
    this.props.setFormStatus(FETCHING_STATUS.READY);
  };

  openBindingDateModal = () => {
    this.props.setBindingFrom(this.props.new_template_binding_from);
    this.props.openModal(MODALS_IDS.CHANGE_NEW_SCHEDULE_BINDING_FROM_DATE)();
  };

  closeRemoveScheduleModal = () => {
    this.props.setFormStatus(FETCHING_STATUS.READY);
  };

  openRemoveScheduleModal = whichTemplate => () => {
    this.props.changeWhichScheduleIsModified(whichTemplate);
    this.props.openModal(MODALS_IDS.REMOVE_SCHEDULE)();
  };

  render() {
    const {
      new_template_binding_from__FORM,
      updateScheduleRequest,
      formStatus,
      setBindingFrom,
      removeScheduleRequestParams
    } = this.props;

    const FORMAT = 'YYYY-MM-DD';
    const tommorow = moment().add(1, 'days').format(FORMAT);

    const datePickerConfiguration = {
      ref: ref => this.datepicker = ref,
      minDate: tommorow,
      format: FORMAT,
      placeholder: 'dnia..(data)',
      onDateChange: setBindingFrom,
      date: new_template_binding_from__FORM,
    };

    return (
      <View style={{flex: 1}}>
        {/** SCHEDULE BOXES */}
          {this.pageContents()}

        {/** CHANGE NEW SCHEDULE BINDING DATE MODAL */}
        <ModalTemplate
          modalID={MODALS_IDS.CHANGE_NEW_SCHEDULE_BINDING_FROM_DATE}
          status={formStatus}
          successMsg={'Pomyslnie zmieniono date obowiazywania nowego harmonogramu.'}
          errorMsg={'Nie udalo sie zmienic daty harmonogramu, sprobuj ponownie pozniej.'}
          closeModalCallback={this.closeBindingDateModalCallback}
          modalTitle={'Zmiana data wprowadzenia nowego grafiku'}
          modalMsg={'Zmiana daty wprowadzenia nowego grafiku skutkować będzie lorem ipsum dolor sit melt..'}
        >
          <View style={{marginBottom: 30}}>
            <View style={{ alignItems: 'center' }}>
              <CustomDatePicker datePickerConfiguration={datePickerConfiguration} />
            </View>
          </View>

          <ButtonPrimary onPress={updateScheduleRequest({new_template_binding_from: new_template_binding_from__FORM})}>
            Zróbmy to!
          </ButtonPrimary>
        </ModalTemplate>

        {/** CLEAR SCHEDULE MODAL */}
        <ModalTemplate
          modalID={MODALS_IDS.REMOVE_SCHEDULE}
          status={formStatus}
          successMsg={'Pomyslnie usunieto grafik.'}
          errorMsg={'Nie udalo sie usunac grafiku, sprobuj ponownie pozniej.'}
          closeModalCallback={this.closeRemoveScheduleModal}
          modalTitle={'Usun grafik'}
          modalMsg={'Usuniecie grafiku spodowuje usuniecie wszystkich slotow na jakie mogli sie zapisywac kursanci.'}
        >

          <ButtonPrimary onPress={updateScheduleRequest(removeScheduleRequestParams)}>
            Zróbmy to!
          </ButtonPrimary>
        </ModalTemplate>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let removeParams;
  const emptyTemplate = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  };

  if (state.views.scheduleForm.schedule_type === TEMPLATE_TYPES.NEW_TEMPLATE) {
    removeParams = {
      new_template_binding_from: null,
      new_template: emptyTemplate
    }
  } else if (state.views.scheduleForm.schedule_type === TEMPLATE_TYPES.CURRENT_TEMPLATE) {
    removeParams = {
      current_template: emptyTemplate
    }
  }

  return {
    current_template: state.entities.schedule.current_template,
    new_template: state.entities.schedule.new_template,
    removeScheduleRequestParams: removeParams,
    scheduleStatus: state.entities.schedule.status,
    scheduleSettingsStatus: state.entities.scheduleSettings.status,
    formStatus: state.views.scheduleForm.status,
    new_template_binding_from: state.entities.schedule.new_template_binding_from,
    new_template_binding_from__FORM: state.views.scheduleForm.new_template_binding_from
  }
};

const mapDispatchToProps = dispatch => ({
  openModal: modalID => () => dispatch(modalActionCreators.open(modalID)),
  closeModal: () => dispatch(modalActionCreators.close()),
  setBindingFrom: date => dispatch(scheduleFormActionCreators.changeNewTemplateBindingFrom(date)),
  showScheduleRequest: () => dispatch(scheduleActionCreators.showRequest()),
  showScheduleSettingsRequest: () => dispatch(scheduleSettingsActionCreators.showRequest()),
  setFormStatus: status => dispatch(scheduleFormActionCreators.changeStatus(status)),
  changeWhichScheduleIsModified: schedule => dispatch(scheduleFormActionCreators.changeWhichScheduleIsModified(schedule)),
  initForm: (data, type, new_template_binding_from) => dispatch(scheduleFormActionCreators.initializeForm(data, type, new_template_binding_from)),
  updateScheduleRequest: data => () => dispatch(scheduleFormActionCreators.updateRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityIndex)

const styles = {
  title: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.regular,
    marginBottom: 15,
    alignSelf: 'center'
  },
  description: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
    marginBottom: 15,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderBox: {
    width: '90%',
    minHeight: 200,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: Colors.snow,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.primaryWarm,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 15
  },
  buttonText: {
    color: Colors.primaryWarm,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.medium
  }
};
