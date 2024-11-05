import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { TMessage, TParticipant } from "../types";
import Reactions from "./Reactions";
import { useMessagesStore } from "../stores/messageStore";

interface MessageItemProps {
  message: TMessage;
  participants: TParticipant[];
}

const MessageItem: React.FC<MessageItemProps> = ({ message, participants }) => {
  const { setEditedMessage, setSelectedImage, setModalVisible } =
    useMessagesStore();
  const author = participants.find((p) => p.uuid === message.authorUuid);
  const isSelf = message.authorUuid === "you";

  return (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: isSelf ? "flex-end" : "flex-start",
          backgroundColor: isSelf ? "#1b8bb4" : "gray",
        },
      ]}
    >
      {author && (
        <View style={styles.header}>
          <Image
            source={{ uri: author.avatarUrl || "" }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.senderName}>{author.name}</Text>
            <Text style={styles.timestamp}>
              {dayjs(message.sentAt).format("HH:mm")}
            </Text>
          </View>
        </View>
      )}
      <Text style={styles.messageText}>{message.text}</Text>
      {message.attachments &&
        message.attachments.map((attachment) => {
          return attachment.type === "image" ? (
            <TouchableOpacity
              key={`${attachment.url}-${attachment.type}`}
              onPress={() => {
                setSelectedImage(attachment.url);
                setModalVisible(true);
              }}
            >
              <Image
                source={{ uri: attachment.url }}
                style={styles.messageImage}
              />
            </TouchableOpacity>
          ) : null;
        })}
      <Reactions reactions={message.reactions || []} />
      {isSelf && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditedMessage(message.text)}
        >
          <Text style={styles.editButtonText}>Düzenle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    flexShrink: 1, // İçeriğe göre daraltma
    flexGrow: 0,
    maxWidth: "80%",
    minWidth: "45%",
  },
  messageText: {
    fontSize: 14,
    color: "white",
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
    color: "white",
  },
  timestamp: {
    fontSize: 12,
    color: "white",
  },

  editedText: {
    fontSize: 12,
    color: "orange",
  },
  messageImage: {
    width: 100,
    height: 100,
    marginTop: 5,
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
  editButton: {
    marginLeft: "auto",
  },
  editButtonText: {
    color: "blue",
  },
});

export default MessageItem;
