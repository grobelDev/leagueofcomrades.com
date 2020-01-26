import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler, StyledListItem } from './styled-components';
import { useLocation } from 'react-router-dom';

const exitDuration = 250;

const SummonerListRES = props => {
  const [name, setName] = useState(props.name);
  const [cells, setCells] = useState(props.cells);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const [count, setCount] = useState(props.count);
  // NON-CUSTOM CODE
  // const messageIds = [...new Array(15).keys()];
  const [cellIds, setCellIds] = React.useState(props.cellIds);
  const [deletingId, setDeletingId] = React.useState();
  const listRef = React.useRef(null);
  const collapseHandlerRef = React.useRef(null);

  // useEffect(() => {
  //   setName(props.name);
  //   setCells(props.cells);
  //   setCellIds(props.cellIds);
  // }, [props]);

  return (
    <div>
      <StyledListItem className='p-4 text-2xl font-bold bg-gray-100'>
        {name}
        <div className='text-base font-normal'>
          Data from the last {count} games.
        </div>
      </StyledListItem>
      {loading ? (
        <div>{/* <TestSpinner /> */}</div>
      ) : (
        <ul ref={listRef}>
          {cellIds.map(id => {
            const isBeingDeleted = id === deletingId;
            const { avatar, title, message } = cells[id % cells.length];
            return (
              <ListItem
                key={id}
                // deleteItem={deleteItem}
                id={id}
                isBeingDeleted={isBeingDeleted}
                avatar={avatar}
                title={title}
                message={message}
                name={name}
                // region={region}
              />
            );
          })}
          <StyledCollapseHandler
            ref={collapseHandlerRef}
            exitDuration={exitDuration}
          />
        </ul>
      )}
    </div>
  );
};

export default SummonerListRES;

// const StyledEmailList = styled.ul``;

// const TestSpinner = styled.div`
//   border: 16px solid #f3f3f3; /* Light grey */
//   border-top: 16px solid #3498db; /* Blue */
//   border-radius: 50%;
//   width: 120px;
//   height: 120px;
//   animation: spin 2s linear infinite;

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;
