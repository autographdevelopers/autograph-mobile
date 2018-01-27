import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { studentsActionCreators } from '../../Redux/StudentsRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';

class InvitedStudentsList extends Component {
  componentWillMount() {
    this.props.fetchStudents();
  }

  render() {
    return (
      <Layout scroll={false} customStyles={{paddingTop: 0}}>
        <Text style={styles.header}>{`Aktywni kursanci (${this.props.employees.length})`}</Text>
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
                onPress={() => {}}
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
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.students.activeIds.map( id => state.students.active[id]),
  status: state.students.status
});

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(studentsActionCreators.indexRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedStudentsList)

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
