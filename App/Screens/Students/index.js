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

import { canManageStudents } from '../../Lib/AuthorizationHelpers';
import { FETCHING_STATUS } from '../../Lib/utils';

import { studentsActionCreators } from '../../Redux/StudentsRedux';

import { Fonts, Colors } from '../../Themes/';
import listProjectorStyles from '../../Styles/ListProjector';

/** Screen */
class StudentsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentIndex: 0
    }
  }

  componentWillMount() {
    this.props.studentsIndexRequest();
  }

  changeTab = index => {
    this.setState({
      segmentIndex: index
    })
  };

  renderActiveStudent = ({item, index }) => (
    <ListItem
      title={`${item.name} ${item.surname}`}
      subtitle={item.email}
      leftIcon={<DefaultAvatar name={item.name} index={index}/>}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );

  renderPendingStudent = ({item, index}) => (
    <ListItem
      title={`${item.name} ${item.surname}`}
      subtitle={item.email}
      leftIcon={<DefaultAvatar name={item.name} index={index}/>}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );

  renderPlaceholder = () => {
    if ( this.props.status !== FETCHING_STATUS.FETCHING ) {
      return (
        <Text style={styles.listPlaceholder}>
          Nie masz jeszcze zadnych kursantów, zapros ich do wspolpracy juz
          teraz!
        </Text>
      )
    } else {
      return null;
    }
  };

  render() {
    const {
      status,
      pendingStudents,
      activeStudents,
      navigation,
      drivingSchool
    } = this.props;

    const { segmentIndex } = this.state;

    const list = [
      { data: activeStudents,
        renderer: this.renderActiveStudent,
        segmentName: `Aktywni (${activeStudents.length})`
      },
      { data: pendingStudents,
        renderer: this.renderPendingStudent,
        segmentName: `Zaproszeni (${pendingStudents.length})`
      }
    ];

    if(!canManageStudents(drivingSchool)) {
      return (
        <FullScreenInformation>
          {I18n.t('lacksPrivileges.canManageStudent')}
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
                  onRefresh={this.props.studentsIndexRequest}
                  refreshing={status === FETCHING_STATUS.FETCHING}
                  tintColor={Colors.primaryWarm}
                />
              }
            />
          </List>
          <ButtonPrimary float={true} onPress={()=>navigation.navigate('inviteStudent')}>Dodaj kursanta</ButtonPrimary>
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => ({
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  activeStudents: state.students.activeIds.map( id => state.students.active[id]),
  pendingStudents: state.students.pendingIds.map( id => state.students.pending[id]),
  status: state.students.status
});

const styles = {
  listPlaceholder: {}
};

const mapDispatchToProps = dispatch => ({
  studentsIndexRequest: () => dispatch(studentsActionCreators.indexRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsIndex)
