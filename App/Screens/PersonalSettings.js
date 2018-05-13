import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, SectionList } from 'react-native';
import { Colors, Fonts } from '../Themes/index';
import SectionHeader from '../Components/SectionHeader';
import ButtonText from '../Components/ButtonText'
import Layout from '../Components/Layout';
import UniversalCell from '../Components/UniversalCell';
import IconF from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import { sessionActionCreators } from '../Redux/Access/SessionRedux';
import { NavigationActions } from 'react-navigation';
class PersonalSettings extends Component {

  renderSectionHeader = ({section}) => <SectionHeader title={section.title}/>

  renderListItem = ({item}) => (
    <UniversalCell
      title={item.field}
      subtitle={item.value}
    />
  );

  logout = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [ NavigationActions.navigate({ routeName: 'loginLaunch' }) ],
    });

    this.props.navigation.dispatch(resetAction);
    this.props.logout();
  };


  render() {

    const { user } = this.props.navigation.state.params;

    const sections = [
      {
        title: 'Dane osobowe',
        data: [
          {field: 'Imię', value: user.name},
          {field: 'Nazwisko', value: user.surname},
          {field: 'Email', value: user.email},
          {field: 'Hasło', value: 'Resetuj haslo'},
          {field: 'Data urodzenia', value: user.birth_date},
        ]
      },
      {
        title: 'Subskrybcja',
        data: [ { field: 'Plan', value: 'Free trial'} ]
      },
      {
        title: 'Więcej informacji',
        data: [
          {field: 'Polityka prywatności'},
          {field: 'Warunki korzystania z serwisu'},
          {field: 'O Autograph'},
          {field: 'Wsparcie'},
        ]
      }
    ];


    return(
      <Layout scroll={false}>
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sections}
          keyExtractor={(s, index) => `info-${index}`}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          renderItem={this.renderListItem}
        />
        <View style={styles.btnContainer}>
          <ButtonText icon={<IconF name={'sign-out'} size={13} color={Colors.primaryWarm}/>} onPress={this.logout}>
            Wyloguj
          </ButtonText>
        </View>
      </Layout>
    )
  }
}


const styles = {
  btnContainer: {
    marginVertical: 15
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: Colors.lightGrey
  }
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(sessionActionCreators.destroyRequest())
});

export default connect(null, mapDispatchToProps)(PersonalSettings)
