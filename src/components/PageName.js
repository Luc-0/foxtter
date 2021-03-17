import React from 'react';
import { FlexContainer, Span } from './StyledComponents';

export default function PageName(props) {
  return (
    <FlexContainer
      display="flex"
      className="page-name-container"
      ht="55px"
      wt="100%"
      jc="flex-start"
    >
      <Span weight="600" size="1.4em" mg="0 20px">
        {props.name}
      </Span>
    </FlexContainer>
  );
}
