import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection } from 'redux-form';
import {
  scheduleSettingsActionCreators,
  updateScheduleSettings,
} from '../../Redux/ScheduleSettingsRedux';

import ScheduleBoundariesPicker from '../../Components/ScheduleBoundariesView';
import Layout from '../../Components/Layout';
import FORM_IDS from './Constants';
import LoadingHOC from '../../Containers/LoadingHOC';
import WeekdayTimeFrames from '../../Components/WeekdayTimeFrames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fonts, Colors, Metrics } from '../../Themes/';
import I18n from '../../I18n/index';

const PARAM_NAME = 'valid_time_frames';
const INITIAL_STATE = {
  [PARAM_NAME]: {
    monday: [0, 1],
    tuesday: [0, 1],
    wednesday: [0, 1],
    thursday: [0, 1],
    friday: [0, 1],
    saturday: [0, 1],
    sunday: [0, 1],
  }
};

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

  render() {
    const {
      change,
      error,
      navigation,
      submitting,
      initialize
    } = this.props;

    const currentDay= I18n.t(`weekdays.normal.${WEEKDAYS[this.state.currentWeekday]}`);

    return (
      <Layout customStyles={{paddingTop: 0}}>
        <FormErrorMessage>{error}</FormErrorMessage>
        <View style={[styles.currentWeekdayRow, styles.row]}>
          <TouchableOpacity onPress={this.prevDay}>
            <Icon name={'angle-left'} size={30} color={Colors.primaryWarm}/>
          </TouchableOpacity>
          <Text style={styles.currentWeekday}>{currentDay}</Text>
          <TouchableOpacity onPress={this.nextDay}>
            <Icon name={'angle-right'} size={30} color={Colors.primaryWarm}/>
          </TouchableOpacity>
        </View>

        <Field name={`${PARAM_NAME}.${WEEKDAYS[this.state.currentWeekday]}`}
               component={ScheduleBoundariesPicker}
               setFormValue={change}
               initForm={initialize}/>

        <FormSection name={PARAM_NAME}>
          <View>
            <Field name={'monday'} component={WeekdayTimeFrames} setFormValue={change} />
            <Field name={'tuesday'} component={WeekdayTimeFrames} setFormValue={change} />
            <Field name={'wednesday'} component={WeekdayTimeFrames} setFormValue={change} />
            <Field name={'thursday'} component={WeekdayTimeFrames} setFormValue={change} />
            <Field name={'friday'} component={WeekdayTimeFrames} setFormValue={change} />
            <Field name={'saturday'} component={WeekdayTimeFrames} setFormValue={change} />
            <Field name={'sunday'} component={WeekdayTimeFrames} setFormValue={change} />
          </View>
        </FormSection>

        {navigation.state.params && navigation.state.params.singleton &&
          <ButtonPrimary submitting={submitting} onPress={this.submitForm}>Zapisz</ButtonPrimary>
        }
      </Layout>
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

// ScheduleBoundaries = LoadingHOC(ScheduleBoundaries);

const mapStateToProps = state => {
  return {
    drivingSchool: state.context.currentDrivingSchoolID,
    initialValues: INITIAL_STATE,
    status: state.scheduleSettings.status
  }
};

const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(scheduleSettingsActionCreators.showRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBoundaries);


const styles = StyleSheet.create({
  currentWeekdayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentWeekday: {
    marginHorizontal: 35,
    width: '50%',
    fontSize: Fonts.size.regular,
    color: Colors.softBlack,
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
