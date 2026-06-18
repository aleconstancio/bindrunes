export interface PortfolioProject {
	id: string;
	title: string;
	description: string;
	image?: string;
	tags?: string[];
	href?: string;
}

export interface CaseStudyItem {
	id: string;
	title: string;
	summary: string;
	content?: string;
	image?: string;
	results?: { label: string; value: string }[];
}
