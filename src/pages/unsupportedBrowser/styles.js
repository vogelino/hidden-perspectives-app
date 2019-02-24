import styled from 'styled-components';
import Headline from '../../components/_library/Headline';

export const Container = styled.div`
	width: 100%;
	max-width: 960px;
	margin: 0 auto;
	text-align: center;
	padding: 2vh 2rem;

	img {
		width: 6rem;
		height: 6rem;
	}
`;

export const AppTitle = styled(Headline)`
	line-height: 1.3;
	margin-bottom: 4vmax;
	padding-bottom: 4vmax;
	border-bottom: 1px solid ${({ theme }) => theme.commonBorderColor};

	font-size: 1.5vw;
	@media screen and (max-width: 1080px) {
		font-size: 2vw;
	}
	@media screen and (max-width: 600px) {
		font-size: 4vw;
	}
`;

export const Title = styled(Headline)`
	line-height: 1.3;
	font-weight: 500;
	margin-bottom: 2vmax;

	font-size: 2vw;
	@media screen and (max-width: 1080px) {
		font-size: 3vw;
	}
	@media screen and (max-width: 600px) {
		font-size: 6vw;
	}
`;

export const ButtonContainer = styled.div`
	margin-top: 2vmax;
	padding-bottom: 4vmax;
	margin-bottom: 4vmax;
	border-bottom: 1px solid ${({ theme }) => theme.commonBorderColor};
`;
