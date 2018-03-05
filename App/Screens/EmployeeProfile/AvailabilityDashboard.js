import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Colors, Fonts } from '../../Themes/index';
import BubbleBackground from '../../Components/BubbleBackground';

export default class AvailabilityDashboard extends Component {

  componentWillMount = () => {

  };

  handlePress = () => {
    const { user, index } = this.props.navigation.state.params;

    this.props.navigation.navigate('setAvailability',
      { user, index, title: 'Ustaw dyspozycyjnosc' });
  };

  render() {
    return (
      <BubbleBackground>
        <View style={styles.container}>
          <View style={styles.placeholderBox}>
            <Text style={styles.title}>Mój Grafik</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit melt..Lorem ipsum dolor sit meltLorem
              ipsum dolor sit meltLorem ipsum dolor sit meltLorem ipsum dolor
              sit meltLorem ipsum dolor sit meltLorem ipsum dolor sit meltLorem
              ipsum dolor sit melt.t</Text>
            <TouchableOpacity onPress={this.handlePress} style={styles.button}>
              <Text style={styles.buttonText}>STWÓRZ GRAFIK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BubbleBackground>
    );
  }
}

const styles = {
  title: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.regular,
    marginBottom: 15,
    alignSelf: 'center'
  },
  description: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
    marginBottom: 15,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 110
  },
  placeholderBox: {
    width: '90%',
    minHeight: 200,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: Colors.snow,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.primaryWarm,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 15
  },
  buttonText: {
    color: Colors.primaryWarm,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.medium
  }
};
