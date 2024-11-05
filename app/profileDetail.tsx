import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useMessagesStore } from "./stores/messageStore";
import { TMessage, TParticipant } from "./types";
import { useLocalSearchParams } from "expo-router";
import ImageModal from "./components/ImageModal";
import { useState } from "react";

const ProfileDetail = () => {
  const [selectedProfileImage, setSelectedProfileImage] = useState<
    string | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { uuid } = useLocalSearchParams();
  const { participants } = useMessagesStore();

  const author = participants.find((p) => p.uuid === uuid);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedProfileImage(author?.avatarUrl || "");
              setModalVisible(true);
            }}
          >
            <Image
              source={{ uri: author?.avatarUrl || "" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {author?.name}
            </Text>
            <Text style={{ marginVertical: 2, color: "white" }}>
              {author?.jobTitle}
            </Text>
            <Text style={{ fontStyle: "italic", color: "white" }}>
              {author?.email}
            </Text>
          </View>
        </View>
        <ImageModal
          imageUrl={selectedProfileImage}
          onClose={() => setModalVisible(false)}
          modalVisible={modalVisible}
          loadingImage={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 10,
  },
});
