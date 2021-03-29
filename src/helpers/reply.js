export default function reply(
  replyId,
  userId,
  name,
  username,
  pictureUrl,
  text,
  dateCreated
) {
  return {
    replyId,
    userId,
    name,
    username,
    pictureUrl,
    text,
    dateCreated,
  };
}
