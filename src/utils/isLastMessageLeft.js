export default function isLastMessageLeft(index, messageList, currentUserId) {
  return (index + 1 < messageList.length &&
    messageList[index + 1].from === currentUserId) ||
    index === messageList.length - 1;
}
