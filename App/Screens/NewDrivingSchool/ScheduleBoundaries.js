import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';
import ScheduleBoundariesPicker from '../../Components/ScheduleBoundariesView';
import Layout from '../../Components/Layout';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';
import FORM_IDS from './Constants';
import { updateScheduleBoundaries } from '../../Redux/ScheduleBoundariesRedux';

const renderScheduleBoundaries = ({ input, meta, setValue }) => {
  return <ScheduleBoundariesPicker value={input.value} meta={meta} setValue={setValue}/>
};

const FORM_ID = FORM_IDS.SCHEDULE_BOUNDARIES;

class ScheduleBoundaries extends Component {
  static navigationOptions = {
    header: props => <View><NavHeader navigation={props.navigation} title={'Calendar'}/><StepsIndicators
      labels={['Informacje', 'Powiadomienia', 'Kalendarz', 'Ustawienia']} activeIndex={2}/></View>
  };

  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  submitForm() {
    this.props.handleSubmit(updateScheduleBoundaries)();
  }

  render() {
    const { change, error } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <Field name={'schedule_boundaries'} component={renderScheduleBoundaries} setValue={/*see @1*/ newValue => {
          change('schedule_boundaries', newValue);
          this.forceUpdate();
        }}/>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateScheduleBoundariesRequest: (...params) => dispatch(drivingSchoolActionCreators.updateScheduleBoundariesRequest(...params))
});

ScheduleBoundaries = connect(null, mapDispatchToProps)(ScheduleBoundaries);

export default reduxForm({
  form: 'scheduleBoundaries',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    schedule_boundaries: [
      { weekday: 'monday', start_time: null, end_time: null },
      { weekday: 'tuesday', start_time: null, end_time: null },
      { weekday: 'wednesday', start_time: null, end_time: null },
      { weekday: 'thursday', start_time: null, end_time: null },
      { weekday: 'friday', start_time: null, end_time: null },
      { weekday: 'saturday', start_time: null, end_time: null },
      { weekday: 'sunday', start_time: null, end_time: null }
    ]
  },
  onSubmitSuccess: (result, dispatch, props) => {
    const {nextStep} = props.navigation.state.params;
    const callback =  nextStep ? () => props.navigation.navigate(nextStep, {nextStep: 'step3'}) : props.handleSubmitSuccess;
    callback();
  }
})(ScheduleBoundaries);

/**
 @1 since arrow functions does NOT autobind context,
 the function will look for "this" in outside context frame which is React Component(ScheduleBoundaries).
 Alternatively one can use this.props.setValue.apply(this, [arg]) in mentioned component.
**/
