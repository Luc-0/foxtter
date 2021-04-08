import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FlexContainer, TabItem } from './StyledComponents';

export default function TabList({ items }) {
  const [prevSelectedItem, setPrevSelectedItem] = useState(undefined);
  const dataId = 'tabItem';

  return (
    <FlexContainer>
      {items
        ? items.map((item) => {
            let initialClassName = '';

            if (item.selected) {
              initialClassName = 'selected';
            }

            if (item.to) {
              return (
                <TabItem
                  key={item.to}
                  className={initialClassName}
                  data-tabid={dataId}
                  onClick={handleSelect}
                  as={Link}
                  to={item.to}
                >
                  {item.text}
                </TabItem>
              );
            }

            return (
              <TabItem
                key={item.text}
                className={initialClassName}
                data-tabid={dataId}
                onClick={handleSelect}
              >
                {item.text}
              </TabItem>
            );
          })
        : null}
    </FlexContainer>
  );

  function handleSelect(e) {
    const target = e.target;

    // Remove initial class
    if (prevSelectedItem === undefined) {
      const parentElement = target.parentElement;
      const childNodes = parentElement.childNodes;

      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].classList.contains('selected')) {
          childNodes[i].classList.remove('selected');
        }
      }
    }

    if (!target.dataset || !target.dataset.tabid === dataId) {
      return;
    }

    if (target.classList.contains('selected')) {
      return;
    }

    if (prevSelectedItem) {
      prevSelectedItem.classList.remove('selected');
    }

    target.classList.add('selected');
    setPrevSelectedItem(target);
  }
}
