import { withProps, compose } from 'recompose';
import Header from './Header';
import { isAuthenticated, isAuthorized } from '../../utils/localStorageUtil';

export default compose(
	withProps(() => ({
		isAuthenticated,
		isAuthorized,
	})),
)(Header);
