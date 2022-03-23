import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

const TensorCamera = cameraWithTensors(Camera);

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const CAMERA_TEXTURE_HEIGHT = 1920;
const CAMERA_TEXTURE_WIDTH = 1080;
const CAMERA_SCREEN_HEIGHT = WINDOW_HEIGHT;
const CAMERA_SCREEN_WIDTH = WINDOW_HEIGHT * (CAMERA_TEXTURE_WIDTH / CAMERA_TEXTURE_HEIGHT);
const CAMERA_SCREEN_OFFSET = (CAMERA_SCREEN_WIDTH - WINDOW_WIDTH) / 2;

let frame = 0;
const RUN_EVERY_N_FRAMES = 90;

export default function ScanScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [mobilenetModel, setMobilenetModel] = useState();
  const [prediction, setPrediction] = useState();

  const handleCameraStream = images => {
    const loop = async () => {
      if (mobilenetModel) {
        if (frame % RUN_EVERY_N_FRAMES === 0){
          const nextImageTensor = images.next().value;
          if (nextImageTensor){
            const results = await mobilenetModel.classify(nextImageTensor);
            if (results && results.length > 0) {
              setPrediction(results[0].className);
            }
            tf.dispose([nextImageTensor]);
          }
        }
        frame += 1;
        frame = frame % RUN_EVERY_N_FRAMES;
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
        await tf.ready();
        setMobilenetModel(await mobilenet.load({ version: 1, alpha: 0.25 }));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!hasCameraPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No access to camera</Text>
      </SafeAreaView>
    );
  }

  if (!mobilenetModel){
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading the model...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TensorCamera 
        autorender
        cameraTextureHeight={CAMERA_TEXTURE_HEIGHT}
        cameraTextureWidth={CAMERA_TEXTURE_WIDTH}
        onReady={handleCameraStream}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      />
      {Boolean(prediction) && (
        <View style={styles.prediction}>
          <Text style={{ fontSize: 16 }}>
            Is this a <Text style={{ fontWeight: 'bold' }}>{prediction}</Text>?
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: CAMERA_SCREEN_HEIGHT,
    marginLeft: CAMERA_SCREEN_OFFSET,
    position: 'absolute',
    width: CAMERA_SCREEN_WIDTH,
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  prediction: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    bottom: 60,
    flexDirection: 'row',
    height: 75,
    justifyContent: 'center',
    padding: 10,
    position:'absolute',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    zIndex: 20,
    width: '80%',
  },
});
