/** Lib dependencies */
import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
} from 'react-native';
/** Custom dependencies */
import NavHeader from '../Components/NavHeader';
import { Fonts, Colors } from '../Themes/';
import DefaultAvatar from './DefaultAvatar';
import ButtonText from './ButtonText';
import { debouncePressEvent } from '../Lib/utils';

const DURATION = 350;
const AVATAR_SMALL_SIZE = 45;
const AVATAR_LETTER_SMALL_FONT = 25;
const AVATAR_LETTER_LARGE_FONT = 30;
const AVATAR_LARGE_SIZE = 70;
const FONT_SIZE = Fonts.size.medium;
const TEXT_HEIGHT = FONT_SIZE + 6;

const LINKS = ['editPrivileges', 'availabilityIndex'];

export default class EmployeeProfileHeader extends Component  {

  variableAvatarSize = new Animated.Value(AVATAR_LARGE_SIZE);
  variableAvatarFontSize = new Animated.Value(AVATAR_LETTER_LARGE_FONT);
  variableFontSize = new Animated.Value(FONT_SIZE);
  variableTextHeight = new Animated.Value(TEXT_HEIGHT);
  variableOpacity = new Animated.Value(1);

  constructor(props) {
    super(props);

    this.state = {
      showDetails: true,
      avatarSizeGoal: AVATAR_SMALL_SIZE,
      avatarLetterSizeGoal: AVATAR_LETTER_SMALL_FONT,
      opacityGoal: 0,
      fontSizeGoal: 0,
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
      fontSizeGoal: [0, FONT_SIZE][newOpacityGoal],
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
          toValue: this.state.fontSizeGoal,
          duration: DURATION,
        },
      ),
      Animated.timing(
        this.variableTextHeight,
        {
          toValue: this.state.fontSizeGoal,
          duration: DURATION,
        },
      ),
      Animated.timing(
        this.variableOpacity,
        {
          toValue: this.state.fontSizeGoal,
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
      height: this.variableFontSize,
      opacity: this.variableOpacity
    };

    const avatarAnimationStyles = {
      width: this.variableAvatarSize,
      height: this.variableAvatarSize
    };

    return (
      <View>
        <NavHeader navigation={navigation} title={title} />
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

            <Animated.Text style={[styles.secondaryInfo, { marginTop: 3 }, textAnimationStyles]}>{`tel. ${user.phone_number}`}</Animated.Text>

            <Animated.Text style={[styles.secondaryInfo, { marginTop: 3 }, textAnimationStyles]}>{`email: ${user.email}`}</Animated.Text>

            <ButtonText onPress={debouncePressEvent(this.resizeHeaderAndRedirect(() => navigation.navigate('editPrivileges', { user, index, title: 'Ustaw uprawnienia' })))}
              customTextStyle={[textAnimationStyles, { marginTop: 3 }]}>
              Zarzadzaj pracownikiem
            </ButtonText>

            <ButtonText onPress={debouncePressEvent(this.resizeHeaderAndRedirect(() => navigation.navigate('availabilityIndex', { user, index, title: 'Dyspozycyjnosc' })))}
                        customTextStyle={[textAnimationStyles, { marginTop: 3 }]}>
              Ustaw dyspozycyjnosc
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
    backgroundColor: 'white',
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
