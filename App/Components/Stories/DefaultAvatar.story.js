import React from 'react';
import {View, FlatList} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Colors} from '../../Themes/';
import DefaultAvatar from '../DefaultAvatar';
import {ListItem} from 'react-native-elements';

const DATA = [
  {
    title: 'aneta Sikora',
    subtitle: 'anetka@example.com',
  },
  {
    title: 'bartek Kowalski',
    subtitle: 'bartek@example.com',
  },
  {
    title: 'czeslaw Milosz',
    subtitle: 'czesiek@example.com',
  },
  {
    title: 'Piotr Zyla',
    subtitle: 'piter@example.com',
  },
  {
    title: 'Radoslaw Majdak',
    subtitle: 'rasek@example.com',
  },
  {
    title: 'Slawomir Palka',
    subtitle: 'slawek@example.com',
  },
  {
    title: 'Tomek Agent',
    subtitle: 'tomtom@example.com',
  },
  {
    title: 'Tadeusz Norek',
    subtitle: 'tadek@example.com',
  },
  {
    title: 'Wojtek Mistrz',
    subtitle: 'czesiek@example.com',
  },
  {
    title: 'Witek Kierat',
    subtitle: 'wiitt@example.com',
  },
  {
    title: 'Zenon trabka',
    subtitle: 'zenek@example.com',
  },
  {
    title: 'Zofia Kazmiwerxzka',
    subtitle: 'zofia@example.com',
  },
  {
    title: 'Zuzia Jez',
    subtitle: 'zuza@example.com',
  },
];

storiesOf('Login Input Field').add('Def.av.list', () => (
  <View>
    <FlatList
      contentContainerStyle={{paddingBottom: 60,}}
      data={DATA}
      renderItem={({item, index}) => (
        <ListItem
          leftIcon={<DefaultAvatar name={item.title} index={index}/>}
          title={item.title}
          subtitle={item.subtitle}
          containerStyle={{borderBottomWidth: 0}}
        />
      )}
      keyExtractor={(e, i) => i}
    />
  </View>
));
