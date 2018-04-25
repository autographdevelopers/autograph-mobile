import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Fonts, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonText from './ButtonText'

export default AccountHeader = ({navigation, title, user}) => {
  return (
    <View style={styles.mainContainer}>
      <Avatar
        large
        rounded
        source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
      />
      <View style={styles.welcomeFeed}>
        <Text style={styles.welcomeText}>Cześć,</Text>
        <Text style={styles.welcomeText}>{user.name} {user.surname}</Text>
        <ButtonText
          position={'flex-start'}
          onPress={() => {navigation.navigate('personalSettings', {user})}}
          customTextStyle={{fontSize: Fonts.size.small}}
          customStyle={{marginTop: 7}}
          icon={<Icon name={'settings'} size={16} color={Colors.primaryWarm}/>}>
          Ustawienia i informacje
        </ButtonText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  welcomeFeed: {
    marginLeft: 15,
  },
  welcomeText: {
    fontSize: Fonts.size.regular,
    color: Colors.strongGrey,
    fontFamily: Fonts.type.base,
    fontWeight: '400'
  }
})
