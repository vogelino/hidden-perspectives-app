import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN, USER_ID } from '../../state/constants';
import { LogButton, UserInfoContainer } from './styles';

const UserInfo = ({ userName }) => (
	<UserInfoContainer>
		{userName}
		<LogButton
			to="/"
			onClick={() => {
				localStorage.removeItem(AUTH_TOKEN);
				localStorage.removeItem(USER_ID);
			}}
		>
			{'Logout'}
		</LogButton>
	</UserInfoContainer>
);

UserInfo.propTypes = {
	userName: PropTypes.string.isRequired,
};

const USERNAME_QUERY = gql`
query getUser($id: ID!) {
  User(id: $id) {
    userName
  }
}
`;

export default () => (
	<Query query={USERNAME_QUERY} variables={{ id: localStorage.getItem(USER_ID) }}>
		{({ loading, error, data }) => {
			if (error) {
				return null;
			}
			if (loading) {
				return null;
			}
			return <UserInfo userName={data.User.userName} />;
		}}
	</Query>
);

