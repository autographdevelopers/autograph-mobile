import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, TouchableOpacity, Text } from 'react-native';
import UniversalCell from './UniversalCell';


const CustomRightBtn = () => (
  <TouchableOpacity><Text style={{ color: 'red', fontSize: 15 }}>Usun</Text></TouchableOpacity>
);

const CustomTitle = () => {
  const cont = {flexDirection: 'row', alignItems: 'center'}
  const dot = {width: 7, height: 7, backgroundColor: 'red', borderRadius: 50, marginRight: 10}
  return(<View style={cont}><View style={dot}/><Text>Agra II - Oddzial Sienkiewicza</Text></View>)
};


storiesOf('Uni. cell')
  .add('separator full-width', () => (
    <View>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
    </View>
  ))
  .add('separator padded', () => (
    <View>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
    </View>
  ))
  .add('Custom title', () => (
    <View>
      <UniversalCell CustomTitle={CustomTitle} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell CustomTitle={CustomTitle} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell CustomTitle={CustomTitle} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell CustomTitle={CustomTitle} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell CustomTitle={CustomTitle} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell CustomTitle={CustomTitle} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell CustomTitle={CustomTitle} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('Custom heading2', () => (
    <UniversalCell/>
  ))
  .add('avat.def+title1', () => (
    <View>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }}/>
    </View>
  ))
  .add('avat.def+title12', () => (
    <View>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} avatar={{ uri: null }} subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('avat.cust+title12', () => (
    <View>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}
                     subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}
                     subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}
                     subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}
                     subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}
                     subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}
                     subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}
                     subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('avat.cust+title1', () => (
    <View>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}/>
      <UniversalCell title={'Interesting title'}
                     avatar={{ uri: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg" }}/>
    </View>
  ))
  .add('noavat.+title1', () => (
    <View>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
    </View>
  ))
  .add('noavat.+title12', () => (
    <View>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('l cust. right btn', () => (
    <View>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
    </View>
  ))
  .add('s cust. right btn', () => (
    <View>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
    </View>
  ))
  .add('No right btn', () => (
    <View>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
    </View>
  ))
  .add('List larges', () => (
    <View>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'} topLine={true}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('List padded', () => (
    <View>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}
                     topLine={true}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('List defaults', () => (
    <View>
      <UniversalCell title={'Interesting title'} topLine={true}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
    </View>
  ));
