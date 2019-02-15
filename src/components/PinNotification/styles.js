import styled from 'styled-components';

export const Container = styled.div`
    background-color: ${({ theme }) => theme.primary};
    border-radius: 2rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.1);
    color: white;
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
    font-size: .875rem;
    line-height: 1.5rem;
    overflow: hidden;
    padding: 0.4rem 2.5rem 0.2rem 2.75rem;
    position: absolute;
    right: ${({ alignRight }) => (alignRight ? '0' : '50%')};
    text-align: center;
    top: ${({ alignRight }) => (alignRight ? '1' : '0.5')}rem;
    transform: translateX(-50%);
    transform: translateX(${({ alignRight }) => (alignRight ? '0' : '50%')});
    z-index: 11;
`;

export const IconWrapper = styled.span`
    background: rgba(255,255,255,.1);
    border-right: 1px solid rgba(255,255,255,.2);
    height: 2.2rem;
    left: 0;
    padding-left: 4px;
    padding-top: 7px;
    position: absolute;
    top: 0;
    width: 2rem;
`;

export const Title = styled.div`
    display: inline-block;
    white-space: nowrap;
`;

export const CloseButton = styled.div`
    content: '✕';
    cursor: pointer;
    height: 2rem;
    font-weight: bold;
    line-height: 2.15rem;
    padding-right: 4px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    user-selection: none;
    width: 2rem;

    &:hover {
        background: rgba(255,255,255,.1);
    }
`;
