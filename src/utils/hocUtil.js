import {
	compose,
	withProps,
	withState,
	withHandlers,
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


const observerDefaults = {
	rootMargin: '0px',
	threshold: 1,
};
export const withIntersectionObserver = (
	callbackGetter = () => () => {},
	options = observerDefaults,
) => compose(
	withProps((props) => ({
		intersectionObserver: new IntersectionObserver(
			callbackGetter(props),
			{ ...observerDefaults, ...options },
		),
	})),
);
