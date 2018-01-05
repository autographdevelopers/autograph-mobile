import React, { Component } from 'react'
import { Modal, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/Ionicons'

export default ModalLayout = ({children, visible, onClose}) => {
  const styles = StyleSheet.create({
    container: {
      margin: 15,
      paddingHorizontal: 15,
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
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeIconWrapper}>
            <Icon name="md-close" color={Colors.strongGrey} size={24}/>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  )
}
