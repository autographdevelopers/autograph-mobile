import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import ScheduleBoundariesPicker from '../../Components/ScheduleBoundariesView';
import Layout from '../../Components/Layout';
import FORM_IDS from './Constants';
import { updateScheduleBoundaries } from '../../Redux/ScheduleBoundariesRedux';
import { scheduleBoundariesActionCreators } from '../../Redux/ScheduleBoundariesRedux';
import LoadingHOC from '../../Containers/LoadingHOC';

const INITIAL_STATE = {
  schedule_boundaries: [
    { weekday: 'monday', start_time: null, end_time: null },
    { weekday: 'tuesday', start_time: null, end_time: null },
    { weekday: 'wednesday', start_time: null, end_time: null },
    { weekday: 'thursday', start_time: null, end_time: null },
    { weekday: 'friday', start_time: null, end_time: null },
    { weekday: 'saturday', start_time: null, end_time: null },
    { weekday: 'sunday', start_time: null, end_time: null }
  ]
}

const renderScheduleBoundaries = ({ input, meta, setValue }) => {
  return <ScheduleBoundariesPicker value={input.value} meta={meta} setValue={setValue}/>
};

const FORM_ID = FORM_IDS.SCHEDULE_BOUNDARIES;

class ScheduleBoundaries extends Component {
  constructor(props) {
    super(props);

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
    this.props.handleSubmit(updateScheduleBoundaries)();
  };

  render() {
    const { change, error, navigation, submitting } = this.props;

    return (
      <Layout>
        <FormErrorMessage>{error}</FormErrorMessage>
        <Field name={'schedule_boundaries'} component={renderScheduleBoundaries} setValue={/*see @1*/ newValue => {
          change('schedule_boundaries', newValue);
          this.forceUpdate();
        }}/>
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

ScheduleBoundaries = LoadingHOC(ScheduleBoundaries);

const mapStateToProps = state => {
  const { currentDrivingSchoolID } = state.context;
  const schedule_boundaries = state.scheduleBoundaries.collection;

  return {
    drivingSchool: state.context.currentDrivingSchoolID,
    initialValues: schedule_boundaries.length !== 0 ? { schedule_boundaries } : INITIAL_STATE,
    status: state.scheduleBoundaries.status
  }
};

const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(scheduleBoundariesActionCreators.showRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBoundaries);

/**
 @1 since arrow functions does NOT autobind context,
 the function will look for "this" in outside context frame which is React Component(ScheduleBoundaries).
 Alternatively one can use this.props.setValue.apply(this, [arg]) in mentioned component.
 **/
