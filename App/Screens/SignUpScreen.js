import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';
import { reduxForm, Field } from 'redux-form';
import RadioButton from '../Components/RadioButton';
import InputField from '../Components/InputField';
import CheckBox from '../Components/CheckBox';
import InputLabel from '../Components/InputLabel';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import PrimaryButton from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import DatePicker from 'react-native-datepicker';
import RadioButtonsCollection from '../Components/RadioBoxPairInputField';

const styles = StyleSheet.create({
  acceptTermsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  acceptTermsLabel: {
    fontSize: Fonts.size.small,
    color: Colors.strongGrey,
    marginLeft: 20
  },
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  datepicker: {
    flex: 1,
    alignItems: 'center',
  },
  datepickerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10
  },
  datepickerLabel: {
    fontSize: Fonts.size.medium,
    color: Colors.primaryWarm
  }
});

const datepickerCustom = {
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
    height: Fonts.size.medium
  },
  dateText: {
    textAlign: 'left',
    fontSize: Fonts.size.medium
  },
  dateTouchBody: {
    height: Fonts.size.medium
  },
  btnTextConfirm: {
    color: Colors.primaryWarm
  }
};

class SignUpScreen extends Component {
  static navigationOptions = {
    header: (props) => <NavHeader navigation={props.navigation} title={'Załóż konto'}/>
  };

  constructor(props) {
    super(props);
    this.state = { date: "2016-05-15" };
  }

  render() {
    const typeData = [
      {boundValue: 'employee', label: 'Employee'},
      {boundValue: 'student', label: 'Student'}
    ];

    return (
      <Layout>

        <Field name={'type'} data={typeData} setValue={(val) => () => this.props.change('type', val)}
        component={RadioButtonsCollection}/>



        {/*<InputLabel label={'Kim jestes?'} required={true}/>*/}
        {/*<View style={styles.selectRow}>*/}
          {/*<View style={styles.selectOption}>*/}
            {/*<Field name={'type'} boundValue={'employee'} setValue={() => this.props.change('type', 'employee')}*/}
                   {/*component={RadioButton}/>*/}
            {/*<Text style={styles.selectLabel}>Pracownik</Text>*/}
          {/*</View>*/}
          {/*<View style={styles.selectOption}>*/}
            {/*<Field name={'type'} boundValue={'student'} setValue={() => this.props.change('type', 'student')}*/}
                   {/*component={RadioButton}/>*/}
            {/*<Text style={styles.selectLabel}>Kursant</Text>*/}
          {/*</View>*/}
        {/*</View>*/}

        {/*<Field name={'email'} component={InputField} label={'Email'} required={true}/>*/}
        {/*<Field name={'name'} component={InputField} label={'Imię'} required={true}/>*/}
        {/*<Field name={'surname'} component={InputField} label={'Nazwisko'} required={true}/>*/}
        {/*<Field name={'password'} component={InputField} label={'Haslo'} required={true}*/}
               {/*options={{ secureTextEntry: true }}/>*/}
        {/*<Field name={'passwordConfirmation'} component={InputField} label={'Potwierdź haslo '} required={true}*/}
               {/*options={{ secureTextEntry: true }}/>*/}

        {/*<InputLabel label={'Plec'}/>*/}
        {/*<View style={styles.selectRow}>*/}
          {/*<View style={styles.selectOption}>*/}
            {/*<Field name={'gender'} boundValue={'male'} setValue={() => this.props.change('gender', 'male')}*/}
                   {/*component={RadioButton}/>*/}
            {/*<Text style={styles.selectLabel}>Mężczyzna</Text>*/}
          {/*</View>*/}
          {/*<View style={styles.selectOption}>*/}
            {/*<Field name={'gender'} boundValue={'female'} setValue={() => this.props.change('gender', 'female')}*/}
                   {/*component={RadioButton}/>*/}
            {/*<Text style={styles.selectLabel}>Kobieta</Text>*/}
          {/*</View>*/}
        {/*</View>*/}

        {/*<InputLabel label={'Data urodzenia'} required={true}/>*/}
        {/*<View style={styles.datepickerRow}>*/}
          {/*<DatePicker*/}
            {/*style={styles.datepicker}*/}
            {/*customStyles={datepickerCustom}*/}
            {/*ref={(picker) => { this.datePicker = picker; }}*/}
            {/*date={this.state.date}*/}
            {/*showIcon={false}*/}
            {/*mode="date"*/}
            {/*placeholder="Kliknij aby wprowadzic date"*/}
            {/*format="YYYY-MM-DD"*/}
            {/*confirmBtnText="Potwierdz"*/}
            {/*cancelBtnText="Anuluj"*/}
            {/*onDateChange={(date) => {*/}
              {/*this.setState({ date: date })*/}
            {/*}}*/}
          {/*/>*/}
          {/*<TouchableOpacity style={{flex:1}} onPress={()=>this.datePicker.onPressDate()}>*/}
            {/*<Text style={styles.datepickerLabel}>Wybierz datę</Text>*/}
          {/*</TouchableOpacity>*/}
        {/*</View>*/}

        {/*<View style={styles.acceptTermsRow}>*/}
          {/*<Field name={'accepted'} setValue={(value) => () => this.props.change('accepted', value)}*/}
                 {/*component={CheckBox}/>*/}
          {/*<Text style={styles.acceptTermsLabel}>Zgadzam się na zasady i warunki serwisu AutoGraph.</Text>*/}
        {/*</View>*/}
        {/*<View style={styles.btnWrapper}>*/}
          {/*<PrimaryButton>Zarejestruj</PrimaryButton>*/}
        {/*</View>*/}
      </Layout>
    )
  }
}

export default reduxForm({ form: 'signUp' })(SignUpScreen);
