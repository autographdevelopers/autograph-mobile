import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../Themes/index';
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
                              loaderLabel='Ładowanie..',
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
      top: -300,
      position: 'absolute',
      borderRadius: 200,
      backgroundColor: Colors.subtleGray,
      alignSelf: 'center',
    },
    title: {
      marginTop: 100,
      textAlign: 'center',
      fontFamily: Fonts.type.base,
      fontWeight: '600',
      fontSize: Fonts.size.regular,
    },
    description: {
      textAlign: 'center',
      color: Colors.strongGrey,
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.medium,
      fontWeight: '400',

    },
    closeBtn: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    crossIcon: {
      backgroundColor: 'transparent',
      fontWeight: '100',
    },
    triangle: {
      width: 0,
      height: 0,
      borderTopWidth: 400,
      borderRightWidth: 300,
      borderTopColor: 'transparent',
      borderRightColor: Colors.subtleGray,
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    spinner: {
      alignSelf: 'center',
      flex : 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    loaderText: {
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.medium,
      fontWeight: '300',
      backgroundColor: 'transparent'
    }
  });

  const LoaderView = () => (
    <View style={styles.spinner}>
      <View style={styles.triangle}/>
      <ActivityIndicator color={Colors.primaryWarm} size={'large'}/>
      <Text style={styles.loaderText}>{loaderLabel}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType={'slide'}
      {...modalProps}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          {/*<View style={styles.semicircle}/>*/}
          {/*<TouchableOpacity style={styles.closeBtn}>*/}
          {/*<Icon name="md-close" color={Colors.softBlack} size={24} style={styles.crossIcon}/>*/}
          {/*</TouchableOpacity>*/}
          {/*<Text style={styles.title}>Hello are you sure?</Text>*/}
          {/*<Text style={styles.description}>Some interesting lorem ipsum*/}
          {/*description</Text>*/}
          <LoaderView/>
        </View>
      </View>
    </Modal>
  );
};
