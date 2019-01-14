import {
	compose,
	withProps,
	withState,
	withHandlers,
	lifecycle,
} from 'recompose';
import { isPartlyInViewport } from './timelineUtil';

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

const defaultShouldUpdate = (props, nextProps) => Object.keys(props)
	.some((key) => props[key] !== nextProps[key]);

export const renderOnlyIfInViewport = (originalShouldUpdate = defaultShouldUpdate) => compose(
	withState('componentRef', 'setComponentRef'),
	lifecycle({
		shouldComponentUpdate(nextProps) {
			const ref = nextProps.componentRef;
			if (!isPartlyInViewport(ref)) return false;
			return originalShouldUpdate(this.props, nextProps);
		},
	}),
);
