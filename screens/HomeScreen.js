import {View, Button, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* +++ Navigate to Camera Screen */}
      <Button 
        title="Camera & Gallery" 
        onPress={() => navigation.navigate('Camera')} 
      />
      
      {/* +++ Navigate to Location Screen */}
      <Button 
        title="Location" 
        onPress={() => navigation.navigate('Location')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 20,
  },
});