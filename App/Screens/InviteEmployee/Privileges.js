import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../Components/InputField';
import { address, email, required } from '../../Lib/validators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavHeader from '../../Components/NavHeader';
import CellSwitch from '../../Components/CellWithSwitch';


const renderSwitch = ({ input, meta, componentProps }) => (
  <CellSwitch value={input.value} {...componentProps}/>
);


class PrivilegesScreen extends Component {
  static navigationOptions = {
    header: props => {
      return (<View><NavHeader navigation={props.navigation} title={'Uprawnienia'}/><StepsIndicators
        labels={['Informacje', 'Uprawnienia']} activeIndex={1}/></View>)
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  };

  constructor(props) {
    super(props);

    const key = this.props.navigation.state.routeName;
    this.props.screenProps.bindScreenRef(key, this);
  }

  render() {
    const { change } = this.props;
    return (
      <Layout customStyles={{ paddingTop: 0 }}>
        <Field name={'can_manage_employees'} component={renderSwitch}
               componentProps={{
                 label: 'Pozwalaj na zarzadzanie pracownikami',
                 description: 'Zaproszony uzytkownik bedzie mogl dodawac, usuwac pracownikow ze szkoly oraz nadawac im przywileje.',
                 onChangeHandler: value => change('can_manage_employees', value)
               }}/>
        <Field name={'can_manage_students'} component={renderSwitch}
               componentProps={{
                 label: 'Pozwalaj na zarzadzanie kursantami',
                 description: 'Zaproszony uzytkownik bedzie mogl dodawac, usuwac, archwiizowac kursanow oraz nadawać im dostepne lekcje..',
                 onChangeHandler: value => change('can_manage_students', value)
               }}/>
        <Field name={'can_modify_schedules'} component={renderSwitch}
               componentProps={{
                 label: 'Pozwalaj na ustalanie grafiku',
                 description: 'Zaproszony uzytkownik bedzie mogl ustawiac grafik.',
                 onChangeHandler: value => change('can_modify_schedules', value)
               }}/>
        <Field name={'is_driving'} component={renderSwitch}
               componentProps={{
                 label: 'Jest instruktorem',
                 description: 'Lorem ipsum dolor sit melt',
                 onChangeHandler: value => change('is_driving', value)
               }}/>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'InviteEmployeePrivilegesStep',
  destroyOnUnmount: false,
  // forceUnregisterOnUnmount: true,
  initialValues: {
    can_manage_employees: false,
    can_manage_students: false,
    can_modify_schedules: false,
    is_driving: false
  }
})(PrivilegesScreen);
