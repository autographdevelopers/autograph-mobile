import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../../Lib/utils';
import {
  isDrivingSchoolRelationActive,
  isDrivingSchoolAwaitingActivation,
  isDrivingSchoolRelationPending,
} from '../../Lib/DrivingSchoolHelpers';
import { invitationActionCreators } from '../../Redux/InvitationsRedux';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';
import { contextActionCreators } from '../../Redux/ContextRedux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, Colors } from '../../Themes/index';

import AccountHeader from '../../Components/AccountHeader';
import NavHeader from '../../Components/NavHeader';
import DrivingSchoolCell from '../../Components/DrivingSchoolCell';
import ButtonText from '../../Components/ButtonText';
import { modalActionCreators, MODALS_IDS } from '../../Redux/ModalRedux';
import DialogBox from '../../Components/DialogBox';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { schoolActivationActionCreators } from '../../Redux/SchoolActivation';

class MySchoolsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.props.fetchSchoolsRequest();
  };

  navigateToNewDrivingSchoolForm = () => {
    this.props.setCurrentSchoolContext(null);
    this.props.navigation.navigate('newDrivingSchool');
  };

  navigateToSchoolContext = school => {
    this.props.setCurrentSchoolContext(school.id);
    this.props.navigation.navigate('main', { drivingSchool: school });
  };

  renderDrivingSchoolsList = (data, helperText) => {
    if ( this.props.drivingSchools.status === FETCHING_STATUS.FETCHING ) {
      return <ActivityIndicator size={'large'} color={Colors.primaryWarm}/>;
    } else {
      if ( data.length > 0 )
        return <List containerStyle={{
          borderBottomWidth: 0,
          borderTopWidth: 0,
          marginTop: 0,
        }}>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <DrivingSchoolCell drivingSchool={item}
                                 acceptInvitationRequest={this.props.acceptInvitationRequest}
                                 rejectInvitationRequest={this.props.rejectInvitationRequest}
                                 navigateToSchool={this.navigateToSchoolContext}
                                 openActivateSchoolModal={this.props.triggerSchoolActivationDialog}
              />
            }
            keyExtractor={(s, i) => `drivingSchool-${s.id}`}
          />
        </List>;
      else
        return <View style={styles.helperContainer}>
          <Text style={styles.helperText}>
            {helperText}
          </Text>
        </View>;
    }
  };

  renderOverlay = () => {
    if ( this.props.invitations.status === FETCHING_STATUS.FETCHING )
      return <View style={styles.loading}>
        <ActivityIndicator size='large' color={Colors.snow}/>
      </View>;
  };

  render() {
    console.log(this.props.screenProps);
    const { activeDrivingSchools, awaitingActivationDrivingSchools, invitingDrivingSchools } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <AccountHeader user={this.props.user}/>
        <View style={styles.listContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.listHeader}>
                Moje szkoły
              </Text>
              <View style={styles.underline}/>
            </View>
            <ButtonText
              onPress={this.navigateToNewDrivingSchoolForm}
              customTextStyle={{ fontSize: 13 }}
              customStyle={{ marginTop: 7 }}
              icon={<Icon name={'plus'} size={16} color={Colors.primaryWarm}/>}>
              Dodaj Szkołę
            </ButtonText>
          </View>
          {this.renderDrivingSchoolsList(
            [...activeDrivingSchools, ...awaitingActivationDrivingSchools],
            'Tutaj wyświetlą się szkoły, do których należysz.')}
          <Text style={styles.listHeader}>
            Zaproszenia do współpracy
          </Text>
          <View style={styles.underline}/>
          {this.renderDrivingSchoolsList(invitingDrivingSchools,
            'Tutaj wyświetlą się zaproszenia do szkół.')}
        </View>
        {this.renderOverlay()}
        <DialogBox modalName={MODALS_IDS.ACTIVATE_SCHOOL}
                   dialogTexts={{
                     title: 'Aktywuj szkołę',
                     description: 'Aby w pełni korzystać z aplikacji, Twoja szkoła musi zostać zweryfikowana.',
                   }}
                   dialogBtn={{
                     title: 'Activate', handler: () => {
                       this.props.fetchSchoolsRequest();
                     },
                   }}
                   mode={'primary'}
                   icon={<MCIcon name={'rocket'} color={Colors.primaryWarm}
                                 size={70}/>}
                   status={this.props.drivingSchools.status}
                   onModalClose={()=>this.props.resetSchoolActivationState()}
        >

          <Text style={styles.confirmationInstruction}>Wpisz <Text
            style={{ fontWeight: '400' }}>kod</Text> potwierdzajacy..</Text>
          <TextInput style={styles.codeInput}/>
        </DialogBox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  listHeader: {
    fontSize: 20,
    color: 'gray',
  },
  underline: {
    marginTop: 8,
    width: 45,
    borderColor: Colors.primaryWarm,
    borderWidth: 2,
    borderRadius: 10,
  },
  helperContainer: {
    backgroundColor: Colors.lightGrey,
    marginVertical: 15,
    paddingVertical: 15,
    borderRadius: 5,
  },
  helperText: {
    color: Colors.strongGrey,
    alignSelf: 'center',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 100,
  },
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
});

const mapStateToProps = ({ drivingSchools, invitations, user }) => ( {
  activeDrivingSchools: Object.values(drivingSchools.hashMap).
    filter(isDrivingSchoolRelationActive),
  invitingDrivingSchools: Object.values(drivingSchools.hashMap).
    filter(isDrivingSchoolRelationPending),
  awaitingActivationDrivingSchools: Object.values(drivingSchools.hashMap).
    filter(isDrivingSchoolAwaitingActivation),
  drivingSchools,
  invitations,
  user,
} );

const mapDispatchToProps = dispatch => ( {
  fetchSchoolsRequest: () => dispatch(
    drivingSchoolActionCreators.indexRequest()),
  setCurrentSchoolContext: id => dispatch(
    contextActionCreators.setCurrentDrivingSchool(id)),
  acceptInvitationRequest: id => dispatch(
    invitationActionCreators.acceptRequest(id)),
  rejectInvitationRequest: id => dispatch(
    invitationActionCreators.rejectRequest(id)),
  triggerSchoolActivationDialog: id => {
    dispatch(schoolActivationActionCreators.setSchoolToBeActivated(id));
    dispatch(modalActionCreators.open(MODALS_IDS.ACTIVATE_SCHOOL));
  },
  resetSchoolActivationState: () => dispatch(
    schoolActivationActionCreators.resetState()),
} );

export default connect(mapStateToProps, mapDispatchToProps)(MySchoolsScreen);
