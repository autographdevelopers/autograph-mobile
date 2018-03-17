import React, { Component } from 'react';
import { Text, FlatList, RefreshControl, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { invitationActionCreators } from '../../Redux/InvitationsRedux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import Layout from '../../Components/Layout';
import EmployeeRolesSubtitle from '../../Components/EmployeeRolesSubtitle';
import InvitationInformationTitle from '../../Components/InvitationInformationTitle';
import InvitationInformationSubtitle from '../../Components/InvitationInformationSubtitle';
import ButtonText from '../../Components/ButtonText';
import { FETCHING_STATUS } from '../../Lib/utils';
import listProjectorStyles from '../../Styles/ListProjector';
import I18n from '../../I18n/index';
import { MODALS_IDS, modalActionCreators } from '../../Redux/ModalRedux';
import ModalTemplate from '../../Components/ModalTemplate';
import DestroyInvitationConfirmation from '../../Components/DestroyInvitationConfirmation';

class InvitedEmployeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee_id: null
    };
  }

  componentWillMount() {
    this.props.fetchEmployees();
  }

  render() {
    return (
      <Layout scroll={false} customStyles={{paddingTop: 0}}>
        <List containerStyle={listProjectorStyles.containerStyle}>
          <FlatList
            contentContainerStyle={listProjectorStyles.contentContainerStyle}
            data={this.props.employees}
            renderItem={({ item, index }) => (
              <ListItem
                title={
                  <InvitationInformationTitle email={item.email}/>
                }
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
                    onPress={
                      () => this.setState(
                        {employee_id: item.id},
                        this.props.openDestoryInvitationModal
                      )
                    }
                    customTextStyle={{color: Colors.salmon}}
                    customStyle={{alignSelf: 'center', marginRight: 5}}>
                    {I18n.t('withdraw_invitation')}
                  </ButtonText>
                }
                onPressRightIcon={()=>{}}
                containerStyle={{ borderBottomWidth: 0 }}
                hideChevron={false}
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(element, index) => element.id}
            refreshControl={
              <RefreshControl
                onRefresh={this.props.fetchEmployees}
                refreshing={this.props.status === FETCHING_STATUS.FETCHING}
                tintColor={Colors.primaryWarm}
              />}
          />
        </List>

        <ModalTemplate
          modalID={MODALS_IDS.DESTROY_INVITATION}
          status={this.props.invitationDestroyStatus}
          closeModalCallback={this.props.resetInvitationFetchingStatus}>
          <DestroyInvitationConfirmation
            onPress={() => this.props.destroyInvitation({type: 'Employee', user_id: this.state.employee_id})}
          />
        </ModalTemplate>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.employees.pendingIds.map( id => state.employees.pending[id]),
  status: state.employees.status,
  invitationDestroyStatus: state.invitations.status
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: () => dispatch(employeesActionCreators.indexRequest()),
  openDestoryInvitationModal: () => dispatch(modalActionCreators.open(MODALS_IDS.DESTROY_INVITATION)),
  destroyInvitation: (params) => dispatch(invitationActionCreators.destroyRequest(params)),
  resetInvitationFetchingStatus: () =>
    dispatch(invitationActionCreators.changeStatus(FETCHING_STATUS.READY))
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedEmployeesList)
