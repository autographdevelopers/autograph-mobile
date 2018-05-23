import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import SearchableList from './SearchableList';
import ListHeaderSmall from '../Components/ListHeaderSmall';
import { ActiveStudentCell } from './StudentCell';

const StudentsSearchableList = props => {
  const handlePress = id => () => {
    const callback = props.navigation.state.params.onResultPress || props.onResultPress;
    callback && callback(id);
  };

  return (
    <SearchableList
      data={props.students}
      renderSectionHeader={({section}) => <ListHeaderSmall label={section.title}/>}
      renderItem={({item, index}) =>
        <ActiveStudentCell student={item}
                           onPressCallback={handlePress(item.id)}
                           index={index} />
        }
    />
  )
};

const mapStateToProps = state => ({
  students: Object.values(state.entities.students.active)
});

export default connect(mapStateToProps)(StudentsSearchableList);
