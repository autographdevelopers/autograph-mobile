import React, { Component } from 'react';
import { Text, FlatList, RefreshControl, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { studentsActionCreators } from '../../Redux/StudentsRedux';
import { invitationActionCreators } from '../../Redux/InvitationsRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import EmployeeRolesSubtitle from '../../Components/EmployeeRolesSubtitle';
import InvitationInformationTitle from '../../Components/InvitationInformationTitle';
import InvitationInformationSubtitle from '../../Components/InvitationInformationSubtitle';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';
import listProjectorStyles from '../../Styles/ListProjector';
import I18n from '../../I18n/index'
import { MODALS_IDS, modalActionCreators } from '../../Redux/ModalRedux';
import ModalTemplate from '../../Components/ModalTemplate'
import ButtonText from '../../Components/ButtonText'
import DestroyInvitationConfirmation from '../../Components/DestroyInvitationConfirmation';

class InvitedStudentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student_id: null
    };
  }

  componentWillMount() {
    this.props.fetchStudents();
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
                  <InvitationInformationSubtitle invitation_sent_at={item.invitation_sent_at}/>
                }
                leftIcon={
                  <DefaultAvatar name={item.name} index={index}/>
                }
                rightIcon={
                  <ButtonText
                    onPress={
                      () => this.setState(
                        {student_id: item.id},
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
            keyExtractor={(e, i) => e.id}
            refreshControl={
              <RefreshControl
                onRefresh={this.props.fetchStudents}
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
            onPress={() => this.props.destroyInvitation({type: 'Student', user_id: this.state.student_id})}
          />
        </ModalTemplate>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.students.pendingIds.map( id => state.students.pending[id]),
  status: state.students.status,
  invitationDestroyStatus: state.invitations.status
});

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(studentsActionCreators.indexRequest()),
  openDestoryInvitationModal: () => dispatch(modalActionCreators.open(MODALS_IDS.DESTROY_INVITATION)),
  destroyInvitation: (params) => dispatch(invitationActionCreators.destroyRequest(params)),
  resetInvitationFetchingStatus: () =>
    dispatch(invitationActionCreators.changeStatus(FETCHING_STATUS.READY))
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedStudentsList)

// TODO add invited employee to store once it has been saved on the server
// TODO distinguish refresing and loading so that loader in header and list are not visible both while component mounting
