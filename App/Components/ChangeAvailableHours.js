import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { Colors, Fonts } from '../Themes/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from './ButtonPrimary';

export default class ChangeAvailableHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableHours: props.availableHours
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Przydziel/Odbierz dostępne godziny
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15}}>
          <TouchableOpacity onPress={() => this.setState({availableHours: this.state.availableHours + 1})}>
            <Icon name={'plus'} size={32} color={Colors.strongGrey}/>
          </TouchableOpacity>
          <Text style={styles.availableHours}>{this.state.availableHours}</Text>
          <TouchableOpacity onPress={() => this.setState({availableHours: this.state.availableHours - 1})}>
            <Icon name={'minus'} size={32} color={Colors.strongGrey}/>
          </TouchableOpacity>
        </View>
        <PrimaryButton
          onPress={
            () => {this.props.onPress({available_hours: this.state.availableHours})}
          }>
          Zatwierdź
        </PrimaryButton>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: Fonts.size.medium,
    color: Colors.strongGrey
  },
  availableHours: {
    fontSize: Fonts.size.big1,
    marginHorizontal: 15
  }
});
