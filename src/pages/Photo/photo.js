import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import style from '../style.js';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();
  const [displayText, setDisplayText] = useState('loading');
  const [url, setUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/e/ee/%22Candle%22.JPG'
  );

  function navigatioBack() {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        //Camera Request Permissions
        // const { status2 } = await Camera.requestPermissionsAsync();
        // setHasPermission(status2 === 'granted');
      }
    })();
  }, []);

  // useEffect(() => {
  //   async function loadTF() {
  //     await tf.ready(); // preparing TensorFlow
  //     this.setState({ isTfReady: true });
  //     // this.model = await mobilenet.load(); // preparing MobileNet model
  //     this.model = await cocossd.load(); // preparing COCO-SSD model
  //     this.setState({ isModelReady: true });
  //   }
  //   loadTF();
  // });

  // function imageToTensor(rawImageData) {
  //   const TO_UINT8ARRAY = true;
  //   const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  //   // Drop the alpha channel info for mobilenet
  //   const buffer = new Uint8Array(width * height * 3);
  //   let offset = 0; // offset into original data
  //   for (let i = 0; i < buffer.length; i += 3) {
  //     buffer[i] = data[offset];
  //     buffer[i + 1] = data[offset + 1];
  //     buffer[i + 2] = data[offset + 2];
  //     offset += 4;
  //   }
  //   return tf.tensor3d(buffer, [height, width, 3]);
  // }

  // async function loadWords() {
  //   try {
  //     console.log('começou');
  //     console.log(image);
  //     const imageAssetPath = Image.resolveAssetSource(image);
  //     console.log(imageAssetPath.uri);
  //     const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
  //     console.log(response);
  //     const rawImageData = await response.arrayBuffer();
  //     console.log(rawImageData);
  //     console.log('----');
  //     const imageTensor = imageToTensor(rawImageData);
  //     const predictions = await this.model.detect(imageTensor);
  //     this.setState({ predictions: predictions });
  //     console.log('----------- predictions: ', predictions);
  //   } catch (error) {
  //     console.log('Exception Error: ', error);
  //   }
  // }

  // detectObjects = async () => {
  //   try {
  //     console.log('começou');
  //     const imageAssetPath = Image.resolveAssetSource(image);
  //     const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
  //     const rawImageData = await response.arrayBuffer();
  //     const imageTensor = imageToTensor(rawImageData);
  //     const predictions = await this.model.detect(imageTensor);
  //     this.setState({ predictions: predictions });
  //     console.log('----------- predictions: ', predictions);
  //   } catch (error) {
  //     console.log('Exception Error: ', error);
  //   }
  // };

  //Camera Permissions
  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      // await loadWords();
    }
  };

  async function getPrediction(url) {
    try {
      setDisplayText('Loading Tensor Flow');
      await tf.ready();
      setDisplayText('Loading Mobile Net');
      const model = await mobilenet.load();
      setDisplayText('Fetching Image');
      const response = await fetch(url, {}, { isBinary: true });
      setDisplayText('Getting Image Buffer');
      const imageData = await response.arrayBuffer();
      setDisplayText('Getting Image Tensor');
      const imageTensor = imageToTensor(imageData);
      setDisplayText('Getting Classification Result');
      const prediction = await model.classify(imageTensor);
      setDisplayText(JSON.stringify(prediction));
    } catch (error) {
      console.log('Exception Error: ', error);
    }
  }

  function imageToTensor(rawData) {
    const { width, height, data } = jpeg.decode(rawData, true);
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    return tf.tensor3d(buffer, [height, width, 3]);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        {/* {image && <Image source={{ uri: image }} style={styles.borderClass} />} */}
        <Image source={{ uri: url }} style={styles.borderClass} />
      </View>
      <Text>{displayText}</Text>
      <TouchableOpacity style={style.registerBtn} onPress={pickImage}>
        <Text>Pick an image from camera roll</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.registerBtn}>
        <Text>Take a photo from camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.registerBtn}
        onPress={() => getPrediction(url)}
      >
        <Text>Classify Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.backBtn} onPress={() => navigatioBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
    // <View style={{ flex: 1 }}>
    //   <Camera
    //     style={{ flex: 0.5, marginTop: 150, marginLeft: 50, marginRight: 50 }}
    //     type={type}
    //   >
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: 'transparent',
    //         flexDirection: 'row'
    //       }}
    //     >
    //       {/* <TouchableOpacity
    //         style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
    //         onPress={() => {
    //           setType(
    //             type === Camera.Constants.Type.back
    //               ? Camera.Constants.Type.front
    //               : Camera.Constants.Type.back
    //           );
    //         }}
    //       >
    //         <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
    //           {' '}
    //           Flip{' '}
    //         </Text>
    //       </TouchableOpacity> */}
    //     </View>
    //   </Camera>

    // </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageContainer: {
    borderWidth: 3,
    borderColor: '#F44336',
    borderRadius: 2,
    marginTop: 5,
    width: 315,
    height: 315
  },

  borderClass: {
    width: 310,
    height: 310
  }
});
