import React, { Component } from 'react'
import { Modal, Text, View, TextInput, TouchableHighlight } from 'react-native'
import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/Ionicons'

export default ModalLayout = ({children}) => {
  const styles = StyleSheet.create({
    container: {
      margin: 15,
      backgroundColor: Colors.snow,
      borderRadius: 10,
      justifyContent: 'center'
    },
    closeIconWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 15,
      paddingVertical: 10
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1
    }
  })

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => {alert('Modal has been closed.')}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.closeIconWrapper}>
            <Icon name="md-close" color={Colors.strongGrey} size={24}/>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  )
}
