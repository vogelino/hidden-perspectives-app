import React from 'react';
import PropTypes from 'prop-types';
import MetadataRow from '../_library/MetadataRow';
import Fieldset from '../_library/Fieldset';
import LoadingIndicator from '../LoadingIndicator';
import { LoadingContainer } from '../LoadingIndicator/styles';
import { Container, Content } from './styles';

const defaultValueComponent = ({ value }) => value;

const MetadataView = ({ data, isLoading }) => (
	<Container>
		<Content>
			<LoadingContainer isLoading={isLoading}>
				<LoadingIndicator />
			</LoadingContainer>
			{data.map(({ values, groupLabel }) => (
				<Fieldset title={groupLabel} key={groupLabel}>
					{values.map(({ label, ValueComponent = defaultValueComponent, value }) => (
						<MetadataRow key={label} label={label}>
							{Array.isArray(value)
								? value.map(({ name, ...props }) => (
									<ValueComponent
										{...props}
										key={name}
										value={name}
									/>
								)) : <ValueComponent value={value} />}
						</MetadataRow>
					))}
				</Fieldset>
			))}
		</Content>
	</Container>
);

MetadataView.propTypes = {
	isLoading: PropTypes.bool,
	data: PropTypes.arrayOf(PropTypes.shape({
		groupLabel: PropTypes.string.isRequired,
		values: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string.isRequired,
			ValueComponent: PropTypes.oneOfType([
				PropTypes.element,
				PropTypes.func,
			]),
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.array,
				PropTypes.shape({}),
			]).isRequired,
		})).isRequired,
	})),
};

MetadataView.defaultProps = {
	isLoading: true,
	data: [],
};

export default MetadataView;
