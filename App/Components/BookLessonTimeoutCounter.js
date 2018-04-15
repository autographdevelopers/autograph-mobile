import React, { Component } from 'react';
import moment from 'moment';
import { View, Text } from 'react-native';
import { Colors, Fonts } from '../Themes/';
import I18n from '../I18n';

export default class BookLessonTimeoutCounter extends Component {
  constructor(props) {
    super(props);

    const remainingSeconds = moment(props.release_at).diff(moment.utc(), 'seconds');

    this.state = {
      remainingSeconds
    };

    this.intervalId = setInterval( () => {
      const remainingSeconds = this.state.remainingSeconds - 1;
      console.log('remainingSeconds');
      console.log(remainingSeconds);

      if(remainingSeconds > 0) {
        this.setState({remainingSeconds});
      } else {
        props.handleTimeout();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <View style={{backgroundColor: this.props.submaskColor}}>
        <View style={styles.bg}>
          <Text style={styles.text}>
            {I18n.t('time_to_complete_booking')}
            {`: ${this.state.remainingSeconds} `}
            {I18n.t('seconds')}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = {
  bg: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)'
  },
  text: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.small
  }
};
