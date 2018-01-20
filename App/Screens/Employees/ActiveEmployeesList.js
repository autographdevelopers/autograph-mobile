import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.snow,
    shadowOpacity: 0.15,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 8,
    borderRadius: 8,
    marginBottom: 15
  },
  header: {
    marginHorizontal: 15,
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    backgroundColor: 'transparent'
  }
});

class InvitedEmployeesList extends Component {
  componentWillMount() {
    this.props.fetchEmployees();
  }

  render() {

    const { navigation } = this.props;
    const { setCurrentEmployee } = this.props.screenProps;

    return (
      <Layout scroll={false} customStyles={{paddingTop: 0}}>
        <Text style={styles.header}>{`Aktywni pracownicy (${this.props.employees.length})`}</Text>
        <List containerStyle={[{ borderBottomWidth: 0, borderTopWidth: 0, flex: 1 }, styles.listContainer]}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 60
            }}
            data={this.props.employees}
            renderItem={({ item, index }) => (
              <ListItem
                title={`${item.name} ${item.surname}`}
                subtitle={item.email}
                leftIcon={<DefaultAvatar name={item.name} index={index}/>}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={ () => { setCurrentEmployee(item.id) ; navigation.navigate('userProfile', { user: item, index, setCurrentEmployee } ) } }
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(e, i) => e.id}
            refreshControl={
              <RefreshControl
                onRefresh={this.props.fetchEmployees}
                refreshing={this.props.status === FETCHING_STATUS.FETCHING}
                tintColor={Colors.primaryWarm}
              />}
          />
        </List>
        <ButtonPrimary float={true} onPress={()=> navigation.navigate('inviteEmployee')}>Dodaj pracownika</ButtonPrimary>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.employees.activeIds.map( id => state.employees.active[id]),
  status: state.employees.status
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: () => dispatch(employeesActionCreators.indexRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedEmployeesList)
