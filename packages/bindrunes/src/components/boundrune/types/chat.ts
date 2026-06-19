export interface ChatMessage {
	id: string;
	content: string;
	sender: string;
	timestamp: Date;
	avatar?: string;
	avatarFallback?: string;
}

export interface Conversation {
	id: string;
	name: string;
	lastMessage?: string;
	unreadCount?: number;
	avatar?: string;
	avatarFallback?: string;
}
