/** Built-in modules */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  SectionList,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/** == Action Creators ============================ */
import { drivingSchoolActionCreators } from '../../Redux/Entities/DrivingSchoolRedux';
import { schoolActivationActionCreators } from '../../Redux/Views/Modals/SchoolActivationRedux';
import { invitationActionCreators } from '../../Redux/Views/InvitationsRedux';
import { contextActionCreators } from '../../Redux/Support/ContextRedux';
import { modalActionCreators } from '../../Redux/Views/Modals/ModalRedux';
/** == Constants ============================ */
import { MODALS_IDS } from '../../Redux/Views/Modals/ModalRedux';
import { FETCHING_STATUS } from '../../Lib/utils';
/** == Components ============================ */
import AccountHeader from '../../Components/AccountHeader';
import SpinnerView from '../../Components/SpinnerView';
import DrivingSchoolCell from '../../Components/DrivingSchoolCell';
import ButtonText from '../../Components/ButtonText';
import SchoolActivationInput from './SchoolActivationInput';
import ModalTemplate from '../../Components/ModalTemplate';
import SectionHeader from '../../Components/SectionHeader';
import InfoBox from '../../Components/InfoBox';
/** == Selectors ============================ */
import * as schoolSelectors from '../../Selectors/DrivingSchool';
/** == Utils ============================ */
import { isEmployee, isStudent, isDrivingSchoolOwner } from '../../Lib/AuthorizationHelpers'
import { propsChangedOnlyByNavigation } from '../../Lib/utils';
import { Colors,Fonts } from '../../Themes';

const SECTION_TITLES = {
  mySchools: 'Moje szkoły',
  invitingSchools: 'Zaproszenia do współpracy'
};


/** Screen */
class MySchoolsScreen extends Component {
  componentWillMount = () => {
    this.props.fetchSchoolsRequest();
  };

  shouldComponentUpdate(nextProps) {
    return !propsChangedOnlyByNavigation(nextProps, this.props);
  }

  navigateToSchoolContext = school => {
    const {
      currentUser,
      navigation: { dispatch, goBack },
      saveDrivingSchool,
      currentDrivingSchool,
      setCurrentSchoolContext
    } = this.props;

    /** if we are already in the context of this school this means
     *  that it is enough to pop this screen to go back to school tabs navigator
     *  */
    const isCurrent = currentDrivingSchool && currentDrivingSchool.id === school.id;

    if(isCurrent) {
      goBack();
      return;
    }

    /** Set school context, this causes most of the store to be reset
     * but since we need to have current driving school object in store we
     * immediately push it to the store
     * */
    setCurrentSchoolContext(school.id);
    saveDrivingSchool(school);

    /** Navigate to proper tabs depending on user role */
    let userType;
    if ( isEmployee(currentUser) ) {
      if ( isDrivingSchoolOwner(school) )
        userType = 'owner';
      else
        userType = 'employee';
    } else if ( isStudent(currentUser) ) {
        userType = 'student';
    }
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
          NavigationActions.navigate(
            {
              routeName: `${userType}Flow`,
              params: { drivingSchool: school, user: currentUser },
            }
          )
      ],
    });

    dispatch(resetAction);
  };

  renderListItem = ({item}) => {
    const { currentDrivingSchool } = this.props;
    const isCurrent = currentDrivingSchool && currentDrivingSchool.id === item.id;

    if (item.sectionPlaceholder) {
      return <InfoBox description={item.sectionPlaceholder}   />
    } else {
      return <DrivingSchoolCell drivingSchool={item}
                                current={isCurrent}
                                acceptInvitationRequest={this.props.acceptInvitationRequest}
                                rejectInvitationRequest={this.props.rejectInvitationRequest}
                                navigateToSchool={this.navigateToSchoolContext}
                                openActivateSchoolModal={this.props.triggerSchoolActivationDialog}
      />
    }
  };

  renderSectionHeader = ({ section }) => {
    switch(section.title) {
      case SECTION_TITLES.mySchools:
        return (
          <View style={styles.headerWithBtn}>
            <SectionHeader title={section.title}/>
            <ButtonText
              onPress={()=>{this.props.navigation.navigate('newDrivingSchool')}}
              customTextStyle={{ fontSize: Fonts.size.small }}
              icon={<Icon name={'plus'} size={16} color={Colors.primaryWarm}/>}
              visible={isEmployee(this.props.currentUser)}>
              Dodaj Szkołę
            </ButtonText>
          </View>
        );
      case SECTION_TITLES.invitingSchools:
        return <SectionHeader title={section.title}/>;
    }
  };

  dataOrPlaceHolder = (data, placeHolder) =>
    data.length === 0 ? [{ sectionPlaceholder: placeHolder }] : data;

  render() {
    if ( this.props.drivingSchoolsFetchingStatus === FETCHING_STATUS.FETCHING )
      return <SpinnerView/>;

    const {
      activeDrivingSchools,
      awaitingActivationDrivingSchools,
      invitingDrivingSchools,
      schoolActivationStatus,
      resetSchoolActivationState,
      navigation,
      currentUser,
      drivingSchoolsFetchingStatus
    } = this.props;

    const mySchools = [
      ...activeDrivingSchools,
      ...awaitingActivationDrivingSchools
    ];

    const sections = [
      { title: SECTION_TITLES.mySchools,
        data: this.dataOrPlaceHolder(mySchools,
          'Tutaj wyświetlą się szkoły, do których należysz.') },
      { title: SECTION_TITLES.invitingSchools,
        data: this.dataOrPlaceHolder(invitingDrivingSchools,
          'Tutaj wyświetlą się zaproszenia do szkół.') }
    ];

    return (
      <View style={{ flex: 1 }}>
        <AccountHeader user={currentUser} navigation={navigation}/>

        { drivingSchoolsFetchingStatus === FETCHING_STATUS.SUCCESS &&
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={sections}
            stickySectionHeadersEnabled={true}
            keyExtractor={(s, _) => `drivingSchool-${s.id}`}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderListItem}
          />
        }

        <ModalTemplate
          modalID={MODALS_IDS.ACTIVATE_SCHOOL}
          status={schoolActivationStatus}
          successTitle={'Pomyślnie aktywowano szkołę.'}
          successMsg={'Możesz teraz w pełni korzystać z usług platformy Autograph.'}
          closeModalCallback={resetSchoolActivationState}>
            <SchoolActivationInput/>
        </ModalTemplate>
      </View>
    );
  }
}

const styles = {
  headerWithBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.snow,
    alignItems: 'center'
  }
};

const mapStateToProps = state => ({
  activeDrivingSchools: schoolSelectors.getActiveDrivingSchools(state),
  invitingDrivingSchools: schoolSelectors.getInvitingDrivingSchools(state),
  awaitingActivationDrivingSchools: schoolSelectors.getAwaitingActivationDrivingSchools(state),
  drivingSchoolsFetchingStatus: state.entities.drivingSchools.status,
  currentUser: state.access.currentUser,
  schoolActivationStatus: state.views.modals.schoolActivation.status,
  invitationsStatus: state.views.invitations.status,
  currentDrivingSchool: schoolSelectors.getCurrentDrivingSchool(state)
});

const mapDispatchToProps = dispatch => ({
  saveDrivingSchool: school => dispatch(drivingSchoolActionCreators.saveSingle(school)),
  fetchSchoolsRequest: () => dispatch(drivingSchoolActionCreators.indexRequest()),
  setCurrentSchoolContext: id => dispatch(contextActionCreators.setCurrentDrivingSchool(id)),
  acceptInvitationRequest: id => dispatch(invitationActionCreators.acceptRequest(id)),
  rejectInvitationRequest: id => dispatch(invitationActionCreators.rejectRequest(id)),
  triggerSchoolActivationDialog: id => {
    dispatch(schoolActivationActionCreators.setSchoolToBeActivated(id));
    dispatch(modalActionCreators.open(MODALS_IDS.ACTIVATE_SCHOOL));
  },
  resetSchoolActivationState: () => dispatch(
    schoolActivationActionCreators.resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySchoolsScreen);
