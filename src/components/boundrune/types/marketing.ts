export interface BlogPost {
	title: string;
	excerpt: string;
	content?: string;
	author: string;
	date: string;
	image?: string;
	tags?: string[];
}

export interface ChangelogEntry {
	version: string;
	date: string;
	changes: {
		type: "added" | "fixed" | "changed";
		description: string;
	}[];
}
