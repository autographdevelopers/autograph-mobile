import React, { Component } from 'react'
import { StyleSheet, Text, FlatList, View, ScrollView, ActivityIndicator } from 'react-native'
import { List, ListItem, Avatar } from 'react-native-elements'

import { connect } from 'react-redux'
import { FETCHING_STATUS } from '../../Lib/utils'
import { invitationActionCreators } from '../../Redux/InvitationsRedux'
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux'
import { contextActionCreators } from '../../Redux/ContextRedux'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fonts, Colors } from '../../Themes/index'

import AccountHeader from '../../Components/AccountHeader'
import NavHeader from '../../Components/NavHeader'
import DrivingSchoolCell from '../../Components/DrivingSchoolCell'
import ButtonText from '../../Components/ButtonText'

class MySchoolsScreen extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount = () => {
    this.props.fetchSchoolsRequest()
  }

  navigateToNewDrivingSchoolForm = () => {
    this.props.setCurrentSchoolContext(null)
    this.props.navigation.navigate('newDrivingSchool')
  }

  getActiveSchools = () =>
    Object.values(this.props.drivingSchools.hashMap).filter(value =>
      value.employee_driving_school_status === 'active' && (value.status == 'active' || value.status === 'pending' && value.privilege_set.is_owner === true)
    )

  getInvitingSchools = () =>
    Object.values(this.props.drivingSchools.hashMap).filter(value =>
      value.employee_driving_school_status === 'pending' && value.status == 'active'
    )

  renderDrivingSchoolsList = (data, helperText) => {
    if (this.props.drivingSchools.status === FETCHING_STATUS.FETCHING) {
      return <ActivityIndicator size={'large'} color={Colors.primaryWarm}/>
    } else {
      if (!!data.length)
        return <List containerStyle={{borderBottomWidth: 0, borderTopWidth: 0, marginTop: 0}}>
          <FlatList
            data={data}
            renderItem={({item}) =>
              <DrivingSchoolCell drivingSchool={item}
                                 acceptInvitationRequest={this.props.acceptInvitationRequest}
                                 rejectInvitationRequest={this.props.rejectInvitationRequest}
              />
            }
            keyExtractor={(e, i) => i}
          />
        </List>
      else
        return <View style={styles.helperContainer}>
          <Text style={styles.helperText}>
            {helperText}
          </Text>
        </View>
    }
  }

  renderOverlay = () => {
    if (this.props.invitations.status === FETCHING_STATUS.FETCHING)
      return <View style={styles.loading}>
        <ActivityIndicator size='large'/>
      </View>
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <AccountHeader/>
        <View style={styles.listContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.listHeader}>
                Moje szkoły
              </Text>
              <View style={styles.underline}/>
            </View>
            <ButtonText
              onPress={this.navigateToNewDrivingSchoolForm}
              customTextStyle={{fontSize: 13}}
              customStyle={{marginTop: 7}}
              icon={<Icon name={'plus'} size={16} color={Colors.primaryWarm}/>}>
              Dodaj Szkołę
            </ButtonText>
          </View>
          {this.renderDrivingSchoolsList(this.getActiveSchools(), 'Tutaj wyświetlą się szkoły, do których należysz.')}
          <Text style={styles.listHeader}>
            Zaproszenia do współpracy
          </Text>
          <View style={styles.underline}/>
          {this.renderDrivingSchoolsList(this.getInvitingSchools(), 'Tutaj wyświetlą się zaproszenia do szkół.')}
        </View>
        {this.renderOverlay()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginHorizontal: 15
  },
  listHeader: {
    fontSize: 20,
    color: 'gray'
  },
  underline: {
    marginTop: 8,
    width: 45,
    borderColor: Colors.primaryWarm,
    borderWidth: 2,
    borderRadius: 10
  },
  helperContainer: {
    backgroundColor: Colors.lightGrey,
    marginVertical: 15,
    paddingVertical: 15,
    borderRadius: 5
  },
  helperText: {
    color: Colors.strongGrey,
    alignSelf: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({drivingSchools, invitations}) => ({drivingSchools, invitations})

const mapDispatchToProps = dispatch => ({
  fetchSchoolsRequest: () => dispatch(drivingSchoolActionCreators.indexRequest()),
  setCurrentSchoolContext: id => dispatch(contextActionCreators.setCurrentDrivingSchool(id)),
  acceptInvitationRequest: id => dispatch(invitationActionCreators.acceptRequest(id)),
  rejectInvitationRequest: id => dispatch(invitationActionCreators.rejectRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MySchoolsScreen)
