/** Built in modules */
import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';

/** Form steps */
import InformationStep from './Information';
import CalendarStep from './ScheduleBoundaries';
import NotificationsStep from './Notifications';
import ScheduleSettings from './ScheduleSettings';

/** Other */
import navStyles from '../../Navigation/Styles/NavigationStyles';
import ButtonPrimary from '../../Components/ButtonPrimary';
import StepsIndicators from '../../Components/StepsIndicators';
import FORM_IDS from './Constants';
import NavHeader from '../../Components/NavHeader';


const routeConfigs = {
  step0: {
    screen: InformationStep,
    navigationOptions: {
      header: props => {
        return (<View><NavHeader navigation={props.navigation} title={'Informacje'}/><StepsIndicators
          labels={['Informacje', 'Powiadomienia', 'Kalendarz', 'Ustawienia']} activeIndex={0}/></View>)
      }
    }
  },
  step1: {
    screen: NotificationsStep,
    navigationOptions: {
      header: props => {
        return (<View><NavHeader navigation={props.navigation} title={'Powiadomienia'}/><StepsIndicators
          labels={['Informacje', 'Powiadomienia', 'Kalendarz', 'Ustawienia']} activeIndex={1}/></View>)
      }
    }
  },
  step2: {
    screen: CalendarStep,
    navigationOptions: {
      header: props => <View><NavHeader navigation={props.navigation} title={'Kalendarz'}/><StepsIndicators
        labels={['Informacje', 'Powiadomienia', 'Kalendarz', 'Ustawienia']} activeIndex={2}/></View>
    }
  },
  step3: {
    screen: ScheduleSettings,
    navigationOptions: {
      header: props => {
        return (<View><NavHeader navigation={props.navigation} title={'Ustawienia'}/><StepsIndicators
          labels={['Informacje', 'Powiadomienia', 'Kalendarz', 'Ustawienia']} activeIndex={3}/></View>)
      }
    }
  }
};

const navigationConfigs = {
  initialRouteName: 'step0',
  cardStyle: navStyles.card
};

const StepFormNavigator = StackNavigator(routeConfigs, navigationConfigs);

class NewDrivingSchoolWizardForm extends Component {
  static navigationOptions = { header: null };

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

    return (
      <View style={{ flex: 1 }}>
        <StepFormNavigator navigation={this.props.navigation} screenProps={{ bindScreenRef: this.bindScreenRef, navKey: this.props.navigation.state.key }}/>

        {this.currentForm() && <ButtonPrimary onPress={this.nextStep} submitting={this.isSubmitting()}>Dalej</ButtonPrimary>}
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
