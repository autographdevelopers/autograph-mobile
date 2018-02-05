const type = {
  base: 'Roboto',
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  light: 'Roboto-Light',
  thin: 'Roboto-Thin',
};

const size = {
  big2: 45,
  big1: 35,
  input: 18,
  regular: 17,
  medium: 15,
  small: 13,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
