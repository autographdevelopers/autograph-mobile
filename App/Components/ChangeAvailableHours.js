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

const ICON_SIZE = 32;

export default class ChangeAvailableHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableHours: props.availableHours
    };
  }

  render() {
    let { availableHours } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Przydziel/Odbierz dostępne godziny
        </Text>
        <View style={styles.rowView}>
          <TouchableOpacity onPress={() => this.setState({ availableHours: availableHours + 1 })}>
            <Icon name={'plus'} size={ICON_SIZE} color={Colors.strongGrey}/>
          </TouchableOpacity>
          <Text style={styles.availableHours}>{availableHours}</Text>
          <TouchableOpacity onPress={
            () => this.setState({
              availableHours: (availableHours > 0 ? availableHours - 1 : 0)
            })
          }>
            <Icon name={'minus'} size={ICON_SIZE} color={Colors.strongGrey}/>
          </TouchableOpacity>
        </View>
        <PrimaryButton
          onPress={() => this.props.onPress({ available_hours: availableHours })}>
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
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  }
});
