import styled from 'styled-components';

export const BubblesWrapper = styled.div`
    border: 1px solid green;
    border-radius: 50%;
    height: ${({ diameter }) => diameter}px;
    left: 0;
    position: absolute;
    top: 0;
    width: ${({ diameter }) => diameter}px;
`;

export const Bubble = styled.div`
    border: 1px solid red;
    border-radius: 50%;
    height: ${({ r }) => r * 2}px;
    left: ${({ x }) => x}px;
    position: absolute;
    top: ${({ y }) => y}px;
    transform: translate(-50%, -50%);
    width: ${({ r }) => r * 2}px;
`;
