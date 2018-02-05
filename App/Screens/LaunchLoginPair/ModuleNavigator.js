import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import navStyles from '../../Navigation/Styles/NavigationStyles';
import LoginScreen from './LoginScreen';
import LaunchScreen from './LaunchScreen';

import { Text, ScrollView, Image, View, Animated } from 'react-native';
import FancyBackground from '../../Components/FancyBackground';
import { Fonts, Metrics, Colors } from '../../Themes/';
import { StyleSheet } from 'react-native';
import Layout from '../../Components/Layout';

const routeConfigs = {
  login: {
    screen: LoginScreen,
  },
  launch: {
    screen: LaunchScreen,
  },
};

const navigationConfigs = {
  initialRouteName: 'launch',
  cardStyle: navStyles.card,
};

const ModuleNavigator = StackNavigator(routeConfigs, navigationConfigs);

class LaunchLoginPair extends Component {
  variableOpacity = new Animated.Value(1);
  static navigationOptions = {
    header: null
  };

  toggleSlogan = () => {
    console.log(this.variableOpacity);
    Animated.timing(
      this.variableOpacity,
      {
        toValue: this.variableOpacity._value === 1 ? 0 : 1 ,
        duration: 500,
      },
    ).start(()=>console.log('animated'));
  };

  render() {
    const { navigation } = this.props;

    return (
      <FancyBackground>
        <Layout customStyles={{ backgroundColor: 'transparent' }}>
          <View style={styles.container}>
            <View style={[styles.section, styles.brandSection]}>
              <Text style={styles.brandName}>AutoGraph</Text>
              <Animated.Text style={[styles.slogan, {opacity: this.variableOpacity}]}>
                Profesjonalne narzędzie do zarządzania szkołami jazdy.
              </Animated.Text>
            </View>
            <View style={{flex: 2}}>
            <ModuleNavigator
              navigation={navigation} screenProps={{toggleSlogan: this.toggleSlogan, parentNavKey: navigation.state.key}} />
            </View>
          </View>
        </Layout>
      </FancyBackground>
    );
  }
}

LaunchLoginPair.router = ModuleNavigator.router;

export default LaunchLoginPair;

const styles = StyleSheet.create({
  section: {
    flex: 1,
  },
  brandSection: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  brand: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  brandName: {
    color: Colors.snow,
    fontSize: Fonts.size.big2,
    fontFamily: Fonts.type.medium
  },
  slogan: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
  },
});
