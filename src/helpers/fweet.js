export default function fweet(
  userId,
  userName,
  userUsername,
  userProfilePictureUrl,
  fweetId,
  fweetText,
  dateCreated,
  refweets,
  replies,
  refweet
) {
  return {
    user: {
      id: userId,
      name: userName,
      username: userUsername,
      pictureUrl: userProfilePictureUrl,
    },
    id: fweetId,
    text: fweetText,
    dateCreated: dateCreated,
    refweets: refweets,
    replies: replies,
    refweet: refweet,
  };
}
