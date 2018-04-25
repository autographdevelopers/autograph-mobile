import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

import { ACTIVITY_IMAGE } from '../Lib/ActivitiesHelper';
import { Fonts } from '../Themes/';

export default ActivitiesListItem = ({ activity }) => {
  leftIcon = () =>
    <Avatar
      medium
      resizeMode={'cover'}
      source={ACTIVITY_IMAGE[activity.activity_type]}
      containerStyle={{ alignSelf: 'center', paddingTop: 0, paddingBottom: 0, paddingRight: 0, margin: 5 }}
      overlayContainerStyle={{backgroundColor: 'transparent'}} />

  formatMessage = message =>
    message.split(/<\/b>|<b>/).map((part, i) => {
        const bolded = message.includes(`<b>${part}</b>`)
        return <Text key={i} style={bolded ? styles.bolded : styles.regular}>
          {part}
        </Text>
      }
    )

  displayUnreadBadge = () =>
    activity === false

  return (
    <ListItem
      key={activity.id}
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
  bolded: {
    fontWeight: '700'
  },
  regular: {
    fontWeight: '400'
  },
  subtitle: {
    fontSize: Fonts.size.small,
    fontWeight: '400'
  }
});
