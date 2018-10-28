import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
	width: 100%;
	height: 40px;
	position: fixed;
	top: 0;
	left: 0;
	background: black;
	text-align: center;
`;

export const HeaderLink = styled(Link)`
	border: none;
	background: none;
	color: white;
	font-family: inherit;
	font-size: 18px;
	line-height: 18px;
	padding: 11px 16px;
	margin-right: 8px;
	display: inline-block;
	cursor: pointer;
	outline: none;
	text-decoration: none;

	&:hover {
		background: white;
		color: black;
	}

	&:focus {
		text-decoration: underline;
	}
`;

export const LogButton = styled(HeaderLink)`
	float: right;
`;

