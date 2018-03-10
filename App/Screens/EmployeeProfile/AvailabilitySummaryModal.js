import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/index';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { connect } from 'react-redux';
import { FETCHING_STATUS, SLOT_STATUS, slotsSummary } from '../../Lib/utils';
import { modalActionCreators, MODALS_IDS } from '../../Redux/ModalRedux';
import ScheduleSummary from '../../Components/ScheduleSummary';
import StepsIndicators  from '../../Components/StepsIndicators';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialIcons';
import CustomDatePicker from '../../Components/CustomDatePicker';
import moment from 'moment';
import { scheduleFormActionCreators } from '../../Redux/ScheduleFormRedux';
import { isTemplateEmpty } from '../../Lib/utils';
import { TEMPLATE_TYPES } from '../../Redux/ScheduleFormRedux';
import RadioButton from '../../Components/RadioButton';

const CloseModalRow = ({ onPress }) => (
  <View style={styles.crossIconRow}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="md-close"
            color={Colors.softBlack}
            size={24}
            style={styles.crossIcon}/>
    </TouchableOpacity>
  </View>
);

const STEPS = ['Ustawienia', 'Podsumowanie'];

class AvailabilitySummaryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.showBindingFromStep ? 0 : 1,
    };
  }

  closeModal = () => {
    this.props.closeModal();
    this.props.changeStatus(FETCHING_STATUS.READY);
    this.setState({step: 0});
  };

  submitSchedule = () => {
    const { template, new_template_binding_from } = this.props;
    const params = {};

    const templateType = new_template_binding_from ? 'new_template' : 'current_template';

    params[templateType] = template;

    if(new_template_binding_from)
      params['new_template_binding_from'] = new_template_binding_from;

    this.props.updateScheduleRequest(params);
  };

  navToStep = index => () => {
    this.setState({
      step: index
    });
  };

  renderButton = () => {
    const customWrapperStyles= { width: '60%' };
    const icon = this.state.step === 0 ? <IconM name={'arrow-forward'} color={Colors.snow} size={20}/> : null;
    const handlePress = this.state.step === 0 ? this.navToStep(1) :  this.submitSchedule;
    const label = this.state.step === 0 ? 'Dalej' : 'Zapisz';

    return <ButtonPrimary customWrapperStyles={customWrapperStyles}
                          icon={icon}
                          onPress={handlePress}>{label}</ButtonPrimary>;
  };

  renderStep = () => {
    const FORMAT = 'YYYY-MM-DD';
    const tommorow = moment().add(1, 'days').format(FORMAT);
    const starts_from = this.props.new_template_binding_from;
    const { setBindingFrom } = this.props;

    if (this.state.step === 0) {
      const datePickerConfiguration = {
        ref: ref => this.datepicker = ref,
        minDate: tommorow,
        format: FORMAT,
        placeholder: 'dnia..(data)',
        onDateChange: setBindingFrom,
        duration: 400,
        date: starts_from
      };

      return (
        <View>
          <Text style={styles.appliesForm}>Obowiązuje od.. </Text>
          <TouchableOpacity style={styles.optionRow} onPress={() => setBindingFrom(null)} >
            <RadioButton active={this.props.new_template_binding_from === null} setValue={()=>setBindingFrom(null)} />
            <View style={styles.radioLabeL}><Text>teraz</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => this.datepicker.onPressDate()}>
            <RadioButton active={this.props.new_template_binding_from !== null} setValue={()=>this.datepicker.onPressDate()} />
            <View style={styles.radioLabeL}><CustomDatePicker datePickerConfiguration={datePickerConfiguration} /></View>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.step === 1) {
      return (
        <View>
          { this.props.showBindingFromStep &&
            <Text style={styles.startsFrom}>Obowiazuje od
              <Text style={styles.startsFromEmphasise}> {starts_from || 'teraz'}</Text>
            </Text>
          }

          <ScheduleSummary schedule={this.props.template} />
        </View>
      )
    }
  };

  renderStepsWizard = () => (
    <View style={[styles.window, styles.windowDefault]}>
      <CloseModalRow onPress={this.closeModal}/>

      { this.props.showBindingFromStep && <StepsIndicators labels={STEPS}
                       activeIndex={this.state.step}
                       onPress={this.navToStep}
                       customContainerStyles={{marginTop: 0, marginBottom: 10}}/> }

      { this.renderStep() }

      <View style={styles.buttonPane}>
        {this.renderButton()}
      </View>
    </View>
  );

  renderError = () => (
    <View style={styles.windowDefault}>
      <Text>Cos poszlo nei tak, prosze sprobuj ponownie pozniej.</Text>
      <ButtonPrimary onPress={this.closeModal}>Powrot</ButtonPrimary>
    </View>
  );

  renderSuccess = () => (
    <View style={styles.windowDefault}>
      <Text>Pomyslnie zapisano harmonogram.</Text>
      <ButtonPrimary onPress={()=>{this.closeModal(); this.props.onSuccessBtnPress()}}>Powrot</ButtonPrimary>
    </View>
  );

  render() {
    const { modalProps, openedModalName, status } = this.props;
    console.log(this.props);

    return (
      <Modal
        visible={openedModalName === MODALS_IDS.SAVE_EMPLOYEE_AVAILABILITY}
        animationType={'slide'}
        onRequestClose={this.closeModal}
        transparent={true}
        {...modalProps}
      >
        <View style={styles.overlay}>
          { status === FETCHING_STATUS.READY && this.renderStepsWizard() }

          { status === FETCHING_STATUS.ERROR && this.renderError() }

          { status === FETCHING_STATUS.FETCHING && <ActivityIndicator color={Colors.snow} size={'large'}/> }

          { status === FETCHING_STATUS.SUCCESS && this.renderSuccess() }
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ( {
  openedModalName: state.modals.openedModalId,
  template: state.scheduleForm.template,
  new_template_binding_from: state.scheduleForm.new_template_binding_from,
  schedule_type: state.scheduleForm.schedule_type,
  status: state.scheduleForm.status,
  showBindingFromStep: isTemplateEmpty(state.schedule.new_template) || state.scheduleForm.schedule_type === TEMPLATE_TYPES.NEW_TEMPLATE
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(modalActionCreators.close()),
  setBindingFrom: date => dispatch(scheduleFormActionCreators.changeNewTemplateBindingFrom(date)),
  updateScheduleRequest: data => dispatch(scheduleFormActionCreators.updateRequest(data)),
  changeStatus: status => dispatch(scheduleFormActionCreators.changeStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilitySummaryModal);

/** == STYLING ================================================ */
const BREATH_SPACE = 15;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowDefault: {
    borderRadius: 15,
    paddingTop: 15,
    width: '90%',
    backgroundColor: Colors.snow,
  },
  window: {
    maxHeight: '90%',
    paddingBottom: 0,
    paddingHorizontal: 15,
    backgroundColor: Colors.snow,
  },
  crossIconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  crossIcon: {
    backgroundColor: 'transparent',
    fontWeight: '100',
  },
  textArea: {
    marginVertical: BREATH_SPACE,
  },
  buttonPane: {
    marginVertical: 15,
  },
  startsFrom: {
    fontFamily: Fonts.type.light,
    marginBottom: 10
  },
  startsFromEmphasise: {
    fontFamily: Fonts.type.base
  },
  appliesForm: {
    marginVertical: 15,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.regular
  },
  optionRow: {
    flexDirection: 'row',
    marginVertical: 10
  },
  radioLabeL: {
    marginLeft: 10
  }
});
