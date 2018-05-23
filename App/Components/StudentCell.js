import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import DefaultAvatar from './DefaultAvatar';
import { Colors } from '../Themes';
import { debouncePressEvent } from '../Lib/utils';
import Fonts from '../Themes/Fonts';

export const ActiveStudentCell = ({ student, index, onPressCallback }) => {
  return (
    <ListItem
      title={`${student.name} ${student.surname}`}
      subtitle={`Tel. ${student.phone_number}`}
      subtitleStyle={styles.subtitle}
      onPress={debouncePressEvent(onPressCallback)}
      containerStyle={styles.containerStyle}
      badge={{ value: `${student.available_hours} h`,
        textStyle: { fontSize: Fonts.size.extraSmall,
          fontFamily: Fonts.type.medium,
          color: Colors.strongGrey }, containerStyle: {
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: Colors.primaryWarm,
          paddingBottom: 0,
          borderRadius: 0,
          padding: 0
        } }}
      hideChevron
      leftIcon={<DefaultAvatar name={student.name} index={index}/>}
    />
  )
};

const styles = {
  containerStyle: {
    borderBottomWidth: 0
  },
  subtitle: {
    color: Colors.strongGrey,
    fontSize: 12,
    fontWeight: '500'
  }
};
