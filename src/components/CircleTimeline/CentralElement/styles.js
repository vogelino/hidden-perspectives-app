import styled from 'styled-components';
import PdfThumbnail from '../../PdfThumbnail';

export const Pdf = styled(PdfThumbnail)`
	margin: 0;
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
	text-align: center;

	.react-pdf__Document {
		width: 5rem;
		height: 5rem;
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
