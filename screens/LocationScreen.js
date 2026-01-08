import { View, Text, Button, Alert, StyleSheet } from 'react-native';
// +++ Import Expo API libraries
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import {useState} from 'react';

// +++ Configure notification handler to show alerts when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function LocationScreen() {
  // +++ State to store coordinates
  const [coords, setCoords] = useState(null);

  // +++ Function to get current GPS location
  const getLocation = async () => {
    // +++ Request permission to access location
    const {status} = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Location permission required', 'We need access to your location to show coordinates.');
      return;
    }

    // +++ Get current position
    const location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);

    // +++ Request permission for notifications
    const {status: notifStatus} = await Notifications.requestPermissionsAsync();
    
    // +++ Schedule a local notification if permission granted
    if (notifStatus === 'granted') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Location Retrieved',
          body: 'Your GPS location was successfully fetched.',
        },
        trigger: null, // Send immediately
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Current Location" onPress={getLocation} />
      
      {/* +++ Display coordinates if available */}
      {coords && (
        <Text style={styles.coordsText}>
          Lat: {coords.latitude} {"\n"}
          Lng: {coords.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordsText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});