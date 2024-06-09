import { View, StyleSheet, Text } from 'react-native';
import Button from './Button';

function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button
        style={{ marginTop: 16, width: '50%' }}
        onPress={() => { }}>Try again</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#343a40', 
    fontSize: 24, 
    fontWeight: 'bold', 
  },
  message: {
    textAlign: 'center',
    color: '#dc3545', 
    fontSize: 18, 
  }
});
