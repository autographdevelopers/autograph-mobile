import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Colors, Fonts } from '../../Themes/index';
import BubbleBackground from '../../Components/BubbleBackground';
import ScheduleBox from '../../Components/ScheduleBox';
import {connect} from 'react-redux';
import {
  scheduleActionCreators,
  scheduleActionTypes
} from '../../Redux/ScheduleRedux';
import { FETCHING_STATUS, isTemplateEmpty } from '../../Lib/utils';
import { scheduleFormActionCreators } from '../../Redux/ScheduleFormRedux';

class AvailabilityDashboard extends Component {

  componentWillMount = () => {
    this.props.showScheduleRequest();
  };

  handleEditPress = template_type => () => {
    this.props.initForm(this.props[template_type], template_type);

    const { user, index } = this.props.navigation.state.params;

    this.props.navigation.navigate('setAvailability',
      { user, index, title: 'Ustaw dyspozycyjnosc' });
  };

  pageContents = () => {
    const {current_template, new_template} = this.props;

    if ([FETCHING_STATUS.FETCHING, FETCHING_STATUS.READY].includes(this.props.status) ) {
      return(
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating size="large" color={Colors.primaryWarm}/>
        </View>);
    }
    else if (isTemplateEmpty(current_template) && isTemplateEmpty(new_template)) {
        return (
          <BubbleBackground>
            <View style={styles.container}>
              <View style={styles.placeholderBox}>
                <Text style={styles.title}>Mój Grafik</Text>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit melt..Lorem ipsum dolor sit meltLorem
                  ipsum dolor sit meltLorem ipsum dolor sit meltLorem ipsum dolor
                  sit meltLorem ipsum dolor sit meltLorem ipsum dolor sit meltLorem
                  ipsum dolor sit melt.t</Text>
                <TouchableOpacity onPress={this.handleEditPress('current_template')} style={styles.button}>
                  <Text style={styles.buttonText}>STWÓRZ GRAFIK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BubbleBackground>
        )
    } else if (!isTemplateEmpty(current_template) && isTemplateEmpty(new_template)) {
      return (
        <ScheduleBox schedule={current_template} onEditPress={this.handleEditPress} onRemovePress={()=>{}}/>
      );
    } else if (!isTemplateEmpty(new_template)) {
      return (
        <View>
          <ScheduleBox schedule={current_template} onEditPress={this.handleEditPress('current_template')} onRemovePress={()=>{}}/>
          <ScheduleBox schedule={new_template} onEditPress={this.handleEditPress('new_template')} onRemovePress={()=>{}}/>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{flex: 1, paddingTop: 15}}>
        {this.pageContents()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  current_template: state.schedule.current_template,
  new_template: state.schedule.new_template,
  status:  state.schedule.status,
});

const mapDispatchToProps = dispatch => ({
  showScheduleRequest: () => dispatch(scheduleActionCreators.showRequest()),
  initForm: (data, type) => dispatch(scheduleFormActionCreators.initializeForm(data, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityDashboard)

const styles = {
  title: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.regular,
    marginBottom: 15,
    alignSelf: 'center'
  },
  description: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
    marginBottom: 15,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70
  },
  placeholderBox: {
    width: '90%',
    minHeight: 200,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: Colors.snow,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.primaryWarm,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 15
  },
  buttonText: {
    color: Colors.primaryWarm,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.medium
  }
};
