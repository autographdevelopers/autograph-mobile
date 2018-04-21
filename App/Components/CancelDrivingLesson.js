import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import I18n from '../I18n/index'
import { Fonts, Colors } from '../Themes/'
import ButtonText from './ButtonText'
import DefaultAvatar from './DefaultAvatar';
import { connect } from 'react-redux';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';

const AVATAR_SIZE = 22;

const CancelDrivingLessons = ({ cancelRequest, drivingLesson }) => {
  return (
    <View>
      <Text style={styles.text}>
        Czy na pewno chcesz odwołać jazdy?
      </Text>
      <View style={{alignSelf: 'center'}}>
        {renderUser(drivingLesson.employee)}
        <Text style={styles.withText}>z</Text>
        {renderUser(drivingLesson.student)}
      </View>
      <Text style={{alignSelf: 'center', fontSize: Fonts.size.small, marginVertical: 10}}>
        {drivingLesson.start_time}
      </Text>
      <ButtonText
        onPress={cancelRequest(drivingLesson.id)}
        customTextStyle={{color: Colors.salmon}}
        customStyle={styles.buttonText}>
        Odwołaj
      </ButtonText>
    </View>
  )
}

const renderUser = (user) => {
  return <View style={styles.userFeed}>
    <DefaultAvatar name={user.name}
                   customSize={AVATAR_SIZE}
                   customLetterStyle={{fontSize: Fonts.size.small}}
                   customContainerStyle={{marginRight: 10 }} />
    <Text>
      {`${user.name} ${user.surname}`}
    </Text>
  </View>
}

const styles = StyleSheet.create({
  text: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15
  },
  buttonText: {
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10
  },
  userFeed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2
  },
  withText: {
    alignSelf: 'center',
    fontSize: Fonts.size.extraSmall,
    color: Colors.strongGrey
  }
});

const mapDispatchToProps = dispatch => ({
  cancelRequest: id => () => dispatch(drivingLessonActionCreators.cancelRequest(id))
});

const mapStateToProps = state => ({
  drivingLesson: state.lessonModal.cancel.drivingLesson
});

export default connect(mapStateToProps, mapDispatchToProps)(CancelDrivingLessons)
