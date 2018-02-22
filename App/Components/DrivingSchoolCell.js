import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fonts, Colors } from '../Themes/'
import { FETCHING_STATUS } from '../Lib/utils';
import { isDrivingSchoolRelationActive, isDrivingSchoolAwaitingActivation, isDrivingSchoolRelationPending } from '../Lib/DrivingSchoolHelpers';

export default DrivingSchoolCell = ({ drivingSchool, acceptInvitationRequest, rejectInvitationRequest, navigateToSchool }) => {
  renderInvitationButtons = () => {
    if (isDrivingSchoolRelationPending(drivingSchool))
      return (
        <View style={styles.invitationResponseSegment}>
          <TouchableOpacity style={[styles.invitationResponseButton, {borderColor: Colors.green}]} onPress={() => acceptInvitationRequest(drivingSchool.id)}>
            <Text style={{fontSize: Fonts.size.medium, color: Colors.green}}>Akceptuj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.invitationResponseButton, {borderColor: Colors.red}]} onPress={() => rejectInvitationRequest(drivingSchool.id)}>
            <Text style={{fontSize: Fonts.size.medium, color: Colors.red}}>Odrzuć</Text>
          </TouchableOpacity>
        </View>
      )
  }

  renderCellAction = () => {
    if (isDrivingSchoolRelationActive(drivingSchool))
      return <Icon name={'chevron-right'} size={30} color={Colors.primaryWarm}/>
    else if (isDrivingSchoolAwaitingActivation(drivingSchool))
      return <Text style={{color: Colors.primaryWarm}}>Aktywuj</Text>
  }

  handleOnPress = () => {
    if (isDrivingSchoolRelationActive(drivingSchool))
      navigateToSchool(drivingSchool)
  }

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
    justifyContent: 'center',
    alignItems: 'center',
  }
})
