import React, { Component } from 'react';
import { Text, FlatList, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { studentsActionCreators } from '../../Redux/StudentsRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';
import listProjectorStyles from '../../Styles/ListProjector';
import Icon from 'react-native-vector-icons/Entypo';

class ActiveStudentsList extends Component {
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
                title={`${item.name} ${item.surname}`}
                titleStyle={{fontFamily: Fonts.type.regular}}
                subtitleStyle={{fontFamily: Fonts.type.regular}}
                rightIcon={<Icon name={'chevron-thin-right'} color={Colors.strongGrey} size={18} style={{alignSelf: 'center'}}/>}
                subtitle={item.email}
                leftIcon={<DefaultAvatar name={item.name} index={index}/>}
                containerStyle={{ borderBottomWidth: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ActiveStudentsList)
