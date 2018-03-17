import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import { Fonts, Colors } from '../Themes/'
import I18n from '../I18n/index'

export default InvitationInformationSubtitle = ({ invitation_sent_at }) => {
  return (
    <View>
      <Text style={styles.invitationSenAtText}>
        {`Wysłane ${moment(invitation_sent_at).format('LLL')}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  invitationSenAtText: {
    color: Colors.strongGrey,
    fontSize: 11,
    fontWeight: '500'
  }
})
