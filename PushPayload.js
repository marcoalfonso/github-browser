'use strict';

var React = require('react-native');

var {
  Text,
  View,
  Component,
  ListView,
  Image
} = React;

var moment = require('moment');

class PushPayload extends Component{
	constructor(props){
		super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    console.log(props.pushEvent)
		this.state = {
      dataSource: ds.cloneWithRows(props.pushEvent.payload),
      pushEvent: props.pushEvent
		};
	}

  rederRow(rowData){
    return(
      <View style={{
        flex: 1,
        justifyContent: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10
      }}>
        <Text>{rowData.sha.substring(0, 6)} - {rowData.message}</Text>
      </View>

    )
  }

	render(){
    return (
      <View style={{
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <Image
          source={{uri: this.state.pushEvent.actor.avatar_url}}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60
          }}/>
          <Text style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20
          }}>
            {moment(this.state.pushEvent.create_at).fromNow()}
          </Text>

          <Text>{this.state.pushEvent.actor.login}</Text>
          <Text>at {this.state.pushEvent.repo.name}</Text>
          
      </View>
    );
  }
}


module.exports = PushPayload;