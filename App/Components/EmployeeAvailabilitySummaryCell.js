import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fonts, Colors } from '../Themes/index';
import DefaultAvatar from './DefaultAvatar';
import { PieChart } from 'react-native-svg-charts';
import ButtonText from '../Components/ButtonText';

const MoreIndicator = () => (
  <View style={styles.dotsWrapper}>
    <View style={styles.dot}/>
    <View style={styles.dot}/>
    <View style={styles.dot}/>
  </View>
)

export default EmployeeAvailabilitySummaryCell = props => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.header}>Wojciech Pośpieszyński</Text>
          <View style={styles.underline}/>
        </View>
        <DefaultAvatar name={'W'} customContainerStyle={{marginRight: 0}} customSize={30}/>
      </View>
      <View style={styles.chartRow}>
        <PieChart style={{ height: 40, width: 40 }}
                  data={[{value: Math.random(1,3), svg: {fill: Colors.yellowDark}, key: `pie-1`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-2`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-3`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-4`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-5`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-6`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-7`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-8`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-9`},
                    {value: Math.random(1,3), svg: {fill: Colors.primaryWarm}, key: `pie-10`}]}
                  innerRadius={0}
                  padAngle={0}
                  />
        <View style={styles.key}>
          <Text style={styles.takenSlots}>Umówionych jazd (5)</Text>
          <Text style={styles.freeSlots}>Wolne terminy w godzinach:</Text>
          <View style={styles.intervalCollection}>
            <View style={styles.intervalContainer}><Text style={styles.intervalText}>12:00 - 13:00</Text></View>
            <View style={styles.intervalContainer}><Text style={styles.intervalText}>12:00 - 13:00</Text></View>
            <View style={styles.intervalContainer}><Text style={styles.intervalText}>12:00 - 13:00</Text></View>
            <MoreIndicator/>
            {/*<View style={styles.intervalContainer}><Text style={styles.intervalText}>12:00 - 13:00</Text></View>*/}
            {/*<View style={styles.intervalContainer}><Text style={styles.intervalText}>12:00 - 13:00</Text></View>*/}
            {/*<View style={styles.intervalContainer}><Text style={styles.intervalText}>12:00 - 13:00</Text></View>*/}
            {/*<View style={styles.intervalContainer}><Text style={styles.intervalText}>12:00 - 13:00</Text></View>*/}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTxt}>Sprawdź całą dyspozycyjność lub umów jazdę</Text>
        <ButtonText customTextStyle={{ fontSize: Fonts.size.extraSmall}}>Sprawdź grafik</ButtonText>
      </View>
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    backgroundColor: Colors.snow,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    shadowOpacity: 0.15,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 8,
    borderRadius: 8,

    marginVertical: 15 // todo remove
  },
  takenSlots: {
    color: Colors.primaryWarm,
    fontSize: Fonts.size.small,
  },
  freeSlots: {
    color: Colors.yellowDark,
    fontSize: Fonts.size.small,
    marginBottom: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chartRow: {
    flexDirection: 'row',
    marginTop: 5
  },
  key: {
    marginLeft: 15, flex:1
  },
  footerTxt: {
    fontSize: Fonts.size.extraSmall,
    color: Colors.strongGrey,
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: Fonts.size.medium,
    color: Colors.black
  },
  underline: {
    width: 40,
    height: 3,
    borderRadius: 8,
    marginLeft: 5,
    backgroundColor: Colors.primaryWarm
  },
  intervalContainer: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
    marginBottom: 5,
    marginRight: 5,
  },
  intervalText: {
    color: Colors.black,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.extraSmall,
  },
  intervalCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: Colors.strongGrey,
    borderRadius: 2
  },
  dotsWrapper: {
    flexDirection: 'row',
    width: 10,
    height: Fonts.size.extraSmall,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 5
  }
};
