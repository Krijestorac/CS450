import { StyleSheet, View } from 'react-native';

const Divider = () => {
  return (
    <View style={styles.divider} />
  );
}

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 4
  }
});