import { StyleSheet, View, Text, Pressable } from "react-native";

const NavButton = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.button}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default NavButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    height: 45,
    borderRadius: 18,
    elevation: 8,
    backgroundColor: 'teal',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }
  },
  button: {
    paddingTop: '15%',
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  }
});