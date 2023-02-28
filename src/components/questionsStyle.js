import styled from 'styled-components';

export const CorrectAnswer = styled.button`
  text-align: center;
  padding: 0.75rem;
  border-radius: 1.5rem;
  background-color: ${(props) => {
    console.log(props);
    return props.disabled ? 'green' : '#ebecf0'}};
  &:hover{
    cursor: pointer;
  }
  &:disabled{
    cursor: default;
  }
`

export const WrongAnswer = styled.button`
  text-align: center;
  padding: 0.75rem;
  background-color: #ebecf0;
  border-radius: 1.5rem;
  &:hover{
    cursor: pointer;
  }
  &:disabled{
    cursor: default;
  }
`