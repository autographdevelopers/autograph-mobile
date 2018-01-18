import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultAvatar from './DefaultAvatar';
import ButtonText from './ButtonText';

export default ProfileHeader = ({ onManagePersonClick, avatarProps, user }) => {

  const styles = {
    container: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: Colors.lightGrey
    },
    leftCol: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '25%',
    },
    rightCol: {
      flex: 1,
      justifyContent: 'space-around'
    },
    primaryInfo: {
      color: Colors.softBlack,
      fontSize: Fonts.size.regular,
      fontWeight: 'bold',
    },
    secondaryInfo: {
      color: Colors.strongGrey,
      fontSize: Fonts.size.medium,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <DefaultAvatar {...avatarProps}
                       customContainerStyle={{ width: 68, height: 68 }}
                       customLetterStyle={{ fontSize: 30 }}/>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.primaryInfo}>{`${user.name} ${user.surname}`}</Text>
        <Text style={styles.secondaryInfo}>{`tel: ${user.phone_number}`}</Text>
        <Text style={styles.secondaryInfo}>{`email: ${user.email}`}</Text>
        {/*<ButtonText onPress={onManagePersonClick}>*/}
          {/*/!*<View style={styles.row}>*!/*/}
            {/*/!*<Icon name={'cog'} color={Colors.primaryWarm} size={15} />*!/*/}
            {/*/!*<Text style={{flex:1}}>{`Manage ${user.type}`}</Text>*!/*/}
          {/*/!*</View>*!/*/}
        {/*</ButtonText>*/}
      </View>
    </View>
  );
};
