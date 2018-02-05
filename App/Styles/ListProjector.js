import { Colors, Fonts } from '../Themes/';

export default styles = {
  containerStyle: {
    backgroundColor: Colors.snow,
    flex: 1,
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
  },
  header: {
    marginHorizontal: 15,
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    backgroundColor: 'transparent',
    fontFamily: Fonts.type.base,
  },
};
