import styled from 'styled-components';

export const Tooltip = styled.div`
    background: ${({ theme }) => theme.primary};
    border: 1px solid white;
    border-radius: 1rem;
    font-size: .75rem;
    left: ${({ x }) => x}%;
    line-height: 1.5rem;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    padding: 3px .75rem 0 .75rem;
    pointer-events: none;
    position: absolute;
    top: ${({ y }) => y}%;
    transform: translate(-50%, -50%);
    transition: opacity 150ms ease-out;
    white-space: nowrap;
    z-index: 2;
`;
