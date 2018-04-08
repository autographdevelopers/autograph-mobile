const REQUEST_COMMANDS = {
  SUBSCRIBE: 'subscribe',
  MESSAGE: 'message',
};

const SERVER_ACTIONS = {
  LOCK_SLOT: 'lock_slot',
  UNLOCK_SLOT: 'unlock_slot'
};

const SLOTS_CHANNEL_NAME = `SlotsChannel`;

const SERVER_FEEDBACK = {
  SLOT_CHANGED: 'SLOT_CHANGED'
};

export class EmployeeSlotsSocket {
  constructor(credentials, employeeId, schoolId, onSlotChanged, onTransmissionError) {
    const { uid, clientId, accessToken } = credentials;
    const endpoint = `ws://localhost:3000/api/v1/cable?uid=${uid}&client=${clientId}&token=${accessToken}`;

    this._employeeId = employeeId;
    this._schoolId = schoolId;
    this._onTransmissionError = onTransmissionError;
    this._socket = new WebSocket(endpoint);

    const subscribeParams = this._buildTransmissionParams(REQUEST_COMMANDS.SUBSCRIBE);

    this._socket.onopen = () => this._socketTransmit(subscribeParams);

    this._socket.onmessage = event => {
      const data = event.data;
      const receievedData = JSON.parse(data);

      const { message } = receievedData;

      if(message && message.type !== 'ping') {
        switch(message.type) {
          case SERVER_FEEDBACK.SLOT_CHANGED:
            console.log('message');
            console.log(message);
            console.log(message.slot);
            onSlotChanged(message.slot)
        }
      }
    }
  }

  lockSlot = slot  => {
    const dataParams = this._buildDataParam(
      SERVER_ACTIONS.LOCK_SLOT,
      { slot_id: slot.id }
    );

    this._triggerServerAction(dataParams);
  };

  unlockSlot = slot => {
    const dataParams = this._buildDataParam(
      SERVER_ACTIONS.UNLOCK_SLOT,
      { slot_id: slot.id }
    );

    this._triggerServerAction(dataParams);
  };

  _triggerServerAction = dataParams => {
    const transmissionParams = this._buildTransmissionParams(
      REQUEST_COMMANDS.MESSAGE,
      dataParams
    );

    this._socketTransmit(transmissionParams);
  };

  _socketTransmit = params => {
    if (this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(params);
    } else {
      this._onTransmissionError();
    }
  };

  _buildTransmissionParams = (command, data={}) => {
    const identifier = JSON.stringify({
      employee_id: this._employeeId,
      driving_school_id: this._schoolId,
      channel: SLOTS_CHANNEL_NAME
    });

    return JSON.stringify({
      command,
      identifier,
      data: JSON.stringify(data)
    })
  };

  _buildDataParam = (action, data) => {
    return {
      action,
      ...data
    }
  };
}
