import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { StyleSheet, Text } from 'react-native';
import moment from 'moment/moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonText from '../Components/ButtonText';
import DefaultAvatar from '../Components/DefaultAvatar';

import { Fonts, Colors } from '../Themes/index';
import { DRIVING_LESSON_STATUSES } from '../Lib/DrivingLessonHelpers';
import { drivingLessonHelpers } from '../Lib/DrivingLessonHelpers';

export default DrivingLessonsListItem = ({
                                           drivingLesson,
                                           userCanCancelLesson,
                                           userContext,
                                           onCancelPress }) => {

  console.log(drivingLesson);

  const rightIcon = lesson => {
    if (lesson.status === DRIVING_LESSON_STATUSES.CANCELED)
      return <Text style={styles.canceledText}>Odwołana</Text>;
    else if (lesson.status === DRIVING_LESSON_STATUSES.ACTIVE &&
      userCanCancelLesson && moment().isBefore(lesson.start_time))
      return <ButtonText
        onPress={onCancelPress}
        customTextStyle={{color: Colors.salmon, fontSize: Fonts.size.small}}
        customStyle={{alignSelf: 'center', marginRight: 5}}>
        Odwołaj
      </ButtonText>
  };

  const leftIcon = lesson =>
    <DefaultAvatar name={lesson[userContext].name} index={lesson.id}/>

  return (
    <ListItem
      key={drivingLesson.id}
      title={`${drivingLesson[userContext].name} ${drivingLesson[userContext].surname}`}
      subtitle={`${moment(drivingLesson.start_time).format('YYYY/MM/DD, HH:mm')} - ${drivingLessonHelpers.getEndTime(drivingLesson)}`}
      leftIcon={leftIcon(drivingLesson)}
      containerStyle={{borderBottomWidth: 0}}
      subtitleStyle={styles.subtitle}
      rightIcon={rightIcon(drivingLesson)}
      hideChevron={!rightIcon(drivingLesson)}
    />
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
    fontWeight: '500'
  },
  canceledText: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
    fontWeight: '500',
    alignSelf: 'center'
  }
});
