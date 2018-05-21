/** Lib dependencies */
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import IconM from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
/** Custom dependencies */
import ScheduleSummary from '../../../Components/ScheduleSummary';
import ButtonPrimary from '../../../Components/ButtonPrimary';
import StepsIndicators  from '../../../Components/StepsIndicators';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import RadioButton from '../../../Components/RadioButton';
import { scheduleFormActionCreators } from '../../../Redux/Views/ScheduleFormRedux';
import { TEMPLATE_TYPES } from '../../../Redux/Views/ScheduleFormRedux';
import { Colors, Fonts } from '../../../Themes/index';

const STEPS = ['Ustawienia', 'Podsumowanie'];

class FinalizeFormWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.showBindingFromStep ? 0 : 1,
    };
  }

  submitSchedule = () => {
    const { template, new_template_binding_from, showBindingFromStep } = this.props;
    const params = {
      repetition_period_in_weeks: 2
    };

    let templateType;

    if (showBindingFromStep) {
      templateType = new_template_binding_from == null ? TEMPLATE_TYPES.CURRENT_TEMPLATE : TEMPLATE_TYPES.NEW_TEMPLATE
    } else {
      templateType = TEMPLATE_TYPES.CURRENT_TEMPLATE;
    }

    params[templateType] = template;

    if(showBindingFromStep)
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
    const handlePress = this.state.step === 0 ? this.navToStep(1) : this.submitSchedule;
    const label = this.state.step === 0 ? 'Dalej' : 'Zapisz';

    return <ButtonPrimary customWrapperStyles={customWrapperStyles}
                          icon={icon}
                          onPress={handlePress}>{label}</ButtonPrimary>;
  };

  renderStep = () => {
    const FORMAT = 'YYYY-MM-DD';
    const tommorow = moment().add(1, 'days').format(FORMAT);
    const starts_from = this.props.new_template_binding_from;
    const { setBindingFrom, new_template_binding_from } = this.props;

    if (this.state.step === 0) {
      const datePickerConfiguration = {
        ref: ref => this.datepicker = ref,
        minDate: tommorow,
        format: FORMAT,
        placeholder: 'dnia..(data)',
        onDateChange: setBindingFrom,
        date: starts_from
      };

      return (
        <View>
          <Text style={styles.appliesForm}>Obowiązuje od.. </Text>
          <TouchableOpacity style={styles.optionRow} onPress={() => setBindingFrom(null)} >
            <RadioButton active={new_template_binding_from === null} setValue={()=>setBindingFrom(null)} />
            <View style={styles.radioLabeL}><Text>teraz</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => this.datepicker.onPressDate()}>
            <RadioButton active={new_template_binding_from !== null} setValue={()=>this.datepicker.onPressDate()} />
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

  render() {
    const { showBindingFromStep } = this.props;

    return (
      <View style={{width: '100%'}}>
        { showBindingFromStep && <StepsIndicators stepsNo={STEPS.length}
                                                  activeIndex={this.state.step}
                                                  onPress={this.navToStep}
                                                  customContainerStyles={styles.stepIndicatorCustom}/>
        }
        { this.renderStep() }

        <View style={styles.buttonPane}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const showBindingFromStepForCurrentSchedule =
    state.views.scheduleForm.schedule_type === TEMPLATE_TYPES.CURRENT_TEMPLATE
      && state.entities.schedule.new_template_binding_from == null;

  const showBindingFromStepForNewSchedule =
    state.views.scheduleForm.schedule_type === TEMPLATE_TYPES.NEW_TEMPLATE;

  const showBindingFromStep = showBindingFromStepForCurrentSchedule
    || showBindingFromStepForNewSchedule;


  return {
    openedModalName: state.views.modals.meta.openedModalId,
    template: state.views.scheduleForm.template,
    new_template_binding_from: state.views.scheduleForm.new_template_binding_from,
    schedule_type: state.views.scheduleForm.schedule_type,
    status: state.views.scheduleForm.status,
    showBindingFromStep: showBindingFromStep
  }
};

const mapDispatchToProps = dispatch => ({
  setBindingFrom: date => dispatch(scheduleFormActionCreators.changeNewTemplateBindingFrom(date)),
  updateScheduleRequest: data => dispatch(scheduleFormActionCreators.updateRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinalizeFormWizard);

/** == STYLING ================================================ */

const styles = StyleSheet.create({
  stepIndicatorCustom: {
    marginTop: 0,
    marginBottom: 10,
    width: '50%'
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
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular
  },
  optionRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  radioLabeL: {
    marginLeft: 10
  }
});
