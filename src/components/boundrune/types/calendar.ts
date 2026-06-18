export interface CalendarEvent {
	id: string;
	title: string;
	date: Date;
	endDate?: Date;
	description?: string;
	color?: string;
}

export interface TimeSlot {
	start: string;
	end: string;
	available: boolean;
}
