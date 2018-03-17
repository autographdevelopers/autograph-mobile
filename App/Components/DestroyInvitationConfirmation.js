import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import I18n from '../I18n/index'
import { Fonts, Colors } from '../Themes/'
import ButtonText from './ButtonText'

export default DestroyInvitationConfirmation = ({ onPress }) => {
  return (
    <View>
      <Text style={styles.text}>
        Czy na pewno chcesz wycofać zaproszenie?
      </Text>
      <ButtonText
        onPress={onPress}
        customTextStyle={{color: Colors.salmon}}
        customStyle={styles.buttonText}>
        {I18n.t('withdraw_invitation')}
      </ButtonText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    fontWeight: '500',
    textAlign: 'center'
  },
  buttonText: {
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10
  }
})
