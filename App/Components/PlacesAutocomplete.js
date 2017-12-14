import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../Themes/';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Label from './InputLabel';
import InputFieldLayout from './InputFieldLayout';
import Icon from 'react-native-vector-icons/Ionicons'

export default PlacesAutocomplete = ({ input, meta, label, required = false, setValue}) => {
  return (
    <InputFieldLayout meta={meta} required={required} label={label}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={3} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed={false}    // true/false/undefined
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          setValue(data)
        }}
        textInputProps={{
          onBlur: val => input.onBlur(input.value)
        }}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDltvzJvuLGlYVDx5iPEHQTHraLWCAF5LM',
          language: 'pl' // language of the results
        }}

        // renderRightButton={() => <TouchableOpacity><Icon name="md-close" color={Colors.mediumGrey} size={20}/></TouchableOpacity>}

        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            paddingLeft: 0

            // fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            // color: '#1faadb'
          },
          poweredContainer: {
            height: 0
          },
          powered: {
            height: 0
          },
          separator: {
            paddingLeft: 0

          },
          container: {
            backgroundColor: 'transparent'
          },
          listView: {
            // borderRadius: 50
            paddingLeft: 0
          },
          textInputContainer: {
            backgroundColor: 'transparent',
            marginHorizontal: 0,
            paddingHorizontal: 0,
            marginVertical: 0,
            paddingVertical: 0,
            height: 18,
            borderBottomColor: Colors.mediumGrey,
            borderBottomWidth: 0,
            borderTopWidth: 0
          },
          textInput: {
            borderBottomWidth: 1,
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            // borderBottomColor: Colors.mediumGrey,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            height: 18,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0
          }
        }}

        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}

        debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    </InputFieldLayout>
  );
}


