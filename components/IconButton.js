import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ name, size = 24, color = "black", onPress }) => {
  return (
    <Pressable>
      <Ionicons name={name} size={size} color={color} onPress={onPress} />
    </Pressable>
  );
}

export default IconButton;