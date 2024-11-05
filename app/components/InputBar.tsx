import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface InputBarProps {
  editedMessage: string;
  setEditedMessage: (text: string) => void;
  onSendMessage: () => void;
}

const InputBar: React.FC<InputBarProps> = ({
  editedMessage,
  setEditedMessage,
  onSendMessage,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Yeni mesaj yaz..."
      value={editedMessage}
      onChangeText={setEditedMessage}
    />
    <TouchableOpacity onPress={onSendMessage} style={styles.sendButton}>
      <Ionicons name={"send-outline"} size={20} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "transparent",
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    backgroundColor: "#cfcfcf",
    borderRadius: 1000,
    padding: 14,
    marginRight: 10,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cfcfcf",
    padding: 14,
    borderRadius: 1000,
  },
});

export default InputBar;
