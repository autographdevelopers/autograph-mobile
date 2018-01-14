import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import {studentsActionCreators} from '../../Redux/StudentsRedux';

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

class InvitedStudentsList extends Component {
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
      <Text style={styles.header}>{`${data.length} aktywnych studentow`}</Text>
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
    this.props.fetchStudents();
    // this.props.fetchStudents();
  }

  // props.fetchStudents = () => {
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
        this.props.fetchStudents();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.fetchStudents();
      }
    );
  };

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{`Zaproszeni studenci (${this.props.students.length})`}</Text>
        <List containerStyle={[{ borderBottomWidth: 0, borderTopWidth: 0, flex: 1 }, styles.listContainer]}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 60
            }}
            data={this.props.students}
            renderItem={({ item }) => (
              <ListItem
                // roundAvatar
                title={`${item.name} ${item.surname}`}
                subtitle={item.email}
                // avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
                keyExtractor={(item, index) => index}
                onPress={() => {}}
              />
            )}
            keyExtractor={(e, i) => i}
            ListFooterComponent={this.footer}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
          />
        </List>
        <ButtonPrimary float={true} onPress={()=>this.props.navigation.navigate('inviteStudent')}>Dodaj Studenta</ButtonPrimary>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  students: state.students.pendingIds.map( id => state.students.pending[id])
});

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(studentsActionCreators.indexRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedStudentsList)
