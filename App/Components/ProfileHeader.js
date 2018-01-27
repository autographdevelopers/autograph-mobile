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

const DURATION = 350;
const AVATAR_SMALL_SIZE = 50;
const AVATAR_LARGE_SIZE = 80;
const TEXT_HEIGHT = Fonts.size.medium;

export default class ProfileHeader extends Component  {

  variableSize = new Animated.Value(AVATAR_LARGE_SIZE);
  variableFontSize = new Animated.Value(TEXT_HEIGHT);
  variableOpacity = new Animated.Value(1);

  constructor(props) {
    super(props);

    this.state = {
      showDetails: true,
      avatarSizeGoal: AVATAR_SMALL_SIZE,
      opacityGoal: 0,
      textHeightGoal: 0,
      animate: false
    };
  }

  revertAnimationGoal = () => {
    const newOpacityGoal = (this.state.opacityGoal + 1) % 2;

    this.setState({
      avatarSizeGoal: [AVATAR_SMALL_SIZE, AVATAR_LARGE_SIZE][newOpacityGoal],
      opacityGoal: newOpacityGoal,
      textHeightGoal: [0, TEXT_HEIGHT][newOpacityGoal],
      animate: false
    })
  };

  handleAnimationEnd = () => {
    this.revertAnimationGoal();
  };

  resizeHeaderAndRedirect = ( callback = ()=>{} ) => () => {
    Animated.parallel([
      Animated.timing(
        this.variableSize,
        {
          toValue: this.state.avatarSizeGoal,
          duration: DURATION,
        },
      ),
      Animated.timing(
        this.variableFontSize,
        {
          toValue: this.state.textHeightGoal,
          duration: DURATION,
        },
      ),
      Animated.timing(
        this.variableOpacity,
        {
          toValue: this.state.textHeightGoal,
          duration: DURATION,
        },
      )]).start(
        ()=> {
          this.handleAnimationEnd();
          callback();
        }
    );
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.routeName === 'employeeProfile' && this.props.routeName === 'manageEmployee' )
      this.resizeHeaderAndRedirect()();
  };

  render() {
    const { avatarProps, user } = this.props;

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
          <ButtonText onPress={this.resizeHeaderAndRedirect(this.props.onManagePersonClick)}
            customTextStyle={{
            fontSize: this.variableFontSize,
            height: this.variableFontSize,
            opacity: this.variableOpacity
          }}>
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
