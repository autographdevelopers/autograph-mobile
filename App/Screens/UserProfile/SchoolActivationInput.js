import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import { Colors, Fonts } from '../../Themes';
import { schoolActivationActionCreators } from '../../Redux/SchoolActivation';

const SchoolActivationInput = props => {
  return (
    <View>
      <Text style={styles.confirmationInstruction}>Wpisz<Text
        style={{ fontWeight: '400' }}>kod</Text> potwierdzajacy..</Text>
      <TextInput
        style={styles.codeInput}
        onChangeText={props.setInputText}
        value={props.schoolActivation.inputVerificationCode}
        autoFocus={true}
      />
    </View>
  )
};

const styles = {
  confirmationInstruction: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    textAlign: 'center',
  },
  codeInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.strongGrey,
    paddingVertical: 10,
  },
};

const mapStateToProps = state => ({
  schoolActivation: state.schoolActivation
});

const mapDispatchToProps = dispatch => ({
  setInputText: text => dispatch(schoolActivationActionCreators.setInputText(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolActivationInput);
