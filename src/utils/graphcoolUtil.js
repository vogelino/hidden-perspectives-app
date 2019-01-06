import { ucFirst } from './stringUtil';

export const formatGraphcoolEvent = ({
	id,
	eventTitle,
	eventStartDate,
	eventDescription,
}) => ({
	id,
	title: eventTitle,
	date: new Date(eventStartDate),
	summary: eventDescription,
	type: 'Event',
});

export const formatGraphcoolDocument = ({
	id,
	documentTitle,
	documentCreationDate,
	documentDescription,
	documentKind,
	documentFiles,
}) => ({
	id,
	title: documentTitle,
	date: new Date(documentCreationDate),
	summary: documentDescription,
	type: ucFirst(documentKind.name),
	thumbnailUrl: documentFiles && documentFiles.length
		? documentFiles[0].url
		: undefined,
});


