import React, { Component } from 'react';
import { View, TouchableOpacity, Modal, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../Themes/';
import Icon from 'react-native-vector-icons/Ionicons';

// Props API
// dialogText, successTexts, failureTexts - { title, description }
// dialogBtn, successBtn, failureBtn - { title, handler }
// status - one of FETCHING_STATUSES

export default DialogBox = ({
                              dialogTexts,
                              successTexts,
                              failureTexts,
                              status,
                              loaderLabel,
                              children,
                              mode,
                              icon,
                              dialogBtn,
                              successBtn,
                              failureBtn,
                              visible,
                              modalProps = {},
                            }) => {

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0, .8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      height: 400,
      width: 300,
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginHorizontal: 15,
      alignSelf: 'center',
      backgroundColor: Colors.snow,
    },
    rectangle: {
      height: 70,
      flexDirection: 'row', // gives 100% width occupied
      backgroundColor: 'red',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    semicircle: {
      height: 400,
      width: 400,
      top: '-75%',
      position: 'absolute',
      borderRadius: 200,
      backgroundColor: Colors.lightGrey,
      alignSelf: 'center'
    },
  });

  return (
    <Modal
      visible={visible}
      animationType={'slide'}
      {...modalProps}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.semicircle}>
            <TouchableOpacity>
              <Icon name="md-close" color={Colors.strongGrey} size={24} style={{
                backgroundColor: 'transparent',
                color: Colors.softBlack,
                marginTop: 15,
                marginRight: 15,
              }}/>
            </TouchableOpacity>
          <Text>This is content inside of modal component</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
