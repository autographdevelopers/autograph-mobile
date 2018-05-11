/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { FlatList, View, RefreshControl, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import I18n from '../../I18n';
import ActionButton from 'react-native-action-button';
/** == Components ====================================== */
import InfoBox from '../../Components/InfoBox';
import SegmentsControl from '../../Components/SegmentsControl';
import DefaultAvatar from '../../Components/DefaultAvatar';
import EmployeeRolesSubtitle from '../../Components/EmployeeRolesSubtitle';
import ButtonText from '../../Components/ButtonText';
import InvitationInformationTitle from '../../Components/InvitationInformationTitle';
import InvitationInformationSubtitle from '../../Components/InvitationInformationSubtitle';
import ModalTemplate from '../../Components/ModalTemplate';
import DestroyInvitationConfirmation from '../../Components/DestroyInvitationConfirmation';
/** == HOCs ============================================ */
import withRequiredData from '../../HOC/withRequiredData';
/** == Constants ============================================ */
import { FETCHING_STATUS } from '../../Lib/utils';
import { MODALS_IDS } from '../../Redux/Views/Modals/ModalRedux';
/** == Action Creators ================================= */
import { employeesScreenActionCreators } from '../../Redux/Views/EmploeesScreenRedux';
import { invitationActionCreators } from '../../Redux/Views/InvitationsRedux';
import { contextActionCreators } from '../../Redux/Support/ContextRedux';
import { modalActionCreators } from '../../Redux/Views/Modals/ModalRedux';
/** == Selectors ======================================= */
import { getPendingEmployees, getActiveEmployees } from '../../Selectors/Employees';
import { getCurrentDrivingSchool } from '../../Selectors/DrivingSchool';
/** == Utils ============================================ */
import { canManageEmployees } from '../../Lib/AuthorizationHelpers';
import { Fonts, Colors } from '../../Themes/';
import listProjectorStyles from '../../Styles/ListProjector';


/** Screen */
class EmployeesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentIndex: 0,
      employeeId: null
    }
  }

  changeTab = index => {
    this.setState({
      segmentIndex: index
    })
  };

  goToUserProfile = (user, index) => () => {
    this.props.setCurrentEmployee(user.id);
    this.props.navigation.navigate('employeeProfile', { user, index });
  };

  openConfirmationModal = employeeId => {
    this.setState({ employeeId }, this.props.openDestroyInvitationModal)
  };

  renderActiveEmployee = ({item, index  }) => (
    <ListItem
      title={`${item.name} ${item.surname}`}
      subtitle={<EmployeeRolesSubtitle employeePrivileges={item.privileges}/>}
      leftIcon={<DefaultAvatar name={item.name} index={index}/>}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={this.goToUserProfile(item, index)}
    />
  );

  renderPendingEmployee = ({item, index}) => (
    <ListItem
      title={<InvitationInformationTitle email={item.email}/>}
      subtitle={
        <View>
          <EmployeeRolesSubtitle employeePrivileges={item.privileges}/>
          <InvitationInformationSubtitle invitation_sent_at={item.invitation_sent_at}/>
        </View>
      }
      leftIcon={
        <DefaultAvatar name={item.name} index={index}/>
      }
      rightIcon={
        <ButtonText
          onPress={() => this.openConfirmationModal(item.id)}
          customTextStyle={{color: Colors.salmon}}
          customStyle={{alignSelf: 'center', marginRight: 5}}>
          {I18n.t('withdraw_invitation')}
        </ButtonText>
      }
      onPressRightIcon={()=>{}}
      containerStyle={{ borderBottomWidth: 0 }}
      hideChevron={false}
    />
  );

  renderPlaceholder = () => {
    if ( this.props.status !== FETCHING_STATUS.FETCHING ) {
      return (
        <InfoBox description={'Nie masz jeszcze zadnych pracownikow, zapros ich do pracy juz teraz!'}
                 customContainerStyle={{marginHorizontal: 15}}
        />
      )
    } else {
      return null;
    }
  };

  render() {
    const {
      refreshEmployeesList,
      pendingEmployees,
      activeEmployees,
      resetInvitationFetchingStatus,
      invitationDestroyStatus,
      destroyInvitation,
      navigation,
      drivingSchool
    } = this.props;

    const { segmentIndex, employeeId } = this.state;

    const list = [
      { data: activeEmployees,
        renderer: this.renderActiveEmployee,
        segmentName: `Aktywni (${activeEmployees.length})`
      },
      { data: pendingEmployees,
        renderer: this.renderPendingEmployee,
        segmentName: `Zaproszeni (${pendingEmployees.length})`
      }
    ];

    if(!canManageEmployees(drivingSchool)) {
      return (
        <InfoBox title={I18n.t('lacksPrivileges.canManageEmployee')}
                 description={I18n.t('lacksPrivileges.generic')}
                 customContainerStyle={{marginHorizontal: 15}}
        />
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <SegmentsControl componentProps={{
            values: list.map(item => item.segmentName),
            selectedIndex: segmentIndex,
            onTabPress: this.changeTab
          }}
          />
          <List containerStyle={[listProjectorStyles.containerStyle, {flex: 1}]}>
            <FlatList
              contentContainerStyle={listProjectorStyles.contentContainerStyle}
              data={list[segmentIndex].data}
              renderItem={list[segmentIndex].renderer}
              ListEmptyComponent={this.renderPlaceholder}
              showsVerticalScrollIndicator={false}
              keyExtractor={(element, _) => `employee-cell-${element.id}`}
              refreshControl={
                <RefreshControl
                  onRefresh={refreshEmployeesList}
                  refreshing={this.props.isRefreshing}
                  tintColor={Colors.primaryWarm}
                />
              }
              />
          </List>
          <ActionButton buttonColor={Colors.primaryWarm} onPress={()=>navigation.navigate('inviteEmployee')} />
          <ModalTemplate
            modalID={MODALS_IDS.DESTROY_EMPLOYEE_INVITATION}
            status={invitationDestroyStatus}
            closeModalCallback={resetInvitationFetchingStatus}>
            <DestroyInvitationConfirmation
              onPress={() => destroyInvitation({type: 'Employee', user_id: employeeId})}
            />
          </ModalTemplate>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  drivingSchool: getCurrentDrivingSchool(state),
  pendingEmployees: getPendingEmployees(state),
  activeEmployees: getActiveEmployees(state),
  status: state.views.employeesScreen.status,
  isRefreshing: state.views.employeesScreen.refreshing,
  invitationDestroyStatus: state.views.invitations.status
});

const mapDispatchToProps = dispatch => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id)),
  requestDataForView: () => dispatch(employeesScreenActionCreators.requestDataForView({})),
  refreshEmployeesList: () => dispatch(employeesScreenActionCreators.refreshListRequest({})),
  openDestroyInvitationModal: () => dispatch(modalActionCreators.open(MODALS_IDS.DESTROY_EMPLOYEE_INVITATION)),
  destroyInvitation: params => dispatch(invitationActionCreators.destroyRequest(params)),
  resetInvitationFetchingStatus: () =>
    dispatch(invitationActionCreators.changeStatus(FETCHING_STATUS.READY))
});

const withAsyncLoading = withRequiredData(
  EmployeesIndex,
  'status',
  'requestDataForView'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
