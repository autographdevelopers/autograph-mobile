import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

import { ACTIVITY_IMAGE } from '../Lib/ActivitiesHelper';
import { Fonts } from '../Themes/';

export default ActivitiesListItem = ({ activity }) => {
  leftIcon = () =>
    <Avatar
      small
      source={ACTIVITY_IMAGE[activity.activity_type]}
      containerStyle={{ alignSelf: 'center', marginRight: 5}}
      overlayContainerStyle={{backgroundColor: 'transparent'}} />;

  formatMessage = message =>
    message.split(/<\/b>|<b>/).map((part, i) => {
        const bolded = message.includes(`<b>${part}</b>`)
        return <Text key={i} style={[styles.text, bolded ? styles.bolded : styles.regular]}>
          {part}
        </Text>
      }
    )

  displayUnreadBadge = () =>
    activity === false

  return (
    <ListItem
      contentContainerStyle={{marginLeft: 0}}
      key={activity.id}
      wrapperStyle={{marginLeft: 0}}
      title={
        <Text>
          {formatMessage(activity.message)}
        </Text>
      }
      subtitle={activity.created_at}
      leftIcon={leftIcon()}
      containerStyle={{borderBottomWidth: 0}}
      subtitleStyle={styles.subtitle}
      badge={{
        value: null,
        containerStyle: {
          backgroundColor: (displayUnreadBadge() ? '#4A90E2' : 'white'),
          height: 11,
          width: 11,
          padding: 0
        },
      }}
      hideChevron={true}
    />
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: Fonts.size.small
  },
  bolded: {
    fontFamily: Fonts.type.medium,
  },
  regular: {
    fontFamily: Fonts.type.regular
  },
  subtitle: {
    fontSize: Fonts.size.small,
    fontWeight: '400'
  }
});
