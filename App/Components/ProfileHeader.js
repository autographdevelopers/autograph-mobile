import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
} from 'react-native';
import { Fonts, Colors } from '../Themes/';
import DefaultAvatar from './DefaultAvatar';
import ButtonText from './ButtonText';

const DURATION = 350;
const AVATAR_SMALL_SIZE = 45;
const AVATAR_LETTER_SMALL_FONT = 25;
const AVATAR_LETTER_LARGE_FONT = 30;
const AVATAR_LARGE_SIZE = 70;
const TEXT_HEIGHT = Fonts.size.medium;

export default class ProfileHeader extends Component  {

  variableAvatarSize = new Animated.Value(AVATAR_LARGE_SIZE);
  variableAvatarFontSize = new Animated.Value(AVATAR_LETTER_LARGE_FONT);
  variableFontSize = new Animated.Value(TEXT_HEIGHT);
  variableOpacity = new Animated.Value(1);

  constructor(props) {
    super(props);

    this.state = {
      showDetails: true,
      avatarSizeGoal: AVATAR_SMALL_SIZE,
      avatarLetterSizeGoal: AVATAR_LETTER_SMALL_FONT,
      opacityGoal: 0,
      textHeightGoal: 0,
      animate: false
    };
  }

  revertAnimationGoal = () => {
    const newOpacityGoal = (this.state.opacityGoal + 1) % 2;

    this.setState({
      avatarSizeGoal: [AVATAR_SMALL_SIZE, AVATAR_LARGE_SIZE][newOpacityGoal],
      avatarLetterSizeGoal: [AVATAR_LETTER_SMALL_FONT, AVATAR_LETTER_LARGE_FONT][newOpacityGoal],
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
        this.variableAvatarSize,
        {
          toValue: this.state.avatarSizeGoal,
          duration: DURATION,
        },
      ),
      Animated.timing(
        this.variableAvatarFontSize,
        {
          toValue: this.state.avatarLetterSizeGoal,
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
    if(nextProps.routeName === 'employeeProfile' &&
      (this.props.routeName === 'editPrivileges' ||
        this.props.routeName === 'availabilityIndex' ))

      this.resizeHeaderAndRedirect()();
  };

  render() {
    const { avatarProps, user } = this.props;

    const textAnimationStyles = {
      fontSize: this.variableFontSize,
      height: this.variableFontSize,
      opacity: this.variableOpacity
    };

    const avatarAnimationStyles = {
      width: this.variableAvatarSize,
      height: this.variableAvatarSize
    };

    return (
      <View style={styles.container}>
        <View style={styles.leftCol}>
          <DefaultAvatar {...avatarProps}
                         customLetterStyle={{fontSize: this.variableAvatarFontSize}}
                         customContainerStyle={avatarAnimationStyles}

          />
        </View>
        <View style={styles.rightCol}>

          <Text style={styles.primaryInfo}>{`${user.name} ${user.surname}`}</Text>

          <Animated.Text style={[styles.secondaryInfo, textAnimationStyles]}>{`email: ${user.email}`}</Animated.Text>

          <ButtonText onPress={this.resizeHeaderAndRedirect(this.props.onManagePersonClick)}
            customTextStyle={textAnimationStyles}>
            Zarzadzaj pracownikiem
          </ButtonText>

          <ButtonText onPress={this.resizeHeaderAndRedirect(this.props.onSetAvailabilityClick)}
                      customTextStyle={textAnimationStyles}>
            Ustaw dyspozycyjnosc
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
