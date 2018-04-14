import React, { Component } from 'react';
import SlotBookingBy3rdParty from '../../Components/Slots/BookingBy3rdParty';
import moment from 'moment';

export default class SelectedSlotContainer extends Component {
  constructor(props) {
    super(props);

    const remainingSeconds = moment(props.slot.release_at).diff(moment.utc(), 'seconds');

    this.state = {
      remainingSeconds
    };

    this.intervalId = setInterval( () => {
      const remainingSeconds = this.state.remainingSeconds - 1;

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
      <SlotBookingBy3rdParty
        remainingSeconds={this.state.remainingSeconds}
        {...this.props}
      />
    )
  }
}
