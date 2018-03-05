import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/index';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { connect } from 'react-redux';
import { FETCHING_STATUS, slotsSummary } from '../../Lib/utils';
import { modalActionCreators, MODALS_IDS } from '../../Redux/ModalRedux';

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

const Bubble = ({ label, customBoxStyles = {}, customTextStyles = {} }) => (
  <View style={[styles.intervalBox, customBoxStyles]}>
    <Text style={[styles.intervalText, customTextStyles]}>{label}</Text>
  </View>
);

const TextHeader = ({ title, description }) => (
  <View style={styles.textArea}>
    {title && <Text style={styles.title}>{title}</Text>}
    {description && <Text style={styles.description}>{description}</Text>}
  </View>
);

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

class AvailabilitySummaryModal extends Component {

  renderSummary = () => {
    const { schedule } = this.props;

    const summary = Object.values(schedule).reduce((acc, current, index, _) => {
      acc[WEEKDAYS[index]] = slotsSummary(current);
      return acc;
    }, {});

    return (
      <View>
        {Object.keys(schedule).map((day, index) =>
          <View key={`weekday-summary-${index}`} style={styles.weekdaySummary}>
            <Text style={styles.headerText}>{day.capitalize()}</Text>
            <View style={styles.intervalsContainer}>
              {summary[day].map((interval, index) =>
                <Bubble label={interval} key={`interval-box-${index}`}/>,
              )}
              {summary[day].length === 0 &&
              <Bubble label={'WOLNE'}
                      customBoxStyles={styles.freeDayBox}
                      customTextStyles={styles.freeDayText}
              />
              }
            </View>
          </View>,
        )}
      </View>
    );
  };

  render() {
    const { modalProps, openedModalName, closeModal } = this.props;

    const buttonConfiguration = {
      theme: 'primary',
      customWrapperStyles: { marginVertical: 15, width: '70%' },
      customBgStyle: { borderRadius: 20 },
      onPress: closeModal,
    };

    return (
      <Modal
        visible={openedModalName === MODALS_IDS.SAVE_EMPLOYEE_AVAILABILITY}
        animationType={'slide'}
        onRequestClose={closeModal}
        transparent={true}
        {...modalProps}
      >
        <View style={styles.overlay}>
          <View style={styles.window}>
            <CloseModalRow onPress={closeModal}/>
            <TextHeader title={'Podsumowanie'} description={'Lorem ipsum'}/>
            <ScrollView>
              {this.renderSummary()}
            </ScrollView>
            <ButtonPrimary {...buttonConfiguration}>Ok</ButtonPrimary>
          </View>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = state => ( {
  openedModalName: state.modals.openedModalId,
  schedule: state.employeeAvailabilitySlots.schedule,
} );

const mapDispatchToProps = dispatch => ( {
  closeModal: () => dispatch(modalActionCreators.close()),
} );

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
    borderRadius: 20,
    width: '90%',
    maxHeight: '90%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.snow,
  },
  title: {
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    marginBottom: BREATH_SPACE / 2,
    fontSize: 25,
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

  headerText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    marginBottom: 5,
    marginLeft: 4,
  },
  intervalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  intervalBox: {
    borderRadius: 8,
    backgroundColor: Colors.lightGrey,
    marginRight: 10,
    marginBottom: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  intervalText: {
    fontFamily: Fonts.type.light,
    fontSize: 11,
    backgroundColor: 'transparent',
    color: Colors.black,
  },
  freeDayBox: {
    backgroundColor: Colors.yellowLight,
    opacity: 50,
  },
  freeDayText: {
    fontFamily: Fonts.type.base,
  },
  weekdaySummary: {
    marginBottom: 5,
  },
});
