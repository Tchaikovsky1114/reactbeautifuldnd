import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { StringMappingType } from 'typescript';
import DraggableCard from './DraggableCard';
import { ITodo, toDoState } from '../atom';
import { useSetRecoilState } from 'recoil';

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;

  background-color: #d9a21b;
  border-radius: 10px;
  min-height: 300px;
  min-width: 300px;
  gap: 10px;
  margin: 15px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
`;
const Area = styled.div<IAreaProps>`
  margin: 10px 3px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#F9F871'
      : props.isdraggingFromThis
      ? '#9BB0A5'
      : '#E1F1FF'};
  flex-grow: 1;
  transition: all 0.3s;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 90%;
  }
`;
interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}
interface IAreaProps {
  isDraggingOver: boolean;
  isdraggingFromThis: boolean;
}
interface IForm {
  toDo: string;
}
const Board = ({ toDos, boardId }: IBoardProps) => {
  const { register, setError, setValue, setFocus, formState, handleSubmit } =
    useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isdraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, idx) => (
              <DraggableCard
                key={toDo.id}
                idx={idx}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
