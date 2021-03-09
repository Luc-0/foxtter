import React from 'react';
import { Icon } from './StyledComponents';

export default function ProfilePicture(props) {
  return (
    <Icon
      wt="48px"
      ht="48px"
      imgUrl={
        props.imgUrl ? props.imgUrl : 'images/profile-picture-placeholder.png'
      }
    />
  );
}
