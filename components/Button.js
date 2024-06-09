import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#007BFF', 
    borderRadius: 8,
    elevation: 3,
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  flatText: {
    color: '#007BFF', 
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 8,
    backgroundColor: '#0056b3', 
  }
});
