export { TMessageAttachment, TReaction, TParticipant, TMessage, TMessageJSON };

type TMessageAttachment = {
  uuid: string;
  type: "image";
  url: string;
  width: number;
  height: number;
};

type TReaction = {
  uuid: string;
  participantUuid: string;
  value: string;
};

type TParticipant = {
  uuid: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  email?: string;
  jobTitle?: string;
  createdAt: number;
  updatedAt: number;
};

type TMessage = {
  uuid: string;
  text: string;
  attachments: TMessageAttachment[];
  replyToMessageUuid?: string;
  reactions: TReaction[];
  authorUuid: string;
  sentAt: number;
  updatedAt: number;
};

export type IMessagesType = {
  messages: TMessage[];
  setMessages: (data: TMessage[]) => void;
  updateMessages: (data: TMessage) => void;
  participants: TParticipant[];
  setParticipants: (data: TParticipant[]) => void;
  editedMessage: string;
  setEditedMessage: (data: string) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
  modalVisible: boolean;
  setModalVisible: (data: boolean) => void;
  selectedImage: string | null;
  setSelectedImage: (data: string | null) => void;
};

type TMessageJSON = Omit<TMessage, "replyToMessageUuid"> & {
  replyToMessage?: Omit<TMessage, "replyToMessageUuid">;
};
