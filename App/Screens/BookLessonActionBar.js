import React, { Component } from 'react';
import { View } from 'react-native';
import BlockButton from '../Components/BlockButton';
import BookLessonTimeoutCounter from '../Components/BookLessonTimeoutCounter';
import { Colors, Fonts } from '../Themes/';

export const BookLessonActionBar = props => {
  const {
    minimum_slots_count_per_driving_lesson,
    selectedSlots,
    lessonInterval,
    handleBookLessonBtnPress,
    unlockSelectedSlots
  } = props;


  const slotsSelected = selectedSlots.length > 0;
  const tooFewSlotsSelected = slotsSelected && selectedSlots.length < minimum_slots_count_per_driving_lesson;
  const enoughSlotsSelected = slotsSelected && selectedSlots.length >= minimum_slots_count_per_driving_lesson;

  if(!slotsSelected) return null;

  return (
    <View>
      { tooFewSlotsSelected &&
      <BlockButton customContainerStyles={{backgroundColor: Colors.salmon}} disabled={true}>
        {`Zaznacz co najmniej ${minimum_slots_count_per_driving_lesson} sloty by stworzyc lekcję`}
      </BlockButton>
      }
      { enoughSlotsSelected &&
      <BlockButton onPress={handleBookLessonBtnPress}>
        {`Umów jazdę ${lessonInterval.from} - ${lessonInterval.to} ->`}
      </BlockButton>
      }
      { slotsSelected &&
      <BookLessonTimeoutCounter
        submaskColor={enoughSlotsSelected ? Colors.primaryWarm : Colors.salmon}
        release_at={selectedSlots[0].release_at}
        handleTimeout={unlockSelectedSlots}/>
      }
    </View>
  )
};
