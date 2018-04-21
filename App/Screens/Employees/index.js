/** Built-in modules */
import React, { Component } from 'react';
import { FlatList, View, RefreshControl, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import I18n from '../../I18n';
/** Custom modules */
import InfoBox from '../../Components/InfoBox';
import SegmentsControl from '../../Components/SegmentsControl';
import DefaultAvatar from '../../Components/DefaultAvatar';
import ButtonPrimary from '../../Components/ButtonPrimary';
import EmployeeRolesSubtitle from '../../Components/EmployeeRolesSubtitle';
import ButtonText from '../../Components/ButtonText';
import InvitationInformationTitle from '../../Components/InvitationInformationTitle';
import InvitationInformationSubtitle from '../../Components/InvitationInformationSubtitle';
import ModalTemplate from '../../Components/ModalTemplate';
import DestroyInvitationConfirmation from '../../Components/DestroyInvitationConfirmation';

import { canManageEmployees } from '../../Lib/AuthorizationHelpers';
import { FETCHING_STATUS } from '../../Lib/utils';

import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import { invitationActionCreators } from '../../Redux/InvitationsRedux';
import { contextActionCreators } from '../../Redux/ContextRedux';
import { MODALS_IDS, modalActionCreators } from '../../Redux/ModalRedux';

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

  componentWillMount() {
    this.props.employeesIndexRequest();
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

  openConfirmationModal = (employeeId) =>
    this.setState({ employeeId }, this.props.openDestroyInvitationModal)

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
        <Text style={styles.listPlaceholder}>
          Nie masz jeszcze zadnych pracownikow, zapros ich do pracy juz teraz!
        </Text>
      )
    } else {
      return null;
    }
  };

  render() {
    const {
      status,
      pendingEmployees,
      activeEmployees,
      navigation,
      drivingSchool
    } = this.props;

    const { segmentIndex } = this.state;

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
                 description={I18n.t('lacksPrivileges.generic')} />
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
                  onRefresh={this.props.employeesIndexRequest}
                  refreshing={status === FETCHING_STATUS.FETCHING}
                  tintColor={Colors.primaryWarm}
                />
              }
              />
          </List>
          <ButtonPrimary float={true} onPress={()=>navigation.navigate('inviteEmployee')}>Dodaj pracownika</ButtonPrimary>
          <ModalTemplate
            modalID={MODALS_IDS.DESTROY_EMPLOYEE_INVITATION}
            status={this.props.invitationDestroyStatus}
            closeModalCallback={this.props.resetInvitationFetchingStatus}>
            <DestroyInvitationConfirmation
              onPress={() => this.props.destroyInvitation({type: 'Employee', user_id: this.state.employeeId})}
            />
          </ModalTemplate>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  pendingEmployees: state.employees.pendingIds.map(id => state.employees.pending[id]),
  activeEmployees: state.employees.activeIds.map(id => state.employees.active[id]),
  status: state.employees.status,
  invitationDestroyStatus: state.invitations.status
});

const styles = {
  listPlaceholder: {}
};

const mapDispatchToProps = dispatch => ({
  setCurrentEmployee: (id) => dispatch(contextActionCreators.setCurrentEmployee(id)),
  employeesIndexRequest: () => dispatch(employeesActionCreators.indexRequest()),
  openDestroyInvitationModal: () => dispatch(modalActionCreators.open(MODALS_IDS.DESTROY_EMPLOYEE_INVITATION)),
  destroyInvitation: (params) => dispatch(invitationActionCreators.destroyRequest(params)),
  resetInvitationFetchingStatus: () =>
    dispatch(invitationActionCreators.changeStatus(FETCHING_STATUS.READY))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesIndex)
