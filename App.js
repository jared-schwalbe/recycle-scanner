import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';

import { ModelProvider } from './contexts/ModelContext';
import Navigation from './navigation/Navigation';
import useCachedResources from './hooks/useCachedResources';

export default function App() {
  const [model, setModel] = useState();
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    (async () => {
      await tf.ready();
      setModel(await mobilenet.load({ version: 1, alpha: 0.5 }));
    })();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ModelProvider model={model}>
        <Navigation />
        <StatusBar style="dark" />
      </ModelProvider>
    </SafeAreaProvider>
  );
}
