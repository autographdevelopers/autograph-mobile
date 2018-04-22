/** Built in modules */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';

/** Form steps */
import InformationStep from './Information';
import CalendarStep from './ValidTimeFrames';
import NotificationsStep from './Notifications';
import ScheduleSettings from './ScheduleSettings';
import ConfirmRegistration from './ConfirmRegistration';

/** Other */
import navStyles from '../../Navigation/Styles/NavigationStyles';
import ButtonPrimary from '../../Components/ButtonPrimary';
import FORM_IDS from './Constants';

const routeConfigs = {
  step0: {
    screen: InformationStep
  },
  step1: {
    screen: NotificationsStep
  },
  step2: {
    screen: CalendarStep
  },
  step3: {
    screen: ScheduleSettings
  },
  step4: {
    screen: ConfirmRegistration
  }
};

const navigationConfigs = {
  initialRouteName: 'step0',
  cardStyle: navStyles.card,
  headerMode: 'none',
};

const StepFormNavigator = StackNavigator(routeConfigs, navigationConfigs);

class NewDrivingSchoolWizardForm extends Component {

  constructor(props) {
    super(props);

    this.screensInfo = {
      step0: {
        ref: null,
        formID: FORM_IDS.BASIC_INFO
      },
      step1: {
        ref: null,
        formID: FORM_IDS.USER_NOTIFICATIONS
      },
      step2: {
        ref: null,
        formID: FORM_IDS.SCHEDULE_BOUNDARIES
      },
      step3: {
        ref: null,
        formID: FORM_IDS.SCHEDULE_SETTINGS
      },
      step4: {
        ref: null,
        formID: FORM_IDS.CONFIRM_REGISTRATION
      }
    };

    this.bindScreenRef = this.bindScreenRef.bind(this);
  }

  bindScreenRef = (key, ref) => this.screensInfo[key].ref = ref;

  nextStep = () => {
    const { index, routes } = this.props.navigation.state,
      currentRouteName = routes[index].routeName,
      { ref } = this.screensInfo[currentRouteName];

    ref.submitForm();
  };

  componentWillUnmount() {
    this.destroyForms();
  }

  destroyForms = () => Object.keys(this.screensInfo).forEach(step => this.props.destroyForms(this.screensInfo[step].formID));

  isSubmitting = () => {
    const form = this.currentForm();

    return form && form.submitting
  };

  currentForm = () => {
    const { index, routes } = this.props.navigation.state,
      currentRouteName = routes[index].routeName,
      { formID } = this.screensInfo[currentRouteName];
    const { form } = this.props;


    return form[formID];
  };

  render() {

    console.log('nav changed')
    console.log(this.props.navigation);

    return (
      <View style={{ flex: 1 }}>
        <StepFormNavigator navigation={this.props.navigation}
                           screenProps={{ bindScreenRef: this.bindScreenRef,
                             navKey: this.props.navigation.state.key }}
        />

        {this.currentForm() &&
          <ButtonPrimary onPress={this.nextStep}
                         submitting={this.isSubmitting()}>
            Dalej
          </ButtonPrimary>
        }
      </View>
    )
  }
}

NewDrivingSchoolWizardForm.router = StepFormNavigator.router;

const mapStateToProps = state => ({ form: state.form, drivingSchool: state.context.currentDrivingSchoolID });
const mapDispatchToProps = dispatch => ({
  destroyForms: formID => {
    dispatch(destroy(formID))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDrivingSchoolWizardForm);
