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
import ButtonPrimary from './ButtonPrimary';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// Props API
// dialogText, successTexts, failureTexts - { title, description }
// dialogBtn, successBtn, failureBtn - { title, handler }
// status - one of FETCHING_STATUSES

export default DialogBox = ({
                              dialogTexts,
                              successTexts,
                              failureTexts,
                              status,
                              loaderLabel = 'Ładowanie..',
                              children,
                              mode='warning',
                              icon,
                              dialogBtn,
                              successBtn,
                              failureBtn,
                              visible,
                              modalProps = {},
                            }) => {

  const CIRCLE_SIZE = 450;
  const CIRCLE_TOP_OFFSET = -330;
  const BREATH_SPACE = 15;
  const TOP_OF_THE_STACK = 999999999999;
  const MODAL_SPINNER_MODE_SIZE = 300;

  const styles = StyleSheet.create({
    modalContainer: {
      /** OVERLAY */
      flex: 1,
      backgroundColor: 'rgba(0,0,0, .8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: Colors.snow,
    },
    semicircle: {
      height: CIRCLE_SIZE,
      width: CIRCLE_SIZE,
      top: CIRCLE_TOP_OFFSET,
      position: 'absolute',
      borderRadius: CIRCLE_SIZE / 2,
      backgroundColor: Colors.subtleGray,
      alignSelf: 'center',
    },
    title: {
      textAlign: 'center',
      fontFamily: Fonts.type.base,
      fontWeight: '600',
      fontSize: 22,
    },
    description: {
      textAlign: 'center',
      color: Colors.strongGrey,
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.medium,
      fontWeight: '400',
    },
    crossIconBox: {
      position: 'absolute',
      top: 15,
      right: 15,
      zIndex: TOP_OF_THE_STACK
    },
    crossIcon: {
      backgroundColor: 'transparent',
      fontWeight: '100',
    },
    triangle: {
      /** shape */
      width: 0,
      height: 0,
      borderTopWidth: MODAL_SPINNER_MODE_SIZE,
      borderRightWidth: MODAL_SPINNER_MODE_SIZE,
      borderRightColor: Colors.subtleGray,
      borderTopColor: 'transparent',
      /** position */
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    spinnerView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: MODAL_SPINNER_MODE_SIZE,
      width: MODAL_SPINNER_MODE_SIZE
    },
    loaderText: {
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.medium,
      fontWeight: '300',
      backgroundColor: 'transparent',
    },
    actionView: {
      overflow: 'hidden',
      paddingHorizontal: 40,
      paddingTop: CIRCLE_SIZE + CIRCLE_TOP_OFFSET,
      minHeight: CIRCLE_SIZE + CIRCLE_TOP_OFFSET + BREATH_SPACE + 100,
      width: '80%'
    },
    headerIconContainer: {
      /** container covers visible part of a circle */
      position: 'absolute',
      left: 0,
      right: 0,
      height: CIRCLE_SIZE + CIRCLE_TOP_OFFSET,
      backgroundColor: 'transparent',

      /** for centering icon within */
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      justifyContent: 'space-between',
    },
    textArea: {
      marginVertical: 2*BREATH_SPACE
    },
    actionButtonContainer: {
      paddingVertical: 25
    }
  });

  const defaultIcons = {
    warning: <IconFontAwesome name={'warning'} color={Colors.yellowLight}
                              size={65}/>,
  };

  const LoaderView = () => (
    <View style={styles.spinnerView}>
      <View style={styles.triangle}/>
      <ActivityIndicator color={Colors.primaryWarm} size={'large'}/>
      <Text style={styles.loaderText}>{loaderLabel}</Text>
    </View>
  );

  const ActionView = () => (
    <View style={styles.actionView}>
      <View style={styles.semicircle}/>
      <TouchableOpacity style={styles.crossIconBox}>
        <Icon name="md-close" color={Colors.softBlack} size={24}
              style={styles.crossIcon}/>
      </TouchableOpacity>
      <View style={styles.headerIconContainer}>{defaultIcons['warning']}</View>

      <View style={styles.contentContainer}>
        <View style={styles.textArea}>
          <Text style={styles.title}>Hello are you sure?</Text>
          <Text style={styles.description}>Some interesting lorem ipsum
            description</Text>
        </View>
        {children}
        <View style={styles.actionButtonContainer}>
        <ButtonPrimary theme={'warning'}
                       customWrapperStyles={{ width: '100%', marginBottom: 0 }}>Yes
          I do</ButtonPrimary>
        </View>
      </View>
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
          <ActionView/>
          {/*<LoaderView/>*/}
        </View>
      </View>
    </Modal>
  );
};
