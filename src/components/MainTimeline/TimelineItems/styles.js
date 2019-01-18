import styled from 'styled-components';
import { EventTitleContainer } from '../TimelineElement/styles';

export const Event = styled.div`
	padding: 0;
	font-size: .875rem;
	line-height: 1.25rem;
	display: flex;
	position: relative;
`;

export const EventContainer = styled.div`
`;

export const EventDate = styled.span`
	color: ${({ theme }) => theme.gray600};
	position: absolute;
	left: 50%;
	top: 1.4rem;
	transform: translateX(-50%);
	background: white;
	z-index: 1;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	text-align: center;
	padding: 3px 0;
	font-size: 0.75rem;
`;

const Column = styled.div`
	flex: 0 0 50%;
	padding: 1.5rem;
	position: relative;
`;

export const Events = styled(Column)`
	position: static;

	${EventTitleContainer}:after {
		content: '●';
		right: auto;
		left: 0;
		transform: translate(50%,-50%);
	}
`;

export const Documents = styled(Column)`
	border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
	text-align: right;
`;

