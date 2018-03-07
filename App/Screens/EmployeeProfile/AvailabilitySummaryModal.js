import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/index';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { connect } from 'react-redux';
import { FETCHING_STATUS, slotsSummary } from '../../Lib/utils';
import { modalActionCreators, MODALS_IDS } from '../../Redux/ModalRedux';
import ScheduleSummary from '../../Components/ScheduleSummary';
import StepsIndicators  from '../../Components/StepsIndicators';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialIcons';
import RadioButton from '../../Components/RadioButton';
import CustomDatePicker from '../../Components/CustomDatePicker';
import moment from 'moment';
import { scheduleFormActionCreators } from '../../Redux/ScheduleFormRedux';

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

const TextHeader = ({ title, description }) => (
  <View style={styles.textArea}>
    {title && <Text style={styles.title}>{title}</Text>}
    {description && <Text style={styles.description}>{description}</Text>}
  </View>
);

class AvailabilitySummaryModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  closeModal = () => {
    this.props.closeModal();
    this.setState({step: 0});
  }


  navToStep = index => () => {
    this.setState({
      step: index
    });
  };

  renderButtonsPane = () => {
    const customWrapperStyles= {width: '60%'};

    if ( this.state.step === 0 ) {
      return <ButtonPrimary customWrapperStyles={customWrapperStyles}
        icon={<IconM name={'arrow-forward'} color={Colors.snow} size={20}/>}
                            onPress={this.navToStep(1)}>Dalej</ButtonPrimary>;
    } else if ( this.state.step === 1 ) {
      return (
          <ButtonPrimary customWrapperStyles={customWrapperStyles}
            onPress={()=>{}}
                         icon={<IconE name={'paper-plane'} color={Colors.snow} size={20}/>}>
            Zapisz
          </ButtonPrimary>
      );
    }
  };

  renderBody = () => {
    const FORMAT = 'DD/MM/YYYY';
    const today = moment().format(FORMAT);
    const starts_from = this.props.new_template_binding_from;

    if (this.state.step === 0) {
      const datePickerConfiguration = {
        ref: ref => this.datepicker = ref,
        minDate: today,
        format: FORMAT,
        placeholder: FORMAT,
        onDateChange: this.props.setBindingFrom,
        duration: 100,
        date: starts_from || today
      };

      return (
        <View>
          <TextHeader title={'Obowiązuje od..'}/>
          <View style={styles.optionRow}><RadioButton/><Text style={styles.radioLabel}>Od teraz</Text></View>
          <View style={styles.optionRow}><RadioButton/><Text style={styles.radioLabel}>Od jutra</Text></View>
          <View style={styles.optionRow}><RadioButton/><Text style={styles.radioLabel}>Od przyszlego tygodnia</Text></View>
          <TouchableOpacity style={styles.optionRow} onPress={()=>this.datepicker.onPressDate() }>
            <RadioButton/>
              <Text style={styles.radioLabel}>Od dnia.. </Text>
            <CustomDatePicker datePickerConfiguration={datePickerConfiguration} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View><Text style={styles.startsFrom}>Obowiazuje od
        <Text style={styles.startsFromEmphasise}> {starts_from}</Text></Text><ScheduleSummary schedule={this.props.schedule}/></View>
    }
  };

  render() {
    const { modalProps, openedModalName } = this.props;

    return (
      <Modal
        visible={openedModalName === MODALS_IDS.SAVE_EMPLOYEE_AVAILABILITY}
        animationType={'slide'}
        onRequestClose={this.closeModal}
        transparent={true}
        {...modalProps}
      >
        <View style={styles.overlay}>
          <View style={styles.window}>
            <CloseModalRow onPress={this.closeModal}/>
            <StepsIndicators labels={['Ustawienia', 'Podsumowanie']}
                             activeIndex={this.state.step}
                             onPress={this.navToStep}
                             customContainerStyles={{marginTop: 0, marginBottom: 10}}/>

            {this.renderBody()}
            <View style={styles.buttonPane}>
              {this.renderButtonsPane()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = state => ( {
  openedModalName: state.modals.openedModalId,
  schedule: state.scheduleForm.template,
  new_template_binding_from: state.scheduleForm.new_template_binding_from,
} );

const mapDispatchToProps = dispatch => ( {
  closeModal: () => dispatch(modalActionCreators.close()),
  setBindingFrom: date => dispatch(scheduleFormActionCreators.changeNewTemplateBindingFrom(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AvailabilitySummaryModal);

/** == STYLING ================================================ */
const BREATH_SPACE = 15;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  window: {
    borderRadius: 15,
    width: '90%',
    maxHeight: '90%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingBottom: 0,
    backgroundColor: Colors.snow,
  },
  title: {
    fontFamily: Fonts.type.base,
    marginBottom: BREATH_SPACE / 2,
    fontSize: Fonts.size.regular,
  },
  description: {
    textAlign: 'center',
    color: Colors.strongGrey,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
  },
  crossIconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  crossIcon: {
    backgroundColor: 'transparent',
    fontWeight: '100',
  },
  // triangle: {
  //   /** shape */
  //   width: 0,
  //   height: 0,
  //   borderTopWidth: MODAL_SPINNER_MODE_SIZE,
  //   borderRightWidth: MODAL_SPINNER_MODE_SIZE,
  //   borderRightColor: Colors.subtleGray,
  //   borderTopColor: 'transparent',
  //   /** position */
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  // },
  // spinnerView: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: MODAL_SPINNER_MODE_SIZE,
  //   width: MODAL_SPINNER_MODE_SIZE,
  // },
  // loaderText: {
  //   fontFamily: Fonts.type.base,
  //   fontSize: Fonts.size.medium,
  //   fontWeight: '300',
  //   backgroundColor: 'transparent',
  // },
  textArea: {
    marginBottom: BREATH_SPACE,
  },
  actionButtonContainer: {
    paddingBottom: 25,
    paddingTop: 3 * BREATH_SPACE,
  },
  buttonPane: {
    // marginVertical: 15,
  },
  optionRow: {
    flexDirection: 'row',
    marginBottom: 15
  },
  radioLabel: {
    marginLeft: 10
  },
  startsFrom: {
    fontFamily: Fonts.type.light,
    marginBottom: 10
  },
  startsFromEmphasise: {
    fontFamily: Fonts.type.base
  }
});
