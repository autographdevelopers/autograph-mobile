import React, { Component } from 'react';
import SelectedSlotComponent from '../../Components/Slots/SelectedSlot';
import moment from 'moment';

export default class SelectedSlotContainer extends Component {
  constructor(props) {
    super(props);

    console.log(props.slot.release_at);
    console.log(moment.utc().format());

    const remainingSeconds = moment.utc(props.slot.release_at).diff(moment.utc(), 'seconds')
    this.state = {
      remainingSeconds
    };

    this.intervalId = setInterval( () => {
      const secondsUpdated = this.state.remainingSeconds - 1;

      if(secondsUpdated > 0)
        this.setState({remainingSeconds: secondsUpdated});
      else
        props.handleTimeout();

    }, 1000)
  }

  componentWillMount() {
    console.log('SELECTED SLOT: componentWillMount');
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    console.log('SELECTED SLOT: componentWillUnmount')
  }

  render() {
    return (
      <SelectedSlotComponent remainingSeconds={this.state.remainingSeconds} {...this.props} />
    )
  }
}
