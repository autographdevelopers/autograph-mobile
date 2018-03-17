import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Fonts, Colors } from '../Themes/'
import I18n from '../I18n/index'

export default InvitationInformationTitle = ({ email }) => {
  return (
    <View>
      <Text style={styles.invitationText}>
        {I18n.t('invitation_sent_to')}
      </Text>
      <Text>
        {email}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  invitationText: {
    color: Colors.strongGrey,
    fontSize: 11,
    fontWeight: '500'
  }
})
