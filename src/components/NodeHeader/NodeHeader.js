import React from 'react';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../utils/localStorageUtil';
import {
	Container,
	BackButton,
	Tabs,
	Tab,
	EditButton,
	TabsContainer,
} from './styles';


// REMOVE THE PRODUCTION CHECK WHEN YOU PLAN TO INTRODUCE SIGN UP
const isProduction = process && process.env && process.env.NODE_ENV === 'production';

const NodeHeader = ({
	tabs,
	editUrl,
	editText,
	isStatic,
}) => (
	<Container isStatic={isStatic}>
		<TabsContainer>
			<BackButton to="/" className="tour-back-to-timeline">
				<span>←</span>
				{' Back to the vertical timeline'}
			</BackButton>
			<Tabs className="tour-menu-tabs">
				{tabs.map(({ label, url }) => (
					<Tab key={label} to={url}>{label}</Tab>
				))}
			</Tabs>
			{!isProduction && isAuthenticated() && <EditButton to={editUrl}>{editText}</EditButton>}
		</TabsContainer>
	</Container>
);

NodeHeader.propTypes = {
	editUrl: PropTypes.string,
	editText: PropTypes.string,
	tabs: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	})),
	isStatic: PropTypes.bool,
};

NodeHeader.defaultProps = {
	editUrl: undefined,
	editText: '✎',
	tabs: [],
	isStatic: false,
};

export default NodeHeader;
