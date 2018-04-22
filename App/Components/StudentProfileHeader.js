/** Lib dependencies */
import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
/** Custom dependencies */
import { Fonts, Colors } from '../Themes/';
import DefaultAvatar from './DefaultAvatar';
import ButtonText from './ButtonText';

const DURATION = 350;
const AVATAR_SMALL_SIZE = 45;
const AVATAR_LETTER_SMALL_FONT = 25;
const AVATAR_LETTER_LARGE_FONT = 30;
const AVATAR_LARGE_SIZE = 70;
const TEXT_HEIGHT = Fonts.size.small;
const TEXT_CONTAINER_HEIGHT = Fonts.size.medium + 2;
const TEXT_BUTTON_ICON_SIZE = 16;

const LINKS = ['manageStudent'];

export default class StudentProfileHeader extends Component  {

  variableAvatarSize = new Animated.Value(AVATAR_LARGE_SIZE);
  variableAvatarFontSize = new Animated.Value(AVATAR_LETTER_LARGE_FONT);
  variableFontSize = new Animated.Value(TEXT_HEIGHT);
  variableTextContainerSize = new Animated.Value(TEXT_CONTAINER_HEIGHT);
  variableTextButtonIconSize = new Animated.Value(TEXT_BUTTON_ICON_SIZE);
  variableOpacity = new Animated.Value(1);

  constructor(props) {
    super(props);

    this.state = {
      showDetails: true,
      avatarSizeGoal: AVATAR_SMALL_SIZE,
      avatarLetterSizeGoal: AVATAR_LETTER_SMALL_FONT,
      opacityGoal: 0,
      textHeightGoal: 0,
      textContainerHeightGoal: 0,
      textButtonIconSizeGoal: 0,
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
      textContainerHeightGoal: [0, TEXT_CONTAINER_HEIGHT][newOpacityGoal],
      textButtonIconSizeGoal: [0, TEXT_BUTTON_ICON_SIZE][newOpacityGoal],
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
        this.variableTextContainerSize,
        {
          toValue: this.state.textContainerHeightGoal,
          duration: DURATION,
        },
      ),
      Animated.timing(
        this.variableTextButtonIconSize,
        {
          toValue: this.state.textButtonIconSizeGoal,
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
    /** Handle going back to profile index */
    const nextRoute = nextProps.navigation.state.routeName;
    const currentRoute = this.props.navigation.state.routeName;

    if(nextRoute === 'profile' && LINKS.includes(currentRoute))
      this.resizeHeaderAndRedirect()();
  };

  render() {
    const { navigation } = this.props;
    const { user, index, title } = navigation.state.params;

    const textAnimationStyles = {
      fontSize: this.variableFontSize,
      height: this.variableTextContainerSize,
      opacity: this.variableOpacity
    };

    const avatarAnimationStyles = {
      width: this.variableAvatarSize,
      height: this.variableAvatarSize
    };

    return (

      <View>
        <View style={styles.container}>
          <View style={styles.leftCol}>
            <DefaultAvatar name={user.name}
                           index={index}
                           customLetterStyle={{fontSize: this.variableAvatarFontSize}}
                           customContainerStyle={avatarAnimationStyles}

            />
          </View>
          <View style={styles.rightCol}>

            <Text style={styles.primaryInfo}>{`${user.name} ${user.surname}`}</Text>

            <Animated.Text style={[styles.secondaryInfo, {marginTop: 2}, textAnimationStyles]}>{`tel. ${user.phone_number}`}</Animated.Text>
            <Animated.Text style={[styles.secondaryInfo, {marginBottom: 2}, textAnimationStyles]}>{`email: ${user.email}`}</Animated.Text>

            <ButtonText onPress={this.resizeHeaderAndRedirect(() => navigation.navigate('manageStudent', { user, index, title: 'Ustaw uprawnienia' }))}
                        customTextStyle={textAnimationStyles}>
              Zarzadzaj kursantem
            </ButtonText>
          </View>
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
    fontWeight: '400',
  },
  secondaryInfo: {
    color: Colors.strongGrey,
    // marginVertical: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
