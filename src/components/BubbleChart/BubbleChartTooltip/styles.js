import styled from 'styled-components';

export const Tooltip = styled.div`
    background: ${({ theme }) => theme.primary};
    // border-radius: 1rem;
    font-size: .875rem;
    left: ${({ x }) => x}px;
    line-height: 1.5rem;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    // padding: 0 .75rem;
    pointer-events: none;
    position: absolute;
    top: ${({ y }) => y}px;
    // transform: translate(-50%, -50%);
    transition: opacity 150ms ease-out;
    white-space: no-wrap;
    z-index: 2;
`;
