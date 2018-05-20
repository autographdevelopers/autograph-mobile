import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
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

  const renderInvitationButtons = () => {
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

  const renderCellAction = () => {
    if (isDrivingSchoolRelationActive(drivingSchool))
      return <Icon name={'chevron-right'} size={30} color={current ? Colors.primaryWarm : Colors.strongGrey}/>
    else if (isDrivingSchoolAwaitingActivation(drivingSchool))
      return <TouchableOpacity style={{ paddingLeft: 15 }}
                               onPress={() => openActivateSchoolModal(drivingSchool.id)}>
        <Text style={{color: Colors.primaryWarm}}>Aktywuj</Text>
      </TouchableOpacity>
  };

  return (
    <View>
      <ListItem
        roundAvatar
        avatar={{
          size: 'medium',
          rounded: true,
          uri:  "https://www.elite-driving-school.co.uk/kcfinder/upload/images/F4I%20part%20logo.png"
        }}
        containerStyle={{ borderBottomWidth: 0 }}
        wrapperStyle={{ marginLeft: 0 }}
        disabledStyle={{opacity: 1}}
        disabled={!isDrivingSchoolRelationActive(drivingSchool)}
        onPress={() => { navigateToSchool(drivingSchool) }}
        title={drivingSchool.name}
        subtitle={drivingSchool.street}
        rightIcon={ renderCellAction() } />
      { renderInvitationButtons() }
    </View>
  )
}

const styles = StyleSheet.create({
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
