import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PdfThumbnail from '../../PdfThumbnail';

export const Pdf = styled(PdfThumbnail)`
	margin: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: calc(5rem - 6px);
	height: calc(5rem - 6px);
	border: none;
`;

export const Circle = styled.div`
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	border: 3px solid ${({ theme }) => theme.primary};
	background-color: ${({ theme }) => theme.primary};
	color: white;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	background-size: cover;
	background-position: center center;
	padding: .75rem 1rem;
	text-align: center;

	.react-pdf__Document {
		width: calc(5rem - 6px);
		height: calc(5rem - 6px);
		position: relative;
	}

	.react-pdf__Page {
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: 50% 50%;
		transform: translate(-50%, -50%) scale(.8);
		width: 10rem;
	}
`;

export const Link = styled(NavLink)`
`;
