import React, { useEffect, useRef } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import dayjs from "dayjs";
import { TMessage, TParticipant } from "../types";
import MessageItem from "./MessageItem";
import { useMessagesStore } from "../stores/messageStore";

interface MessageListProps {}

const MessageList: React.FC<MessageListProps> = ({}) => {
  const { messages, participants } = useMessagesStore() as {
    messages: TMessage[];
    participants: TParticipant[];
  };

  const yourRef = useRef<FlatList<TMessage>>(null);

  let lastMessageDate: string | null = null;

  useEffect(() => {
    setTimeout(() => {
      yourRef.current?.scrollToEnd();
    }, 100);
  }, [messages]);

  const renderMessage = ({ item }: { item: TMessage }) => {
    // Mesaj tarihını formatla
    const messageDate = dayjs(item.sentAt).format("DD-MM-YYYY");
    const showDateSeparator = lastMessageDate !== messageDate; // Önceki tarih ile karşılaştır

    // Önceki tarihi güncelle
    lastMessageDate = messageDate;

    return (
      <View>
        {showDateSeparator && (
          <Text style={styles.dateSeparator}>{messageDate}</Text>
        )}
        <MessageItem message={item} participants={participants} />
      </View>
    );
  };

  return (
    <FlatList
      ref={yourRef}
      initialNumToRender={5}
      data={messages}
      keyExtractor={(item) => item.uuid}
      renderItem={renderMessage}
    />
  );
};

export default MessageList;

const styles = StyleSheet.create({
  dateSeparator: {
    flex: 1,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});
