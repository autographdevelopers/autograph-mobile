import React, { Component } from 'react';
import { Text, FlatList, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';
import listProjectorStyles from '../../Styles/ListProjector';

class InvitedEmployeesList extends Component {
  componentWillMount() {
    this.props.fetchEmployees();
  }

  render() {
    return (
      <Layout scroll={false} customStyles={{paddingTop: 0}}>
        <Text style={listProjectorStyles.header}>{`Zaproszeni pracownicy (${this.props.employees.length})`}</Text>
        <List containerStyle={listProjectorStyles.containerStyle}>
          <FlatList
            contentContainerStyle={listProjectorStyles.contentContainerStyle}
            data={this.props.employees}
            renderItem={({ item, index }) => (
              <ListItem
                title={`${item.name} ${item.surname}`}
                subtitle={item.email}
                leftIcon={<DefaultAvatar name={item.name} index={index}/>}
                containerStyle={{ borderBottomWidth: 0 }}
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
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.employees.pendingIds.map( id => state.employees.pending[id]),
  status: state.employees.status
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: () => dispatch(employeesActionCreators.indexRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedEmployeesList)
