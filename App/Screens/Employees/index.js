/** Built-in modules */
import React, { Component } from 'react';
import { FlatList, View, RefreshControl, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import I18n from '../../I18n';
/** Custom modules */
import FullScreenInformation from '../../Components/FullScreenInformation';
import SegmentsControl from '../../Components/SegmentsControl';
import DefaultAvatar from '../../Components/DefaultAvatar';
import ButtonPrimary from '../../Components/ButtonPrimary';
import Layout from '../../Components/Layout';

import { canManageEmployees } from '../../Lib/AuthorizationHelpers';
import { FETCHING_STATUS } from '../../Lib/utils';

import { employeesActionCreators } from '../../Redux/EmployeesRedux';

import { Fonts, Colors } from '../../Themes/';
import listProjectorStyles from '../../Styles/ListProjector';

/** Screen */
class EmployeesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentIndex: 0
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
    this.props.screenProps.setCurrentEmployee(user.id);
    this.props.navigation.navigate('userProfile', { user, index });
  };

  renderActiveEmployee = ({item, index  }) => (
    <ListItem
      title={`${item.name} ${item.surname}`}
      subtitle={item.email}
      leftIcon={<DefaultAvatar name={item.name} index={index}/>}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={this.goToUserProfile(item, index)}
    />
  );

  renderPendingEmployee = ({item, index}) => (
    <ListItem
      title={`${item.name} ${item.surname}`}
      subtitle={item.email}
      leftIcon={<DefaultAvatar name={item.name} index={index}/>}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );

  renderPlaceholder = () => (
    <Text style={styles.listPlaceholder}>
      Nie masz jeszcze zadnych pracownikow, zapros ich do pracy juz teraz!
    </Text>
  );

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
        <FullScreenInformation>
          {I18n.t('lacksPrivileges.canManageEmployee')}
        </FullScreenInformation>
      )
    } else {
      return (
        <Layout scroll={false} customStyles={{paddingTop: 0}}>
          <SegmentsControl componentProps={{
            values: list.map(item => item.segmentName),
            selectedIndex: segmentIndex,
            onTabPress: this.changeTab
          }}
          />
          <List containerStyle={listProjectorStyles.containerStyle}>
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
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => ({
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  pendingEmployees: state.employees.pendingIds.map(id => state.employees.pending[id]),
  activeEmployees: state.employees.activeIds.map(id => state.employees.active[id]),
  status: state.employees.status
});

const styles = {
  listPlaceholder: {}
};

const mapDispatchToProps = dispatch => ({
  employeesIndexRequest: () => dispatch(employeesActionCreators.indexRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesIndex)
