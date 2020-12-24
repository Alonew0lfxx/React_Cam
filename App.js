/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Alert, Image, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

class App extends React.Component {
    /*
    * #FIX
    * If you don't get the auto completes for the ref varible
    * (for ex.) cameraRef.takePictureAsync() was not showing on auto-complete for me
    * just write the varibles(or refs) with theirs elements (cameraRef: RNCamera) on top of the class
    * And that will make your IDE to show RNCamera's methods on auto-complete.
    *
    * Sorry for that bad english >.<
    *
    */
    cameraRef: RNCamera;
    viewRef: View;

    requestAndroidPermission = async () => {
        try {
            const isGranted=  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            if (!(isGranted === 'granted')) {
                request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
                    .then(value =>{
                    if (value === RESULTS.GRANTED) {
                      ToastAndroid.show('Permission Granted!',ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show('Permission Not Granted! \n ' + value,ToastAndroid.SHORT)
                    }
                } )
            }

        } catch (e) {
            Alert.alert('Error!','Unable to request permission.\n' + e.message)
        }
    }

    captureImage = async () => {
        const options = {
            quality: 0.77,
            base64:true,
        }

        const data = await this.cameraRef.takePictureAsync(options);
        await this.requestAndroidPermission();
        await CameraRoll.save(data.uri,'photo')
            .then(() => {
                //Alert.alert('Image Saved!',"Success")
            })
            .catch((reason: Error)  => {
               // Alert.alert('Error!','Image is not saved.\n' + reason.message)
            })


    };

    render() {
        return (
            <View
                ref={ref => {
                    this.viewRef= ref;
                }}
                style={{
                    flex: 1,
                }}>
                <RNCamera
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}
                    ref={ref => {
                        this.cameraRef = ref;
                    }}>
                    <TouchableOpacity
                        onPress={this.captureImage}
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 50,
                            backgroundColor: '#fdfdfd',
                            marginBottom: 64,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            tintColor={'rgba(72,52,212,0.74)'}
                            source={require('./src/icons/ic_camera.png')}
                        />
                    </TouchableOpacity>
                </RNCamera>
            </View>
        );
    }
}

export default App;
