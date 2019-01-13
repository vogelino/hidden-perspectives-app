import {
	compose,
	withProps,
	withState,
	withHandlers,
	lifecycle,
} from 'recompose';

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
