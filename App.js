/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

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

    state = {
        permissionStatus: {
            cameraStatus: null,
            microphoneStatus: null,
            storagePermission: null,
        },
    };

    componentDidMount() {
        //Request permissions
        console.log('componentDidMount');
        this.requestAndroidPermission().then(r => {
            this.setState({
                permissionStatus: {
                    cameraStatus: r.cameraStatus,
                    microphoneStatus: r.microphoneStatus,
                    storagePermission: r.storagePermission,
                },
            });
            console.log('setState');
            console.log(this.state.permissionStatus);

            if (!(r.cameraStatus === RESULTS.GRANTED)) {
                Alert.alert(
                    'Permission isnt granted!',
                    'Grant Camera access permission for app',
                    [{
                        text: 'Request Permission',
                        onPress: async () => {
                            await request(PERMISSIONS.ANDROID.CAMERA)
                            this.componentDidMount();
                        }
                    }]);
                return;
            }

            if (!(r.storagePermission === RESULTS.GRANTED)) {
                Alert.alert(
                    'Permission isnt granted!',
                    'Grant Storage access permission for app',
                    [{
                        text: 'Request Permission',
                        onPress: async () => {
                            await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
                            this.componentDidMount();
                        }
                    }]);
                return;
            }

            if (!(r.microphoneStatus === RESULTS.GRANTED)) {
                Alert.alert(
                    'Permission isnt granted!',
                    'Grant Microphone access permission for app',
                    [{
                        text: 'Request Permission',
                        onPress: async () => {
                            await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
                            this.componentDidMount();
                        }
                    }]);
                return;
            }


        });

    }

    requestAndroidPermission = async () => {
        console.log('requestAndroidPermission');
        const cam = await check(PERMISSIONS.ANDROID.CAMERA);
        const mic = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
        const storage = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        const permissionStatus = {
            cameraStatus: cam,
            microphoneStatus: mic,
            storagePermission: storage,
        };
        console.log('BRUH');
        console.log(permissionStatus);

        return  permissionStatus;
    };

    captureImage = async () => {
        const options = {
            quality: 0.77,
            base64: true,
        };

        const data = await this.cameraRef.takePictureAsync(options);
        await CameraRoll.save(data.uri, 'photo')
            .then(() => {
                //Alert.alert('Image Saved!',"Success")
            })
            .catch((reason: Error) => {
                // Alert.alert('Error!','Image is not saved.\n' + reason.message)
            });


    };

    render() {
        return (
            <View
                ref={ref => {
                    this.viewRef = ref;
                }}
                style={{
                    flex: 1,
                }}>
                <RNCamera
                    notAuthorizedView={<View></View>}
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
