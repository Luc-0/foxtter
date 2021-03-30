export default function reply(
  fweetId,
  fweetUserId,
  name,
  username,
  pictureUrl,
  text,
  dateCreated,
  to = null
) {
  return {
    fweetId,
    fweetUserId,
    name,
    username,
    pictureUrl,
    text,
    dateCreated,
    to,
  };
}
