import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection } from 'redux-form';
import {
  scheduleSettingsActionCreators,
  updateScheduleSettings,
} from '../../Redux/Entities/ScheduleSettingsRedux';

import ScheduleBoundariesPicker from '../../Components/ScheduleBoundariesView';
import FORM_IDS from './Constants';
import LoadingHOC from '../../HOC/LoadingHOC';
import WeekdayTimeFrames from '../../Components/WeekdayTimeFrames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fonts, Colors, Metrics } from '../../Themes/';
import I18n from '../../I18n/index';
import {slotHelper} from '../../Lib/SlotHelpers';
import { getSchoolIdOfCurrentContext } from '../../Lib/DrivingSchoolHelpers';

const PARAM_NAME = 'valid_time_frames';

const WEEKDAYS = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

const FORM_ID = FORM_IDS.SCHEDULE_BOUNDARIES;

class ScheduleBoundaries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeekday: 0
    };

    if (this.props.screenProps && this.props.screenProps.bindScreenRef) {
      const key = this.props.navigation.state.routeName;
      this.props.screenProps.bindScreenRef(key, this);
    }
  }

  componentWillUnmount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.handleSubmitSuccess) {
      this.props.destroy();
    }
  }

  submitForm = () => {
    this.props.handleSubmit(updateScheduleSettings)();
  };

  nextDay = () => {
    this.setState({
      currentWeekday: (this.state.currentWeekday + 1) % WEEKDAYS.length
    });
  };

  prevDay = () => {
    this.setState({
      currentWeekday: (this.state.currentWeekday - 1) === -1 ? WEEKDAYS.length - 1 : (this.state.currentWeekday - 1)
    });
  };

  setDay = index => () => {
    this.setState({
      currentWeekday: index
    });
  };

  render() {
    const {
      change,
      error,
      navigation,
      submitting,
      initialize
    } = this.props;

    const currentDay = this.state.currentWeekday;

    const currentDayLabel= I18n.t(`weekdays.normal.${WEEKDAYS[currentDay]}`);

    return (
      <View>
        <FormErrorMessage>{error}</FormErrorMessage>
        <View style={[styles.currentWeekdayRow, styles.row]}>
          <TouchableOpacity onPress={this.prevDay}>
            <Icon name={'angle-left'} size={30} color={Colors.primaryWarm}/>
          </TouchableOpacity>
          <Text style={styles.currentWeekday}>{currentDayLabel}</Text>
          <TouchableOpacity onPress={this.nextDay}>
            <Icon name={'angle-right'} size={30} color={Colors.primaryWarm}/>
          </TouchableOpacity>
        </View>

        <FormSection name={PARAM_NAME}>
          <View>
            {WEEKDAYS.map((day, index) => {
                if( currentDay === index) {
                  return (
                    <Field name={day}
                           component={ScheduleBoundariesPicker}
                           setFormValue={change}
                           paramName={PARAM_NAME}
                           initForm={initialize}
                    />
                  )
                } else {
                  return null;
                }
            })}

            {WEEKDAYS.map((day, index) => (
              <Field name={day}
                     key={`day-summary-checkbox-row-${index}`}
                     component={WeekdayTimeFrames}
                     setFormValue={change}
                     active={index===currentDay}
                     handlePress={this.setDay(index)}
                     validate={slotHelper.validateFrames}/>
            ))}
          </View>
        </FormSection>

        {navigation.state.params && navigation.state.params.id &&
          <ButtonPrimary submitting={submitting} onPress={this.submitForm}>Zapisz</ButtonPrimary>
        }
      </View>
    )
  }
}

ScheduleBoundaries = reduxForm({
  form: FORM_ID,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmitSuccess: (result, dispatch, props) => {
    const { navigation } = props;

    try {
      navigation.state.params.handleSubmitSuccess();
    } catch (error) {
      navigation.navigate('step3');
    }
  }
})(ScheduleBoundaries);

ScheduleBoundaries = LoadingHOC(ScheduleBoundaries);

const mapStateToProps = (state, otherProps)=> {
  return {
    shouldRequestData: true,
    drivingSchool: state.support.context.currentDrivingSchoolID,
    initialValues: {
      [PARAM_NAME]: state.entities.scheduleSettings[PARAM_NAME],
      driving_school_id: getSchoolIdOfCurrentContext(otherProps)
    },
    status: state.entities.scheduleSettings.status
  }
};

const mapDispatchToProps = (dispatch, otherProps) => {
  const drivingSchoolId = getSchoolIdOfCurrentContext(otherProps);

  return {
    requestData: () =>
      dispatch(scheduleSettingsActionCreators.showRequest(drivingSchoolId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBoundaries);

const styles = StyleSheet.create({
  currentWeekdayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hide: {
    height: 0,
    width: 0
  },
  currentWeekday: {
    marginHorizontal: 35,
    width: '50%',
    fontSize: Fonts.size.regular,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  applyToAllDays: {
    marginVertical: 10
  }
});
