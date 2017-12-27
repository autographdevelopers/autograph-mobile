import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ButtonPrimary from '../Components/ButtonPrimary';
import ButtonText from '../Components/ButtonText';
import { Fonts, Colors } from '../Themes/';
import SegmentsControl from '../Components/SegmentsControl';
import { StackNavigator } from 'react-navigation';
import navStyles from '../Navigation/Styles/NavigationStyles';
import UniversalCell from '../Components/UniversalCell';

const data = [
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  },
  {
    title: 'Wojciech Pospieszynski',
    subtitle: 'Instructor - Agra',
    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmjAAAAJDU0YjI2NTlkLTUyMzktNDk5Yy05YmQxLTQyZmIyNjA1Mjk4MA.jpg'
  }
];

const styles = StyleSheet.create({
  container: {
    // flex: 1, height: '100%'
  },
  listContainer: {
    // backgroundColor: Colors.snow,
    shadowOpacity: 0.15,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 8,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 15
  },
  header: {
    // marginVertical: 5,
    marginHorizontal: 15,
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    backgroundColor: 'transparent'
  },
  footer: {
    paddingVertical: 5,
    // borderTopWidth: 1,
    borderColor: Colors.mediumGrey
  }

});

class InvitedEmployeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      expanded: false
    };
  }

  header = () => {
    return (
      <Text style={styles.header}>{`${data.length} aktywnych pracownikow`}</Text>
    );
  };

  footer = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" color={Colors.primaryWarm}/>
      </View>
    );
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{`Zaproszeni pracownicy (${this.state.data.length})`}</Text>
        <List containerStyle={[{ borderBottomWidth: 0, borderTopWidth: 0, flex: 1 }, styles.listContainer]}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 60
            }}
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
                keyExtractor={(item, index) => index}
                onPress={() => {
                }}
              />
            )}
            keyExtractor={(e, i) => i}
            ListFooterComponent={this.footer}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
          />
        </List>
        <ButtonPrimary float={true}>Dodaj pracownika</ButtonPrimary>
      </View>
    )
  }
}

class ActiveEmployeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }

  header = () => {
    return (
      <Text style={styles.header}>{`${data.length} aktywnych pracownikow`}</Text>
    );
  };

  footer = () => {
    return (
      <View style={styles.footer}>
        <ButtonText position={'center'}
                    onPress={() => this.setState({ expanded: !this.state.expanded })}>{this.state.expanded ? 'Less' : 'More'}</ButtonText>
      </View>
    );
  };

  render() {
    const componentProps = {
      selectedIndex: 0,
      values: ['Aktywni', 'Zaproszeni'],
      onPress: () => 1
    };

    return (
      <List containerStyle={styles.listContainer}>
        <FlatList
          data={data.slice(0, (this.state.expanded ? (data.length - 1) : 1))}
          renderItem={({ item }) => (
            <UniversalCell
              title={item.title}
              subtitle={item.subtitle}
              avatar={{ uri: item.url }}
              keyExtractor={(item, index) => index}
              onPress={() => {
              }}
            />
          )}
          keyExtractor={(e, i) => i}
          ListFooterComponent={this.footer}
        />
      </List>
    )
  }
}

const routeConfigs = {
  ActiveEmployeesList: {
    screen: InvitedEmployeesList
  },
  InvitedEmployeesList: {
    screen: InvitedEmployeesList
  }
};
const SEGMENTS = [
  { name: 'Aktywni', component: 'ActiveEmployeesList' },
  { name: 'Zaproszeni', component: 'InvitedEmployeesList' }
];

const navigationConfigs = {
  navigationOptions: {
    header: props => {
      const handlePress = index => {
        index === 1 ? props.navigation.navigate(SEGMENTS[index].component) : props.navigation.goBack(null);
      };
      return <SegmentsControl
        componentProps={{
          values: SEGMENTS.map(segment => segment.name),
          selectedIndex: props.navigation.state.index,
          onTabPress: handlePress
        }}/>
    },
    headerStyle: { elevation: 0, shadowOpacity: 0 }
  },
  initialRouteName: 'ActiveEmployeesList',
  cardStyle: navStyles.card
};

export default StackNavigator(routeConfigs, navigationConfigs);
