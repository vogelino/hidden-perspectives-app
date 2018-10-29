import React from 'react';
import { mount } from 'enzyme';
import CreateForm from '.';

describe('CreateForm', () => {
	const createForm = mount(<CreateForm />);
	const find = (selector) => createForm.find(selector);
	const findLength = (selector) => find(selector).length;

	it('should render without crashing', () => {
		expect(createForm.exists()).toBe(true);
	});

	describe('Form element', () => {
		const formElement = find('form');

		it('should exist', () => {
			expect(formElement.exists()).toBe(true);
		});

		it('should have an onSubmit handler', () => {
			expect(typeof formElement.prop('onSubmit')).toBe('function');
		});

		it('should become the onSubmit prop as a handler', () => {
			expect(createForm.prop('onSubmit')).toBe(formElement.prop('onSubmit'));
		});
	});

	describe('Title input', () => {
		const titleInput = find('input[name="documentTitle"]');

		it('should exist', () => {
			expect(titleInput.exists()).toBe(true);
		});

		it('should have a placeholder', () => {
			expect(typeof titleInput.prop('placeholder')).toBe('string');
		});

		it('should have an onChange handler', () => {
			expect(typeof titleInput.prop('onChange')).toBe('function');
		});

		it('should become the onTitleChange prop as a change handler', () => {
			expect(createForm.prop('onTitleChange')).toBe(titleInput.prop('onChange'));
		});
	});

	describe('Document ID input', () => {
		const originalIdInput = find('input[name="documentOriginalId"]');

		it('should exist', () => {
			expect(originalIdInput.exists()).toBe(true);
		});

		it('should have a placeholder', () => {
			expect(typeof originalIdInput.prop('placeholder')).toBe('string');
		});

		it('should have an onChange handler', () => {
			expect(typeof originalIdInput.prop('onChange')).toBe('function');
		});

		it('should become the onOriginalIdChange prop as a change handler', () => {
			expect(createForm.prop('onOriginalIdChange')).toBe(originalIdInput.prop('onChange'));
		});
	});

	describe('Submit button', () => {
		const submitButton = find('input[type="submit"]');

		it('should exist', () => {
			expect(submitButton.exists()).toBe(true);
		});

		it('should have a value', () => {
			expect(typeof submitButton.prop('value')).toBe('string');
		});

		it('should have no onClick prop', () => {
			expect(submitButton.prop('onClick')).toBe(undefined);
		});
	});

	describe('fields and form inputs exist', () => {
		it('should habe a submit button', () => {
			expect(findLength('input[type="submit"]')).toBe(1);
		});
	});
});

