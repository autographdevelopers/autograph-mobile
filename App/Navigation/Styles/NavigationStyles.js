import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes/';

export default StyleSheet.create({
  card: {
    backgroundColor: 'transparent', // TODO check why needed
    shadowColor: 'transparent' // REMOVES default shadows applied by react navigation
  }
})
