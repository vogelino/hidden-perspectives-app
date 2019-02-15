import styled from 'styled-components';

export const Container = styled.div`
    background-color: ${({ theme }) => theme.primary};
    border-radius: 1.5rem;
    color: white;
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
    font-size: .875rem;
    left: 50%;
    line-height: 1.4rem;
    padding: 0.4rem 1rem 0.2rem 2rem;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(-50%);
    z-index: 11;
`;

export const IconWrapper = styled.span`
    left: 0.6rem;
    position: absolute;
    top: 6px;
`;
export const Title = styled.div`
    display: inline-block;
    white-space: nowrap;
`;
