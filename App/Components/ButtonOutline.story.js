import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { StyleSheet } from 'react-native'
import { Colors } from '../Themes/'

import ButtonOutline from './ButtonOutline'

const styles = StyleSheet.create({bg: {backgroundColor: Colors.primary, flex: 1}})
const styles2 = StyleSheet.create({bg: {backgroundColor: 'violet', flex: 1}})

storiesOf('ButtonOutline')
  .add('Default(on primary bg)', () => (
    <View style={styles.bg}>
      <ButtonOutline>default</ButtonOutline>
    </View>
  ))
  .add('long text(on primary bg)', () => (
    <View style={styles.bg}>
      <ButtonOutline>Lorem ipsum dolo</ButtonOutline>
    </View>

  ))
  .add('custom color(on primary bg)', () => (
    <View style={styles.bg}>
      <ButtonOutline color={'red'}>Lorem ipsum dolor sit ne</ButtonOutline>
    </View>

  ))
  .add('capitalized(on primary bg)', () => (
    <View style={styles.bg}>
      <ButtonOutline>LOG IN</ButtonOutline>
    </View>


  ))
  .add('capitalized(on custom bg)', () => (
    <View style={styles2.bg}>
      <ButtonOutline>LOG IN</ButtonOutline>
    </View>

  ))
