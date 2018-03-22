import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements'
import { Colors, Fonts } from '../Themes/index';
import MapView, { Marker } from 'react-native-maps';

import Layout from '../Components/Layout';

class DrivingSchoolInformation extends Component {
  renderHeader = drivinShoolName => {
    return (
      <View style={styles.header}>
        <Avatar
          medium
          rounded
          source={{uri: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-19/s150x150/11917919_1657917151159677_50718043_a.jpg'}}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.drivingSchoolText}>
            Szkoła jazdy
          </Text>
          <Text style={styles.schoolNameText}>
            {drivinShoolName}
          </Text>
        </View>
      </View>
    )
  }

  renderAdditionalInformation = drivinShoolAdditionalInformation => {
    if(drivinShoolAdditionalInformation.length === 0) { return }

    return (
      <View style={styles.segment}>
        <Text style={styles.subtitle}>o szkole</Text>
        <Text style={styles.softBlack}>
          {drivinShoolAdditionalInformation}
        </Text>
      </View>
    )
  }

  renderContactInformation = drivingSchool => {
    return (
      <View style={styles.segment}>
        <Text style={styles.subtitle}>kontakt</Text>
        {this.renderEmails(drivingSchool.emails)}
        {this.renderPhoneNumbers(drivingSchool.phone_numbers)}
        {this.renderWebSiteLink(drivingSchool.website_link)}
      </View>
    )
  }

  renderLocalization = drivingSchool => {
    return (
      <View style={styles.segment}>
        <Text style={styles.subtitle}>lokalizacja</Text>
        <Text style={styles.localizationSegment}>{`${drivingSchool.country}, ${drivingSchool.city}`}</Text>
        <Text style={styles.localizationSegment}>{`ul. ${drivingSchool.street}, ${drivingSchool.zip_code}`}</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(drivingSchool.latitude),
            longitude: parseFloat(drivingSchool.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(drivingSchool.latitude),
              longitude: parseFloat(drivingSchool.longitude),
            }}
            title={drivingSchool.name}
          />
        </MapView>
      </View>
    )
  }

  renderEmails = emails => {
    return emails.map((email, index) => {
      return (
        <View key={index} style={styles.contactSegment}>
          <Text style={styles.strongGrey}>email: </Text>
          <Text style={styles.softBlack}>{email}</Text>
        </View>
      )
    })
  }

  renderPhoneNumbers = phoneNumbers => {
    return phoneNumbers.map((phoneNumber, index) => {
      return (
        <View key={index} style={styles.contactSegment}>
          <Text style={styles.strongGrey}>nr tel. </Text>
          <Text style={styles.softBlack} >{phoneNumber}</Text>
        </View>
      )
    })
  }

  renderWebSiteLink = webSiteLink => {
    return(
      <View style={styles.contactSegment}>
        <Text style={styles.strongGrey}>strona: </Text>
        <Text style={styles.softBlack} >{webSiteLink}</Text>
      </View>
    )
  }

  render() {
    const { drivingSchool } = this.props

    return (
      <Layout>
        {this.renderHeader(drivingSchool.name)}
        {this.renderAdditionalInformation(drivingSchool.additional_information)}
        {this.renderContactInformation(drivingSchool)}
        {this.renderLocalization(drivingSchool)}
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID]
})

export default connect(mapStateToProps)(DrivingSchoolInformation)

const styles = StyleSheet.create({
  segment: {
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  drivingSchoolText: {
    fontSize: Fonts.size.medium,
    color: Colors.strongGrey
  },
  schoolNameText: {
    fontSize: Fonts.size.regular,
    color: Colors.softBlack
  },
  additionalInformation: {
    fontSize: Fonts.size.small,
    color: Colors.softBlack
  },
  subtitle: {
    fontSize: Fonts.size.medium,
    color: Colors.strongGrey,
    marginBottom: 5,
    fontWeight: '400'
  },
  contactSegment: {
    flexDirection: 'row',
    marginBottom: 2
  },
  strongGrey: {
    color: Colors.strongGrey
  },
  softBlack: {
    color: Colors.softBlack
  },
  map: {
    marginTop: 10,
    width: '100%',
    height: 200
  },
  localizationSegment: {
    flexDirection: 'row',
    marginBottom: 2,
    color: Colors.softBlack
  }
});
