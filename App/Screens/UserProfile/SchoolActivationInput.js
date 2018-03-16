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

const SchoolActivationInput = props => {
  const code = props.schoolActivation.inputVerificationCode;
  const schoolId = props.schoolActivation.schoolId;

  return (
    <View style={styles.container}>
      <Text style={styles.confirmationInstruction}>Wpisz <Text
        style={{ fontWeight: '400' }}>kod</Text> potwierdzajacy..</Text>
      <TextInput
        style={styles.codeInput}
        onChangeText={props.setInputText}
        value={code}
        autoFocus={true}
      />
      <View style={{marginBottom: 15, marginTop: 60}}>
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
    marginTop: 30,
  },
};

const mapStateToProps = state => ({
  schoolActivation: state.schoolActivation
});

const mapDispatchToProps = dispatch => ({
  setInputText: text => dispatch(schoolActivationActionCreators.setInputText(text)),
  activationRequest: (id, code) => () => dispatch(schoolActivationActionCreators.request(id, code))
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolActivationInput);
