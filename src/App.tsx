import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atom';
import DraggableCard from './components/DraggableCard';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin: 5px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // which means is we moved same droppable area
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        //this is object that i want to move //
        const taskObj = boardCopy[source.index];
        // 1) Delete item on source.index : it say to our lotation of item
        boardCopy.splice(source.index, 1);
        // 2) put back the item on the destination.indext
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
