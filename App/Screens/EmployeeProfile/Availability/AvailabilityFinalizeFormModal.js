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

import { Colors, Fonts } from '../../../Themes/index';
import { scheduleFormActionCreators } from '../../../Redux/ScheduleFormRedux';
import { TEMPLATE_TYPES } from '../../../Redux/ScheduleFormRedux';
import { isTemplateEmpty } from '../../../Lib/utils';
import ScheduleSummary from '../../../Components/ScheduleSummary';
import ButtonPrimary from '../../../Components/ButtonPrimary';
import StepsIndicators  from '../../../Components/StepsIndicators';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import RadioButton from '../../../Components/RadioButton';

const STEPS = ['Ustawienia', 'Podsumowanie'];

class AvailabilityFinalizeFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.showBindingFromStep ? 0 : 1,
    };
  }

  submitSchedule = () => {
    const { template, new_template_binding_from, schedule_type, showBindingFromStep } = this.props;
    const params = {};
    // schedule_type === TEMPLATE_TYPES.NEW_TEMPLATE &&
    const templateType = showBindingFromStep && new_template_binding_from ? 'new_template' : 'current_template';

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
    // TODO: fix this 'width: 100%' issue in modal children

    return (
      <View style={{width: '100%'}}>
        { showBindingFromStep && <StepsIndicators labels={STEPS}
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

const mapStateToProps = state => ( {
  openedModalName: state.modals.openedModalId,
  template: state.scheduleForm.template,
  new_template_binding_from: state.scheduleForm.new_template_binding_from,
  schedule_type: state.scheduleForm.schedule_type,
  status: state.scheduleForm.status,
  showBindingFromStep: !state.schedule.new_template_binding_from || isTemplateEmpty(state.schedule.new_template) || state.scheduleForm.schedule_type === TEMPLATE_TYPES.NEW_TEMPLATE
});

const mapDispatchToProps = dispatch => ({
  setBindingFrom: date => dispatch(scheduleFormActionCreators.changeNewTemplateBindingFrom(date)),
  updateScheduleRequest: data => dispatch(scheduleFormActionCreators.updateRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityFinalizeFormModal);

/** == STYLING ================================================ */

const styles = StyleSheet.create({
  stepIndicatorCustom: {
    marginTop: 0,
    marginBottom: 10
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
