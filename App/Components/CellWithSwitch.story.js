import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native';
import CellWithSwitch from './CellWithSwitch';

storiesOf('CellWithSwitch')
  .add('Default', () => (
    <CellWithSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt'}/>
  ))
  .add('Long Description', () => (
    <CellWithSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'}/>
  ))
  .add('No description', () => (
    <CellWithSwitch label={'Some label'}/>
  ))
  .add('Multiple', () => (
    <View>
      <CellWithSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'} value={true}/>
      <CellWithSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing '}/>
      <CellWithSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt'} value={true}/>
      <CellWithSwitch label={'Some label'} />
      <CellWithSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'}/>
      <CellWithSwitch label={'Some label'} description={'Lorem ipsum dolor sit melt some very interesing description siaba siaba da mydelko fa'} value={true}/>
    </View>
  ));
