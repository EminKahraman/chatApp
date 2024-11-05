import React from "react";
import {
  Modal,
  View,
  Image,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface ImageModalProps {
  modalVisible: boolean;
  imageUrl: string | null;
  onClose: () => void;
  loadingImage: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalVisible,
  imageUrl,
  onClose,
  loadingImage,
}) => (
  <Modal visible={modalVisible} transparent={true} animationType="fade">
    <View style={styles.modalContainer}>
      {loadingImage && <ActivityIndicator size="large" color="#fff" />}
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.modalImage} />
      )}
      <Button title="Kapat" onPress={onClose} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    flexShrink: 1, // İçeriğe göre daraltma
    flexGrow: 0,
    maxWidth: "80%",
    minWidth: "45%",
  },
  messageText: {
    fontSize: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  senderName: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  editedText: {
    fontSize: 12,
    color: "orange",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "transparent",
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
    borderRadius: 100,
  },
  messageImage: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
  reactionsContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  reaction: {
    marginRight: 5,
  },
  replyMessage: {
    fontStyle: "italic",
    color: "#555",
  },
  dateSeparator: {
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImage: {
    width: "90%",
    height: 300,
    borderColor: "white",
    borderWidth: 2,
  },
  mentionSuggestions: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 1,
    width: "100%",
  },
  button: {
    marginTop: 20,
    width: 100,
    height: 40,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    color: "blue",
    marginTop: 5,
    marginLeft: "auto",
  },
  editButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default ImageModal;
