import { Colors, Fonts } from '../Themes/';

export default styles = {
  containerStyle: {
    backgroundColor: Colors.snow,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    shadowOpacity: 0.15,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 8,
    borderRadius: 8,
    marginBottom: 15,
  },
  contentContainerStyle: {
    paddingBottom: 60 // Height of button + extra space
  }
};
