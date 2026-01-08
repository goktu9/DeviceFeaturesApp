import {View, Button, Image, Alert, StyleSheet} from 'react-native';
// +++ Import Expo API libraries
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import {useState} from 'react';

export default function CameraScreen() {
  // +++ State to store the selected/taken image URI
  const [imageUri, setImageUri] = useState(null);

  // +++ Function to pick image from gallery
  const pickImage = async () => {
    // +++ Request permission to access media library
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your gallery to pick images.');
      return;
    }

    // +++ Open system UI to select an image
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images
        allowsEditing: true, // Enable built-in cropping
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // +++ Trigger a "Medium" impact haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  // +++ Function to take a photo with camera
  const takePhoto = async () => {
    // +++ Request permission to access camera
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Camera permission required', 'We need access to your camera to take photos.');
      return;
    }

    // +++ Open camera
    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // +++ Trigger a "Success" notification haptic feedback
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick from Gallery" onPress={pickImage} />
      <Button title="Take Photo" onPress={takePhoto} />
      
      {/* +++ Display the image if one is selected */}
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});