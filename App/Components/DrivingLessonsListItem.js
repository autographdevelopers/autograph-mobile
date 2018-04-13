import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { StyleSheet, Text } from 'react-native';
import moment from 'moment/moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonText from '../Components/ButtonText';
import DefaultAvatar from '../Components/DefaultAvatar';

import { Fonts, Colors } from '../Themes/index';
import { FETCHING_STATUS } from '../Lib/utils';
import { DRIVING_LESSON_TYPES } from '../Lib/DrivingLessonHelpers';

export default DrivingLessonsListItem = ({
                                           listKey,
                                           drivingLesson,
                                           userCanCancelLesson,
                                           userContext,
                                           onCancelPress }) => {

  const rightIcon = () => {
    const isFuture = moment().isBefore(drivingLesson.start_time)

    if(isFuture){
      if(drivingLesson.status === DRIVING_LESSON_TYPES.ACTIVE && userCanCancelLesson)
        return (
          <ButtonText
            onPress={() => onCancelPress(drivingLesson.id)}
            customTextStyle={{color: Colors.salmon, fontSize: Fonts.size.small}}
            customStyle={{alignSelf: 'center', marginRight: 5}}>
            Odwołaj
          </ButtonText>
        )
      else if(drivingLesson.status === DRIVING_LESSON_TYPES.CANCELED)
        return (
          <Text>Odwołana</Text>
        )
    }else{
      if(drivingLesson.status === DRIVING_LESSON_TYPES.CANCELED)
        return (
          <Text>Odwołana</Text>
        )
      else if(drivingLesson.status === DRIVING_LESSON_TYPES.ACTIVE)
        return (
          <Text>Odbyta</Text>
        )
    }
  }

  const subtitle = () =>
    drivingLesson.start_time

  const leftIcon = () =>
    <DefaultAvatar name={drivingLesson[userContext].name} index={drivingLesson.id}/>

  return (
    <ListItem
      key={drivingLesson.id}
      title={`${drivingLesson[userContext].name} ${drivingLesson[userContext].surname}`}
      subtitle={subtitle()}
      leftIcon={leftIcon()}
      containerStyle={{borderBottomWidth: 0}}
      subtitleStyle={styles.subtitle}
      rightIcon={rightIcon()}
      hideChevron={!rightIcon()}
    />
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
    fontWeight: '500'
  }
});
