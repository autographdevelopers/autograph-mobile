import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Fonts, Colors } from '../Themes/index';
import { FETCHING_STATUS } from '../Lib/utils';

import DefaultAvatar from '../Components/DefaultAvatar';
import ButtonText from '../Components/ButtonText';

export default DrivingLessonsList = ({ drivingLesson, userContext, onCancelPress, canManageStudents }) => {
  const { status, hashMap, allIDs } = drivingLesson

  return (
    <View>
      { (status === FETCHING_STATUS.READY || status === FETCHING_STATUS.SUCCESS) &&
      <View>
        {renderDrivingLessons(hashMap, allIDs, userContext, onCancelPress, canManageStudents)}
      </View>
      }

      { status === FETCHING_STATUS.FETCHING &&
      <ActivityIndicator color={Colors.primaryWarm}
                         size={'large'}
                         style={{alignSelf: 'center'}} />
      }
    </View>
  )
}

const renderDrivingLessons = (hashMap, allIDs, userContext, onCancelPress, canManageStudents) => {
  return allIDs.map((id) => {
    let data = hashMap[id]
    return (<ListItem
      key={id}
      title={`${data[userContext].name} ${data[userContext].surname}`}
      subtitle={data.start_time}
      leftIcon={<DefaultAvatar name={data[userContext].name} index={id}/>}
      containerStyle={{ borderBottomWidth: 0 }}
      subtitleStyle={styles.subtitle}
      rightIcon={
        canManageStudents && <ButtonText
          onPress={() => onCancelPress(data.id)}
          customTextStyle={{color: Colors.salmon, fontSize: Fonts.size.small}}
          customStyle={{alignSelf: 'center', marginRight: 5}}>
          Odwołaj
        </ButtonText>
      }
      hideChevron={false}
    />)
  })
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
    fontWeight: '500'
  }
});
