import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';

import { ModelProvider } from './contexts/ModelContext';
import Navigation from './navigation/Navigation';

export default function App() {
  const [model, setModel] = useState();

  useEffect(() => {
    (async () => {
      await tf.ready();
      setModel(await mobilenet.load({ version: 1, alpha: 0.5 }));
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <ModelProvider model={model}>
        <Navigation />
        <StatusBar style="dark" />
      </ModelProvider>
    </SafeAreaProvider>
  );
}
