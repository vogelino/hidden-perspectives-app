import styled from 'styled-components';

export const Container = styled.div`
    background-color: ${({ theme }) => theme.primaryLight};
    border-radius: 2rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.1);
    color: ${({ theme }) => theme.primaryDark};
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
    font-size: .875rem;
    line-height: 1.5rem;
    overflow: hidden;
    padding: 0.4rem 2.5rem 0.2rem 2.75rem;
    position: relative;
    text-align: center;
`;

export const IconWrapper = styled.span`
    background: ${({ theme }) => theme.primaryDark10};
    border-right: 1px solid ${({ theme }) => theme.primaryDark25};
    height: 2.2rem;
    left: 0;
    padding-left: 5px;
    padding-top: 7px;
    position: absolute;
    top: 0;
    width: 2rem;
`;

export const Title = styled.div`
    display: inline-block;
    white-space: nowrap;
`;

export const ItemLink = styled.a`
    color: ${({ theme }) => theme.primaryDark};
    cursor: pointer;
    display: inline-block;

	&:hover ${Title} {
		text-decoration: underline;
	}
`;

export const CloseButton = styled.div`
    content: '✕';
    cursor: pointer;
    height: 2rem;
    font-weight: bold;
    line-height: 2.15rem;
    padding-right: 3px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    user-selection: none;
    width: 2rem;

    &:hover {
        background: ${({ theme }) => theme.primaryDark10};
    }
`;
