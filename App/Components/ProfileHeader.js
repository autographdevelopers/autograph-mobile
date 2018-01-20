import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultAvatar from './DefaultAvatar';
import ButtonText from './ButtonText';

export default class ProfileHeader extends Component  {

  variableSize = new Animated.Value(80);
  variableFontSize = new Animated.Value(Fonts.size.medium);
  variableOpacity = new Animated.Value(1);

  constructor(props) {
    super(props);

    this.state = {
      showDetails: true
    };
  }

  render() {

    const { onManagePersonClick, avatarProps, user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.leftCol}>
          <Animated.View
            style={{ width: this.variableSize, height: this.variableSize }}>
            <DefaultAvatar {...avatarProps}
              // customContainerStyle={{ width: 68, height: 68 }}
                           customLetterStyle={{ fontSize: 30 }}
                           aniamationable={true}
            />
          </Animated.View>
        </View>
        <View style={styles.rightCol}>
          <Text style={styles.primaryInfo}>{`${user.name} ${user.surname}`}</Text>
          {/*<Text style={styles.secondaryInfo}>{`tel: ${user.phone_number}`}</Text>*/}
          <Animated.Text style={[
            styles.secondaryInfo,
            {
              fontSize: this.variableFontSize,
              height: this.variableFontSize,
              opacity: this.variableOpacity,
            }]}>{`email: ${user.email}`}</Animated.Text>
          <ButtonText onPress={() => {
            // onManagePersonClick();
            Animated.parallel([
              Animated.timing(                  // Animate over time
                this.variableSize,            // The animated value to drive
                {
                  toValue: 50,                   // Animate to opacity: 1 (opaque)
                  duration: 350,              // Make it take a while
                },
              ),
              Animated.timing(                  // Animate over time
                this.variableFontSize,            // The animated value to drive
                {
                  toValue: 0,                   // Animate to opacity: 1 (opaque)
                  duration: 350,              // Make it take a while
                },
              ),
              Animated.timing(                  // Animate over time
                this.variableOpacity,            // The animated value to drive
                {
                  toValue: 0,                   // Animate to opacity: 1 (opaque)
                  duration: 350,              // Make it take a while
                },
              )]).start(onManagePersonClick);
          }} customTextStyle={{
            fontSize: this.variableFontSize,
            height: this.variableFontSize,
            opacity: this.variableOpacity
          }}>
            {/*<View style={styles.row}>*/}
            {/*<Icon name={'cog'} color={Colors.primaryWarm} size={15} />*/}
            {/*<Text style={{flex:1}}>{`Manage ${user.type}`}</Text>*/}
            {/*</View>*/}
            Zarzadzaj pracownikiem
          </ButtonText>
        </View>
      </View>
    );
  }
};

const styles = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  leftCol: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '25%',
    paddingRight: 15
  },
  rightCol: {
    flex: 1,
    justifyContent: 'center',
  },
  primaryInfo: {
    color: Colors.softBlack,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
  },
  secondaryInfo: {
    color: Colors.strongGrey,
    // fontSize: Fonts.size.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
