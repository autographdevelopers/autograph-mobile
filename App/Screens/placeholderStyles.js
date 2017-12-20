import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/index';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 250,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.strongGrey,
    fontSize: Fonts.size.big1
  },
  soon: {
    alignSelf: 'center',
    marginTop: 15,
    textAlign: 'center',
    color: Colors.primaryWarm,
    fontSize: Fonts.size.big1
  }
})
