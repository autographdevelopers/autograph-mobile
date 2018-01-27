import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fonts, Colors } from '../Themes/'
import InputFieldLayout from './InputFieldLayout'
import ButtonText from './ButtonText'

export default DrivingSchoolCell = ({drivingSchool}) => {
  renderInvitationButtons = () => {
    if (drivingSchool.status === 'active' && drivingSchool.employee_driving_school_status === 'pending')
      return (
        <View style={styles.invitationResponseSegment}>
          <TouchableOpacity style={[styles.invitationResponseButton, {borderColor: '#4CDA64'}]}>
            <Text style={{fontSize: 15, color: '#4CDA64'}}>Akceptuj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.invitationResponseButton, {borderColor: '#FF3B30'}]}>
            <Text style={{fontSize: 15, color: '#FF3B30'}}>Odrzuć</Text>
          </TouchableOpacity>
        </View>
      )
  }

  renderCellAction = () => {
    if (drivingSchool.status === 'active' && drivingSchool.employee_driving_school_status === 'active')
      return <Icon name={'chevron-right'} size={30} color={Colors.primaryWarm}/>
    else if (drivingSchool.status === 'pending' && drivingSchool.employee_driving_school_status === 'active' && drivingSchool.privilege_set.is_owner === true)
      return (
        <ButtonText position={'center'} onPress={() => {}}>
          Aktywuj
        </ButtonText>
      )
  }

  return (
    <View>
      <View style={styles.cellContainer}>
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
      </View>
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
    color: 'gray',
    fontSize: 17
  },
  drivingSchoolAddress: {
    color: 'gray'
  },
  invitationResponseSegment: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  invitationResponseButton: {
    // paddingHorizontal: 10,
    paddingVertical: 10,
    width: '45%',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
