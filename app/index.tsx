import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { IMessagesType, TMessage, TParticipant } from "./types";
import MessageList from "./components/MessageList";
import InputBar from "./components/InputBar";
import ImageModal from "./components/ImageModal";
import { useMessagesStore } from "./stores/messageStore";

const Home: React.FC = () => {
  const {
    messages,
    setMessages,
    updateMessages,
    participants,
    setParticipants,
    editedMessage,
    setEditedMessage,
    loading,
    setLoading,
    modalVisible,
    setModalVisible,
    selectedImage,
    setSelectedImage,
  } = useMessagesStore();

  useEffect(() => {
    const fetchMessagesAndParticipants = async () => {
      try {
        // Mesajları çekme
        const messagesResponse = await axios.get<TMessage[]>(
          "http://dummy-chat-server.tribechat.pro/api/messages/latest"
        );
        setMessages(messagesResponse.data);
        // Katılımcıları çekme
        const participantsResponse = await axios.get<TParticipant[]>(
          "http://dummy-chat-server.tribechat.pro/api/participants/all"
        );
        setParticipants(participantsResponse.data);
      } catch (error) {
        console.error("Veriler alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false); // Yükleme durumunu kaldırma
      }
    };

    fetchMessagesAndParticipants();
  }, []);

  const sendMessage = async () => {
    if (editedMessage.trim() === "") return; // Mesaj boşsa gönderme

    try {
      // Yeni mesaj gönderme
      const response = await axios.post<TMessage>(
        "http://dummy-chat-server.tribechat.pro/api/messages/new",
        {
          text: editedMessage,
        }
      );

      updateMessages(response.data); // Yeni mesajı mesaja ekle

      setEditedMessage(""); // Mesaj kutusunu temizle
    } catch (error) {
      console.error("Mesaj gönderilirken bir hata oluştu:", error);
    }
  };

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <MessageList />
      <InputBar
        editedMessage={editedMessage}
        setEditedMessage={setEditedMessage}
        onSendMessage={sendMessage}
      />
      <ImageModal
        modalVisible={modalVisible}
        imageUrl={selectedImage}
        onClose={() => setModalVisible(false)}
        loadingImage={false}
      />
    </KeyboardAvoidingView>
  );
};

export default Home;
