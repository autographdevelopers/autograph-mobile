import React, { Component } from 'react';
import { View, SectionList } from 'react-native';
import SearchInput from './SearchInput';
import { peopleHelper } from '../Lib/PeopleHelpers';
import { SearchBar } from 'react-native-elements';
import { Fonts, Colors } from '../Themes/';

export default class SearchableList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  onSearchInputChange = (value) => {
    this.setState({
      searchTerm: value
    })
  };

  filterData = () => {
    if(this.state.searchTerm !== '') {
      const regex = new RegExp('^' + this.state.searchTerm, 'i');

      return this.props.data.filter((item, _) => {
        return regex.test(item.name) || regex.test(item.surname)
      })
    }
    return this.props.data;
  };

  render() {
    const {
      renderItem,
      renderSectionHeader,
      additionalSectionListProps={}
    } = this.props;

    const data = this.filterData();
    const groupedData = peopleHelper.groupAlphabetically(data);

    return (
      <View>
        <View style={styles.searchbarWrapper}>
          <SearchBar lightTheme
                     onChangeText={this.onSearchInputChange}
                     onClear={()=> this.onSearchInputChange('')}
                     placeholder='Znajdź pracownika..'
                     clearIcon={{name: 'close', color: Colors.strongGrey}}
          />
        </View>
        <SectionList
          sections={groupedData}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(s, _) => `item-${s.id}`}
          {...additionalSectionListProps}
        />
      </View>
    );
  }
}

const styles = {
  searchbarWrapper: {
    marginBottom: 15
  }
};
