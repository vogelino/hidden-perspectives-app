import styled from 'styled-components';
import LibraryButton from '../_library/Button';

export const Container = styled.div`
	position: relative;
	width: 100%;
	min-height: calc(100vh - 4.5rem);
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.gray200};
`;

export const FormWrapper = styled.div`
	flex: 0 1 28rem;
`;

export const AlertsContainer = styled.div`
	margin-bottom: 2rem;

	& > div {
		padding: 1rem 1.25rem .75rem;
	}
`;

export const Button = styled(LibraryButton)`
	float: right;
	margin-left: 1rem;
`;
