import { identity } from 'ramda';
import { graphql } from 'react-apollo';
import {
	compose,
	withProps,
	withState,
	withHandlers,
	lifecycle,
} from 'recompose';
import { getHoveredElement, setHoveredElement } from '../state/queries/hoveredElement';

export const withLoading = compose(
	withState('isLoading', 'setLoading', true),
	withHandlers({
		startLoading: ({ setLoading }) => () => setLoading(true),
		stopLoading: ({ setLoading }) => () => setLoading(false),
	}),
);

export const withErrors = compose(
	withState('errors', 'setErrors', []),
	withProps(({ errors }) => ({
		hasErrors: Boolean(errors && errors.length > 0),
	})),
);

export const getErrorHandler = ({ setErrors }) => ({ message, graphQLErrors, stack }) => {
	/* eslint-disable no-console */
	console.error(message ? [message] : graphQLErrors);
	if (stack) console.log(stack);
	/* eslint-enable no-console */
	setErrors(message ? [message] : graphQLErrors);
};

export const withoutReRender = lifecycle({
	shouldComponentUpdate() {
		return false;
	},
});

const defaultPropsMatcher = identity;

export const withHoveredElement = (propsMapper = defaultPropsMatcher) => graphql(
	getHoveredElement,
	{
		props: ({ ownProps, data: { hoveredElement }, error }) => propsMapper({
			...ownProps,
			error,
			hoveredElement,
		}),
	},
);

export const withHoveredElementSetter = (propsMapper = defaultPropsMatcher) => graphql(
	setHoveredElement,
	{
		options: ({ hoveredElement }) => ({
			variables: hoveredElement,
		}),
		props: ({ ownProps, mutate }) => propsMapper({
			...ownProps,
			setHoveredElement: (hoveredElement) => mutate(hoveredElement),
		}),
	},
);

