import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

import { ModelContext } from '../contexts/ModelContext';
import closeIcon from '../assets/close.png';

const TensorCamera = cameraWithTensors(Camera);

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const CAMERA_TEXTURE_HEIGHT = 1920;
const CAMERA_TEXTURE_WIDTH = 1080;
const CAMERA_SCREEN_HEIGHT = WINDOW_HEIGHT;
const CAMERA_SCREEN_WIDTH = WINDOW_HEIGHT * (CAMERA_TEXTURE_WIDTH / CAMERA_TEXTURE_HEIGHT);
const CAMERA_SCREEN_OFFSET = (CAMERA_SCREEN_WIDTH - WINDOW_WIDTH) / 2;
const RUN_EVERY_N_FRAMES = 90;

export default function ScanScreen({ navigation }) {
  const [prediction, setPrediction] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();

  const frame = useRef(0);
  const mobilenetModel = useContext(ModelContext);

  const handleCameraStream = images => {
    const loop = async () => {
      if (mobilenetModel) {
        if (frame.current % RUN_EVERY_N_FRAMES === 0){
          const nextImageTensor = images.next().value;
          if (nextImageTensor){
            const results = await mobilenetModel.classify(nextImageTensor);
            if (results && results.length > 0) {
              setPrediction(results[0].className);
            }
            tf.dispose([nextImageTensor]);
          }
        }
        frame.current += 1;
        frame.current %= RUN_EVERY_N_FRAMES;
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(({ status }) => {
        setHasCameraPermission(status === 'granted');
      });
  }, []);

  if (!hasCameraPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Please provide access to your camera.</Text>
      </SafeAreaView>
    );
  }

  if (!mobilenetModel) {
    return (
      <SafeAreaView style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
        <Pressable onPress={navigation.goBack} style={styles.close}>
          <Image source={closeIcon} style={styles.closeIcon} />
        </Pressable>
        <ActivityIndicator size="large" style={styles.loading} />
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
      <Pressable onPress={navigation.goBack} style={styles.close}>
        <Image source={closeIcon} style={styles.closeIcon} />
      </Pressable>
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
  close: {
    left: 36,
    position: 'absolute',
    top: 72,
    zIndex: 20,
  },
  closeIcon: {
    height: 28,
    width: 28,
  },
  camera: {
    height: CAMERA_SCREEN_HEIGHT,
    marginLeft: CAMERA_SCREEN_OFFSET,
    position: 'absolute',
    width: CAMERA_SCREEN_WIDTH,
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  loading: {
    position: 'absolute',
    zIndex: 20,
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
