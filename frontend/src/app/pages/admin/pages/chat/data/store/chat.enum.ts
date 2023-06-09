export enum ChatActionsEnum {
  LOAD_USERS = '[Chat] loads user',
  LOAD_USERS_SUCCESS = '[Chat] load users success',
  LOAD_USERS_FAILED = '[Chat] load users failed',
  LOAD_RECIPIENT_SUCCESS = '[Chat] load recipient success',
  LOAD_RECIPIENT_FAILED = '[Chat] load recipient failed',
  CREATE_CHAT = '[Chat] create chat',
  DESTROY_CHAT = '[Chat] destroy chat',
  RECEIVE_MESSAGE_THREAD = '[Chat] Receive Message Thread',
  NEW_MESSAGE = '[Chat] new message',
  UPDATED_GROUP = '[Chat] Update Group',
  SEND_MESSAGE = '[Chat] Send Message',
  SEND_MESSAGE_SUCCESS = '[Chat] Send Message Success',
  SEND_MESSAGE_FAILED = '[Chat] Send Message Failed',
  SET_RECIPIENT = '[Chat] Set recipient',
  DELETE_MESSAGE = '[Chat] Delete Message',
  DELETE_MESSAGE_SUCCESS = '[Chat] Delete Message Success',
  DELETE_MESSAGE_FAILED = '[Chat] Delete Message Failed',
  MESSAGE_DELETED = '[Chat] Message deleted',
}
