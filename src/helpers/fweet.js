export default function fweet(
  userId,
  userName,
  userUsername,
  userProfilePictureUrl,
  fweetId,
  fweetText,
  dateCreated,
  refweets,
  replies
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
  };
}
