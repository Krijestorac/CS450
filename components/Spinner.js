import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Spinner = () => {

  return (
    <Modal visible={true}>
      <View style={styles.container}>
        <ActivityIndicator color='red' size='large' />
      </View>
    </Modal>
  );
}

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});