import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

export default ActivitiesListItem = ({ activity }) => {

  leftIcon = () =>
    <Avatar
      medium
      source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
      onPress={() => console.log("Works!")}
      activeOpacity={0.7}
    />

  return (
    <ListItem
      key={activity.id}
      title={activity.message}
      subtitle={activity.created_at}
      leftIcon={leftIcon()}
      containerStyle={{borderBottomWidth: 0}}
      subtitleStyle={styles.subtitle}
      hideChevron={true}
    />
  )
};
