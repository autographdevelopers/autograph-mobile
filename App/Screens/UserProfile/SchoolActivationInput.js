import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import { Colors, Fonts } from '../../Themes';
import { schoolActivationActionCreators } from '../../Redux/SchoolActivationRedux';
import ButtonPrimary from '../../Components/ButtonPrimary';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';

const SchoolActivationInput = props => {
  const {
    errorMessage,
    schoolId,
    inputVerificationCode
  } = props.schoolActivation;

  return (
    <View style={styles.container}>
      <Text style={styles.confirmationInstruction}>Wpisz <Text
        style={{ fontWeight: '400' }}>kod</Text> potwierdzajacy..</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.codeInput}
          onChangeText={props.setInputText}
          value={inputVerificationCode}
          autoFocus={true}
          autoCapitalize={'none'}
        />
        <FormErrorMessage customStyles={{fontFamily: Fonts.type.base}}>{errorMessage}</FormErrorMessage>
      </View>
      <View style={{marginBottom: 15}}>
        <ButtonPrimary onPress={props.activationRequest(schoolId, code)}
                       customWrapperStyles={{width: '60%'}}>Aktywuj!</ButtonPrimary>
      </View>
    </View>
  )
};

const styles = {
  container: {
    paddingHorizontal: 15
  },
  confirmationInstruction: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.regular,
    color: Colors.black,
    textAlign: 'center',
  },
  codeInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.strongGrey,
  },
  inputContainer: {
    marginVertical: 50
  }
};

const mapStateToProps = state => ({
  schoolActivation: state.schoolActivation
});

const mapDispatchToProps = dispatch => ({
  setInputText: text => dispatch(schoolActivationActionCreators.setInputText(text)),
  activationRequest: (id, code) => () => dispatch(schoolActivationActionCreators.request(id, code))
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolActivationInput);
