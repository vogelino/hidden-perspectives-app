import React from 'react';
import PropTypes from 'prop-types';
import Tour from 'reactour';
import {
	StepHeadline,
	StepContent,
	StepCloseButton,
	GlobalTourStyles,
	StepContainer,
	SkipLink,
	StepButton,
	StepImage,
} from './styles';

const FeaturesTour = ({
	accentColor,
	theme,
	steps,
	isOpen,
	onClose,
	...rest
}) => (
	<>
		<GlobalTourStyles />
		<Tour
			steps={steps.map((step, index) => ({
				...step,
				content: () => (
					<>
						{step.image && <StepImage src={step.image} />}
						<StepContainer>
							<StepCloseButton onClick={onClose}>✕</StepCloseButton>
							{step.title && <StepHeadline variant="h5">{step.title}</StepHeadline>}
							<StepContent>{step.content}</StepContent>
							{index === 0 && <SkipLink onClick={onClose}>Skip tour</SkipLink>}
							{index === steps.length - 1 && (
								<StepButton onClick={onClose} primary>Let&#39;s go!</StepButton>
							)}
						</StepContainer>
					</>
				),
			}))}
			isOpen={isOpen}
			onRequestClose={onClose}
			accentColor={accentColor}
			showNumber={false}
			rounded={4}
			closeWithMask={false}
			showCloseButton={false}
			showNavigationNumber={false}
			maskSpace={8}
			{...rest}
		/>
	</>
);

FeaturesTour.propTypes = {
	accentColor: PropTypes.string,
	borderColor: PropTypes.string,
	theme: PropTypes.shape({}).isRequired,
	steps: PropTypes.arrayOf(PropTypes.shape({
		selector: PropTypes.string,
		content: PropTypes.string.isRequired,
	})),
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};

FeaturesTour.defaultProps = {
	accentColor: undefined,
	borderColor: 'transparent',
	steps: [],
	isOpen: false,
	onClose: () => {},
};

export default FeaturesTour;
