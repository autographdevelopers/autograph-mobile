import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Fonts, Colors } from '../Themes/index';
import { FETCHING_STATUS } from '../Lib/utils';

import DefaultAvatar from '../Components/DefaultAvatar';
import ButtonText from '../Components/ButtonText';

export default class DrivingLessonsList extends Component {

  renderDrivingLessons = () => {
    const { status, hashMap, allIDs } = this.props.drivingLessons
    const { onCancelPress, canManageStudents, userContext } = this.props

    if(status === FETCHING_STATUS.READY || status === FETCHING_STATUS.SUCCESS) {
      if (allIDs.length === 0) {
        return <Text style={styles.emptyDrivingLessons}>Brak nadchodzących jazd</Text>
      } else {
        return allIDs.map((id) => {
          let data = hashMap[id]
          return (<ListItem
            key={id}
            title={`${data[userContext].name} ${data[userContext].surname}`}
            subtitle={data.start_time}
            leftIcon={<DefaultAvatar name={data[userContext].name} index={id}/>}
            containerStyle={{borderBottomWidth: 0}}
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
    }else if(status === FETCHING_STATUS.FETCHING) {
      return <ActivityIndicator color={Colors.primaryWarm}
                                size={'large'}
                                style={{alignSelf: 'center'}}/>
    }
  }

  render(){
    return (
      <View>
        {this.renderDrivingLessons()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
    fontWeight: '500'
  },
  emptyDrivingLessons: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    fontWeight: '500',
    alignSelf: 'center',
    margin: 15
  }
});
