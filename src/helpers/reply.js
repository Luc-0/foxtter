export default function reply(
  fweetId,
  fweetUserId,
  name,
  username,
  pictureUrl,
  text,
  dateCreated
) {
  return {
    fweetId,
    fweetUserId,
    name,
    username,
    pictureUrl,
    text,
    dateCreated,
  };
}
