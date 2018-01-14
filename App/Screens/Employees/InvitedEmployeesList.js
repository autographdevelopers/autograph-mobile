import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';

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
    this.props.fetchEmployees();
  }

  // props.fetchEmployees = () => {
  //   const { page, seed } = this.state;
  //   const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
  //   this.setState({ loading: true });
  //
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({
  //         data: page === 1 ? res.results : [...this.state.data, ...res.results],
  //         error: res.error || null,
  //         loading: false,
  //         refreshing: false
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.props.fetchEmployees();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.fetchEmployees();
      }
    );
  };

  render() {

    console.log(this.props.employees);

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{`Zaproszeni pracownicy (${this.props.employees.length})`}</Text>
        <List containerStyle={[{ borderBottomWidth: 0, borderTopWidth: 0, flex: 1 }, styles.listContainer]}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 60
            }}
            data={this.props.employees}
            renderItem={({ item }) => (
              <ListItem
                // roundAvatar
                title={`${item.name} ${item.surname}`}
                subtitle={item.email}
                // avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => {}}
              />
            )}
            keyExtractor={(e, i) => e.id || i}
            ListFooterComponent={this.footer}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
          />
        </List>
        <ButtonPrimary float={true} onPress={()=>this.props.navigation.navigate('inviteEmployee')}>Dodaj pracownika</ButtonPrimary>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.employees.pendingIds.map( id => state.employees.pending[id])
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: () => dispatch(employeesActionCreators.indexRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedEmployeesList)
