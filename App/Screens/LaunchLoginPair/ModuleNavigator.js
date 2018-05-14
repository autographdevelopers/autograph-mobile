import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import LoginScreen from './LoginScreen';
import LaunchScreen from './LaunchScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { stackNavigatorConfig } from '../../Config/NavigationConfig';
import { Text, ScrollView, TouchableOpacity, View, Animated } from 'react-native';
import FancyBackground from '../../Components/FancyBackground';
import { Fonts, Metrics, Colors } from '../../Themes/';
import { StyleSheet } from 'react-native';
import Layout from '../../Components/Layout';
import I18n from '../../I18n/';
import { propsChangedOnlyByNavigation } from '../../Lib/utils';

const routeConfigs = {
  login: {
    screen: LoginScreen,
  },
  launch: {
    screen: LaunchScreen,
  },
};

const navigationConfigs = {
  ...stackNavigatorConfig,
  initialRouteName: 'launch',
  cardStyle: {
    backgroundColor: 'transparent', // TODO check why needed
    shadowColor: 'transparent'
  },
  transitionConfig: () => ({
    containerStyle: {}
  }),
  navigationOptions: {
    header: null
  }
};

const ModuleNavigator = StackNavigator(routeConfigs, navigationConfigs);

class LaunchLoginPair extends Component {
  variableOpacity = new Animated.Value(1);

  toggleSlogan = () => {
    Animated.timing(
      this.variableOpacity,
      {
        toValue: this.variableOpacity._value === 1 ? 0 : 1 ,
        duration: 200,
      },
    ).start();
  };


  render() {

    const { navigation, screenProps } = this.props;

    return (
      <FancyBackground>
        <Layout customStyles={{ backgroundColor: 'transparent' }}>
          <View style={styles.container}>
            {navigation.state.index === 1 &&
            <TouchableOpacity onPress={() => navigation.goBack(null)} style={styles.backContainer}>
              <FontAwesomeIcon name={'angle-left'} size={40} color={Colors.snow}/>
            </TouchableOpacity>
            }
            <View style={styles.brandSection}>
              <Text style={styles.brandName}>{I18n.t('brand_name')}</Text>
              <Animated.Text style={[styles.slogan, {opacity: this.variableOpacity}]}>
                {I18n.t('brand_description')}
              </Animated.Text>
            </View>
            <View style={{flex: 1}}>
            <ModuleNavigator
              navigation={navigation} screenProps={{toggleSlogan: this.toggleSlogan, ...screenProps}} />
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
  backContainer: {
    position: 'absolute',
    marginTop: 20,
    paddingRight: 80
  },
  brandSection: {
    justifyContent: 'flex-end',
    marginTop: 75,
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
