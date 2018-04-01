import Toast from 'react-native-root-toast';

export function* displayToastMessageSaga(action) {
  const { configuration, message } = action;

  const config = configuration || {};

  console.log(configuration);
  console.log(message);

  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    ...config
  });
}
