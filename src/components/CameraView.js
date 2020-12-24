import React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

class CameraView extends React.Component {
    camera : RNCamera;

    takeShot = async () => {
        this.camera.takePictureAsync()
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>

                <RNCamera
                    ref={ref => {
                        this.cameraXd = ref;
                    }}
                    style={{
                        flex: 1,
                    }}>


                   <Button title={'click'} onPress={this.takeShot}/>
                </RNCamera>


            </View>
        );
    }
}

export default CameraView;
