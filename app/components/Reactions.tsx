import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TReaction } from "../types";

interface ReactionsProps {
  reactions: TReaction[];
}

const Reactions: React.FC<ReactionsProps> = ({ reactions }) => (
  <View style={styles.reactionsContainer}>
    {reactions.map((reaction, index) => (
      <TouchableOpacity key={index}>
        <Text style={styles.reaction}>{reaction.value}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  reactionsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  reaction: {
    marginRight: 5,
  },
});

export default Reactions;
