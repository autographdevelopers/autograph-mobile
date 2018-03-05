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
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../Lib/utils';
import { modalActionCreators } from '../Redux/ModalRedux';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconE from 'react-native-vector-icons/Entypo';

class DialogBox extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return (this.props.status != nextProps.status) ||
      (this.props.openedModalName != nextProps.openedModalName)
  };

  renderBody = () => {
    const {
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
    } = this.props;

    /**
     *  Mode refers to the first screen that appears when modal is opened.
     * There can be more screens when action button will trigger some async API request
     * W will have then spinner view -> success/failure view
     */
    const MODES = { WARNING: 'warning', INFO: 'info' };

    /** == DEFAULT ICONS FOR A PREDEFINED MODES ================================================*/

    /**
     * For the first stage of a modal flow we can either pass our custom icon or
     * use the default one for a predefined mode
     */
    const defaultIcons = {
      [MODES.WARNING]: <IconFontAwesome name={'warning'}
                                        color={Colors.yellowLight} size={65}/>,
      [MODES.INFO]: <IconM name={'info'} size={65} color={Colors.blue}/>,
    };

    /** == STATUS TO ICON MAPPING ================================================================*/

    /**
     * Depending on a status of a modal flow,
     * we either take custom icon or default for an available mode
     * or bound to an obvious stages like success or failure that are not meant
     * to be customized for consistency across whole application.
     */
    const iconsForStatus = {
      [FETCHING_STATUS.READY]: icon || defaultIcons[mode],
      [FETCHING_STATUS.SUCCESS]: <IconM name={'check-circle'}
                                        color={Colors.green} size={65}/>,
      [FETCHING_STATUS.ERROR]: <IconE name={'circle-with-cross'} size={65}
                                      color={Colors.red}/>,
    };

    /** == STATUS TO BUTTON COLOR MAPPING ========================================================*/

    /**
     * Primary Button will have corresponding themes for predefined this.props.modes
     * info - blue gradient
     * primary - primary warm(green) gradient
     * alert - yellow gradient
     */

    const buttonThemesForStatus = {
      [FETCHING_STATUS.READY]: this.props.mode || 'primary',
      [FETCHING_STATUS.SUCCESS]: 'primary',
    };

    /** == STATUS TO TEXT AREAS MAPPING =========================================================*/

    /**
     * The modal consists of 2 text fields one for informing in one/two words what happened
     * and the second one with a slightly longer explanation about situation
     * This is probably a good idea to define some default titles and pass only descriptions
     *
     */
    const textsForStatus = {
      [FETCHING_STATUS.READY]: {
        title: dialogTexts.title,
        description: dialogTexts.description,
      },
      [FETCHING_STATUS.SUCCESS]: {
        title: successTexts.title || 'saddas',
        description: successTexts.description || 'dsadsad',
      },
      [FETCHING_STATUS.ERROR]: {
        title: failureTexts.title || 'saddas',
        description: failureTexts.description || 'dsadsad',
      },
    };

    /** == STATUS TO BUTTONS MAPPING =========================================================*/

    /**
     * For each stage in a modal there will be only one action button by default
     * Specify the title and on press callback in props..
     */

    const buttonForStatus = {
      [FETCHING_STATUS.READY]: {
        title: dialogBtn.title,
        handler: dialogBtn.handler,
      },
      [FETCHING_STATUS.SUCCESS]: {
        title: successBtn.title,
        handler: () => {
          successBtn.handler();
          this.closeModalHandler();
        },
      },
      [FETCHING_STATUS.ERROR]: {
        title: failureBtn.title,
        handler: () => {
          failureBtn.handler();
          this.closeModalHandler();
        },
      },
    };

    if ( status === FETCHING_STATUS.FETCHING ) {
      return <LoaderView loader={loaderLabel} />;
    } else {
      return <ActionView
        icon={iconsForStatus[status]}
        title={textsForStatus[status]['title']}
        description={textsForStatus[status]['description']}
        mode={buttonThemesForStatus[status]}
        onButtonPress={buttonForStatus[status].handler}
        btnTitle={buttonForStatus[status].title}
        children={status === FETCHING_STATUS.READY && children}
        closeModalHandler={this.closeModalHandler}
      />;
    }
  };

  closeModalHandler = () => {
    this.props.closeModal();
    this.props.onModalClose();
  };

  render() {
    const {
      modalName,
      openedModalName,
      modalProps,
    } = this.props;

    return (
      <Modal
        visible={openedModalName === modalName}
        animationType={'slide'}
        onRequestClose={this.closeModalHandler}
        transparent={true}
        {...modalProps}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            {this.renderBody()}
          </View>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = state => ({ openedModalName: state.modals.openedModalId });

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(modalActionCreators.close()),
});

DialogBox.defaultProps = {
  dialogBtn: {
    handler: ()=>{}
  },
  successBtn:  {
    handler: ()=>{}
  },
  failureBtn: {
    handler: ()=>{}
  },
  mode: 'primary',
  loaderLabel: 'Ładowanie..',
  status: FETCHING_STATUS.READY,
  dialogTexts: {},
  successTexts: {},
  failureTexts: {},
  modalProps: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);

const LoaderView = ({label}) => (
  <View style={styles.spinnerView}>
    <View style={styles.triangle}/>
    <ActivityIndicator color={Colors.primaryWarm} size={'large'}/>
    <Text style={styles.loaderText}>{label}</Text>
  </View>
);

const ActionView = ({ icon, title, description, onButtonPress, mode, children, btnTitle, closeModalHandler }) => (
  <View style={styles.actionView}>
    {/*<View style={styles.semicircle}/>*/}

    <TouchableOpacity style={styles.crossIconBox} onPress={closeModalHandler}>
      <Icon name="md-close"
            color={Colors.softBlack}
            size={24}
            style={styles.crossIcon}/>
    </TouchableOpacity>

    {/*<View style={styles.headerIconContainer}>{icon}</View>*/}

    <View style={styles.contentContainer}>

      <View style={styles.textArea}>
        <Text style={styles.title}>{title}</Text>
        { description && <Text style={styles.description}>{description}</Text> }
      </View>

      {children}

      <View style={styles.actionButtonContainer}>
        <ButtonPrimary theme={mode}
                       customWrapperStyles={{
                         width: '75%',
                         marginBottom: 0,
                       }}
                       onPress={onButtonPress}>
          {btnTitle}
        </ButtonPrimary>
      </View>

    </View>
  </View>
);

/** == STYLING ================================================ */
const CIRCLE_SIZE = 450;
const CIRCLE_TOP_OFFSET = -330;
const BREATH_SPACE = 15;
const TOP_OF_THE_STACK = 999999999999;
const MODAL_SPINNER_MODE_SIZE = 300;

const styles = StyleSheet.create({
  modalContainer: {
    /** OVERLAY */
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
    maxWidth: '99%',
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
    fontFamily: Fonts.type.bold,
    marginBottom: BREATH_SPACE,
    fontSize: 25,
  },
  description: {
    textAlign: 'center',
    color: Colors.strongGrey,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
  },
  crossIconBox: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: TOP_OF_THE_STACK,
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
    width: MODAL_SPINNER_MODE_SIZE,
  },
  loaderText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    fontWeight: '300',
    backgroundColor: 'transparent',
  },
  actionView: {
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingTop: 15, //CIRCLE_SIZE + CIRCLE_TOP_OFFSET,
    minHeight: CIRCLE_SIZE + CIRCLE_TOP_OFFSET + BREATH_SPACE + 100,
    // width: '90%',
    flex: 1
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
    marginTop: BREATH_SPACE,
    marginBottom: 2 * BREATH_SPACE,
  },
  actionButtonContainer: {
    paddingBottom: 25,
    paddingTop: 3 * BREATH_SPACE,
  },
});
