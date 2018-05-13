import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, Colors } from '../Themes/index';
import {
  isDrivingSchoolRelationActive,
  isDrivingSchoolAwaitingActivation,
  isDrivingSchoolRelationPending
} from '../Lib/DrivingSchoolHelpers';

export default DrivingSchoolCell = ({ drivingSchool,
                                      acceptInvitationRequest,
                                      rejectInvitationRequest,
                                      navigateToSchool,
                                      openActivateSchoolModal,
                                      current = false }) => {

  renderInvitationButtons = () => {
    if (isDrivingSchoolRelationPending(drivingSchool))
      return (
        <View style={styles.invitationResponseSegment}>
          <TouchableOpacity style={[styles.invitationResponseButton, styles.btnAccept]} onPress={() => acceptInvitationRequest(drivingSchool.id)}>
            <Text style={{fontSize: Fonts.size.medium, color: Colors.green}}>Akceptuj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.invitationResponseButton, styles.btnReject]} onPress={() => rejectInvitationRequest(drivingSchool.id)}>
            <Text style={{fontSize: Fonts.size.medium, color: Colors.red}}>Odrzuć</Text>
          </TouchableOpacity>
        </View>
      )
  };

  renderCellAction = () => {
    if (isDrivingSchoolRelationActive(drivingSchool))
      return <Icon name={'chevron-right'} size={30} color={current ? Colors.primaryWarm : Colors.strongGrey}/>
    else if (isDrivingSchoolAwaitingActivation(drivingSchool))
      return <TouchableOpacity onPress={() => openActivateSchoolModal(drivingSchool.id)}>
        <Text style={{color: Colors.primaryWarm}}>Aktywuj</Text>
      </TouchableOpacity>
  };

  handleOnPress = () => {
    if (isDrivingSchoolRelationActive(drivingSchool))
      navigateToSchool(drivingSchool)
  };

  return (
    <View>
      <TouchableOpacity style={styles.cellContainer} activeOpacity={0.8} onPress={this.handleOnPress}>
        <Avatar
          medium
          rounded
          source={{uri: 'https://www.superprawojazdy.pl/szkola/9492/logo/logo.jpg?u=1517047020'}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.drivingSchoolName}>{drivingSchool.name}</Text>
          <Text style={styles.drivingSchoolAddress}>{drivingSchool.street}</Text>
        </View>
        <View style={{flex: 1}}/>
        {this.renderCellAction()}
      </TouchableOpacity>
      {this.renderInvitationButtons()}
    </View>
  )
}

const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: 10
  },
  textContainer: {
    marginLeft: 15,
  },
  drivingSchoolName: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.regular
  },
  drivingSchoolAddress: {
    color: Colors.strongGrey
  },
  invitationResponseSegment: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  invitationResponseButton: {
    paddingVertical: 10,
    width: '45%',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnAccept: {
    borderColor: Colors.green
  },
  btnReject: {
    borderColor: Colors.red
  }
});
