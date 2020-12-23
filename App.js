import React from 'react';
import {Text, View} from 'react-native';


class App extends React.Component {

    render() {
        return (
            <View
                style={{
                    justifyContent:'center',
                    alignContent:'center',
                    alignItems:'center',
                    flex:1
            }}>

                <Text>Kolver!</Text>
            </View>
        );
    }
}

export default App;
