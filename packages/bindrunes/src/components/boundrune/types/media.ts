export interface MediaItem {
	id: string;
	url: string;
	type: "image" | "video" | "audio";
	name?: string;
	thumbnail?: string;
}
