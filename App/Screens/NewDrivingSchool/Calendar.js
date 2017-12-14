import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Colors } from '../../Themes';
import NavHeader from '../../Components/NavHeader';
import StepsIndicators from '../../Components/StepsIndicators';
import ScheduleBoundaries from '../../Components/ScheduleBoundariesView';
import Layout from '../../Components/Layout';

const renderScheduleBoundaries = ({input, meta, setValue}) => {
 return <ScheduleBoundaries value={input.value} meta={meta} setValue={setValue} />
};


class Calendar extends Component {
  static navigationOptions = {
    header: props => <View><NavHeader navigation={props.navigation} title={'Information'}/><StepsIndicators
      labels={['Informacje', 'Powiadomienia', 'Kalendarz']} activeIndex={2}/></View>
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { change } = this.props;
    return (
      <Layout customStyles={{paddingTop: 0}}>
        <Field name={'schedule_boundaries'} component={renderScheduleBoundaries} setValue={/*see @1*/ newValue => { change('schedule_boundaries', newValue); this.forceUpdate(); }}/>
      </Layout>
    )
  }
}

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
  }
})(Calendar);

/**
@1 since arrow functions does NOT autobind context,
  the function will look for "this" in outside context frame which is React Component(ScheduleBoundaries).
  Alternatively one can use this.props.setValue.apply(this, [arg]) in mentioned component.
**/
