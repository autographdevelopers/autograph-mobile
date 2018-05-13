/** Lib dependencies */
import React, { Component } from 'react';
import { Modal, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialIcons';
/** Custom dependencies */
import { Fonts, Colors } from '../Themes/';
import { connect } from 'react-redux';
import { modalActionCreators } from '../Redux/Views/Modals/ModalRedux';
import { FETCHING_STATUS } from '../Lib/utils';
import ButtonPrimary from './ButtonPrimary';


/** == HELPER COMPONENTS ===========================*/

const CloseModalRow = ({ onPress }) => (
  <View style={styles.crossIconRow}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="md-close"
            color={Colors.softBlack}
            size={24}
            style={styles.crossIcon}/>
    </TouchableOpacity>
  </View>
);

const ModalLayout = ({children, customContainerStyle, closeWithCallback, showCross }) => (
  <View style={[styles.container, customContainerStyle]}>
    { showCross && <CloseModalRow onPress={closeWithCallback}/> }
    {children}
  </View>
);

const Feedback = ({title, message, status, btnTitle, onPressCallback, closeWithCallback, customContainerStyle}) => (
  <ModalLayout customContainerStyle={customContainerStyle} closeWithCallback={closeWithCallback}>
    <View style={styles.content}>
      {status === FETCHING_STATUS.SUCCESS && <IconM name={'check-circle'} color={Colors.primaryWarm} size={60}/> }
      {status === FETCHING_STATUS.ERROR && <IconE name={'circle-with-cross'} size={60} color={Colors.red}/> }
      <View style={styles.textArea}>
        <Text style={styles.msgTitle}>{title}</Text>
        {message && <Text style={styles.msgBody}>{message}</Text>}
      </View>
      <ButtonPrimary onPress={onPressCallback}>
        {btnTitle}
      </ButtonPrimary>
    </View>
  </ModalLayout>
);


/** == MODAL ====================================*/

const ModalTemplate = props => {
  const {
    status=FETCHING_STATUS.READY,
    customContainerStyle={},
    customOverlayStyles={},
    successTitle='Udalo się! :)',
    errorTitle='Ups, coś poszło nie tak. :(',
    successBtnTitle='Powrót',
    errorBtnTitle='Powrót',
    successBtnCallback,
    errorBtnCallback,
    closeModalCallback,
    successMsg,
    errorMsg,
    children,
    modalID,
    openedModalId,
    modalProps,
    closeModal,
    modalTitle,
    modalMsg,
    showCross=true
  } = props;

  const closeWithCallback = () => {
    closeModal();
    closeModalCallback && closeModalCallback();
  };

  const renderModalBody = () => {
    switch (status) {
      case FETCHING_STATUS.READY:
        return (
          <ModalLayout showCross={showCross} customContainerStyle={customContainerStyle}
                       closeWithCallback={closeWithCallback}>
              { (modalTitle || modalMsg) &&
                <View style={styles.textArea}>
                  { modalTitle && <Text style={styles.msgTitle}>{modalTitle}</Text> }
                  { modalMsg && <Text style={styles.msgBody}>{modalMsg}</Text> }
                </View>
              }
              {children}
          </ModalLayout>
        );
      case FETCHING_STATUS.FETCHING:
        return (
          <ActivityIndicator color={Colors.snow} size={'large'}/>
        );
      case FETCHING_STATUS.SUCCESS:
        return (
            <Feedback title={successTitle}
                      message={successMsg}
                      status={FETCHING_STATUS.SUCCESS}
                      btnTitle={successBtnTitle}
                      onPressCallback={successBtnCallback || closeWithCallback}
                      customContainerStyle={customContainerStyle}
                      closeWithCallback={closeWithCallback}
            />
        );

      case FETCHING_STATUS.ERROR:
        return (
            <Feedback title={errorTitle}
                      message={errorMsg}
                      status={FETCHING_STATUS.ERROR}
                      btnTitle={errorBtnTitle}
                      onPressCallback={errorBtnCallback || closeWithCallback}
                      customContainerStyle={customContainerStyle}
                      closeWithCallback={closeWithCallback}
            />
        );
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalID === openedModalId}
      onRequestClose={closeWithCallback}
      {...modalProps}
    >
      <View style={[styles.overlay, customOverlayStyles]}>
        {renderModalBody()}
      </View>
    </Modal>
  )
};

const mapStateToProps = state => ({
  openedModalId: state.views.modals.meta.openedModalId
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(modalActionCreators.close())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalTemplate);

const styles = {
  container: {
    borderRadius: 15,
    paddingTop: 15,
    width: '90%',
    backgroundColor: Colors.snow,
    maxHeight: '90%',
    paddingBottom: 0,
    paddingHorizontal: 15,
  },
  content: {
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIconRow: {
    alignItems: 'flex-end',
  },
  msgTitle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.base,
    textAlign: 'center'
  },
  msgBody: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    marginTop: 10
  },
  textArea: {
    marginBottom: 30,
    marginTop: 15,
  }
};

