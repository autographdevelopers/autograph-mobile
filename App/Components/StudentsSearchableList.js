import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import SearchableList from './SearchableList';
import ListHeaderSmall from '../Components/ListHeaderSmall';
import { ListItem } from 'react-native-elements';
import { Colors } from '../Themes/';
import DefaultAvatar from './DefaultAvatar';

const StudentsSearchableList = props => {
  const handlePress = id => () => {
    const callback = props.navigation.state.params.onResultPress || props.onResultPress;
    callback && callback(id);
  };

  return (
    <SearchableList
      data={props.students}
      renderSectionHeader={({section}) => <ListHeaderSmall label={section.title}/>}
      renderItem={({item, index}) => <ListItem title={`${item.name} ${item.surname}`} subtitle={
          <Text style={{color: Colors.strongGrey, fontSize: 12, fontWeight: '500'}}>
            {`Tel. ${item.phone_number}`}
          </Text>
        }
        onPress={handlePress(item.id)}
        leftIcon={<DefaultAvatar name={item.name} index={index}/>}
        containerStyle={{ borderBottomWidth: 0 }}
      />}
    />
  )
};

const mapStateToProps = state => ({
  students: Object.values(state.students.active)
});

export default connect(mapStateToProps)(StudentsSearchableList);
