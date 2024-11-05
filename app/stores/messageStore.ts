// app/stores/messageStore.ts
import { create } from "zustand";

import { IMessagesType, TMessage, TParticipant } from "../types";

export const useMessagesStore = create<IMessagesType>((set) => ({
  messages: [],
  setMessages: (data: TMessage[]) => set({ messages: data }),
  updateMessages: (data: TMessage) =>
    set((state: any) => ({ messages: [...state.messages, data] })),

  participants: [],
  setParticipants: (data: TParticipant[]) => set({ participants: data }),

  editedMessage: "",
  setEditedMessage: (data: string) => set({ editedMessage: data }),

  loading: true,
  setLoading: (data: boolean) => set({ loading: data }),

  modalVisible: false,
  setModalVisible: (data: boolean) => set({ modalVisible: data }),

  selectedImage: null,
  setSelectedImage: (data: string | null) => set({ selectedImage: data }),
}));
