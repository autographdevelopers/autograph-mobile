import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { StyleSheet } from 'react-native'
import { Colors } from '../Themes/'

import Input from './LoginInputField';

const styles = StyleSheet.create({bg: {backgroundColor: Colors.primaryWarm, flex: 1}})

storiesOf('Login Input Field')
  .add('Email(on primary bg)', () => (
    <View style={styles.bg}>
      <Input
        value={'wojtas.pospiesznksinjbhk@vp.pl'}
        placeholder={'Please type in your email address.'}
        label={'E-MAIL'}
        secure={false}
        icon={'envelope'}
      />
    </View>
  ))
  .add('Password (on primary bg)', () => (
    <View style={styles.bg}>
      <Input
        value={'wvdklmvdsklmlcds'}
        placeholder={'Please type in your password.'}
        label={'PASSWORD'}
        secure={true}
        icon={'md-lock'}
      />
    </View>

  ))
  .add('Both email and password', () => (
    <View style={styles.bg}>
      <Input
        value={'wojtas.pospiesznksinjbhk@vp.pl'}
        placeholder={'Please type in your email address.'}
        label={'E-MAIL'}
        icon={'envelope'}
        secure={false}
      />
      <Input
        value={'wvdklmvdsklmlcds'}
        placeholder={'Please type in your password.'}
        label={'PASSWORD'}
        icon={'md-lock'}
        secure={true}/>
    </View>
  ))
