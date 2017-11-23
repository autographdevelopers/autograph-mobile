import React, {Component} from 'react'
import {View, Image, Text} from 'react-native'
import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics} from '../Themes/'

export default FancyBackground = ({children}) => {
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.primary,
      opacity: 0.5,
      zIndex: 1
    },
    container: {
      flex: 1
    },
    children: {
      flex: 1,
      zIndex: 9999
    }
  });

  const resizeMode = 'center';

  return (
    <View style={styles.container}>
      <Image resizeMode={'stretch'} source={require('../Images/login_pic.jpg')} style={StyleSheet.absoluteFillObject}/>
      <View style={styles.overlay}/>
      <View style={styles.children}>{children}</View>
    </View>
  )
}


{/*<View style={{flex: 1, backgroundColor: '#eee'}}>*/
}

{/*/!*background image*!/*/
}
{/*<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex:999, height: '100%'}}>*/
}
{/*<Image style={{flex: 1, resizeMode,}} source={require('../Images/login_pic.jpg')}/>*/
}
{/*</View>*/
}

{/*/!*overlay*!/*/
}
{/*<View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center'}}>*/
}
{/*<Text style={{textAlign: 'center', fontSize: 40,}}>*/
}
{/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid aspernatur at blanditiis corporis dolores explicabo illo ipsam laboriosam molestiae nulla, officia, pariatur porro praesentium sapiente sequi veniam? Ea, tempore!*/
}
{/*</Text>*/
}
{/*</View>*/
}

{/*</View>*/
}
