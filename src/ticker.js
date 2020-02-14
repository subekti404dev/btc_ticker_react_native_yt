import React from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';

export class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last: 0,
      buy: 0,
      sell: 0,
      high: 0,
      low: 0,
    };
  }

  async componentWillMount() {
    this.fetchData();
    setInterval(() => {
        this.fetchData();
    }, 10000)
  }

  async fetchData() {
    const data = await fetch('https://indodax.com/api/btc_idr/ticker');
    const jsonData = await data.json();
    if (!data || !jsonData) {
        Alert.alert('Error', 'Failed to fetch data');
    }
    const {ticker} = jsonData;
    const {last, buy, sell, high, low} = ticker;
    this.setState({last, buy, sell, high, low});
    console.log('getdata')
  }
  formatRp = (nominal) => {
    if (typeof(nominal) === 'number') { nominal = nominal.toString()}
    const reverse = nominal.split('').reverse().join('');
	let ribuan 	= reverse.match(/\d{1,3}/g);
	return ribuan.join('.').split('').reverse().join('');
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#313131'}}>
        <SafeAreaView>
          <View style={{width: '100%', alignItems: 'center', paddingTop: 40}}>
            <Text style={{color: '#FFF', fontSize: 33, fontWeight: 'bold'}}>
              Bitcoin Ticker
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <View
              style={{
                width: '80%',
                height: 170,
                backgroundColor: '#868686',
                borderRadius: 10,
                padding: 20,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#FFD16B'}}>
                  {'Rp '}
                </Text>
                <Text
                  style={{fontSize: 30, fontWeight: 'bold', color: '#FFD16B'}}>
                  {this.formatRp(this.state.last)}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  paddingTop: 5,
                }}>
                <View style={{flex: 1}}>
                  <KeyValue label={'High'} value={this.formatRp(this.state.high)} />
                  <KeyValue label={'Low'} value={this.formatRp(this.state.low)} />
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <KeyValue label={'Buy'} value={this.formatRp(this.state.buy)} />
                  <KeyValue label={'Sell'} value={this.formatRp(this.state.sell)} />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const KeyValue = props => {
  return (
    <View style={{paddingTop: 3}}>
      <Text style={{fontSize: 11, color: '#fff'}}>{props.label}</Text>
      <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
        {props.value}
      </Text>
    </View>
  );
};
