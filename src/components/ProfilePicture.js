import React from 'react';
import { Container, Icon } from './StyledComponents';

export default function ProfilePicture(props) {
  return (
    <Container
      className="profile-picture-container"
      border={props.border}
      wt={props.width ? props.width : '48px'}
      ht={props.height ? props.height : '48px'}
    >
      <Icon
        wt={props.width ? props.width : '48px'}
        ht={props.height ? props.height : '48px'}
        imgUrl={
          props.imgUrl
            ? props.imgUrl
            : '/images/profile-picture-placeholder.png'
        }
      />
    </Container>
  );
}
