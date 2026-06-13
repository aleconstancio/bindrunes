import { isBrowser } from "./isBrowser";

type UseHeadOptions = {
	title?: string;
	description?: string;
	og?: {
		title?: string;
		description?: string;
		image?: string;
	};
};

function setMeta(name: string, content: string, attribute: "name" | "property" = "name") {
	if (!isBrowser) return;
	let el = document.querySelector(`meta[${attribute}="${name}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attribute, name);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}

function removeMeta(name: string, attribute: "name" | "property" = "name") {
	if (!isBrowser) return;
	const el = document.querySelector(`meta[${attribute}="${name}"]`);
	el?.remove();
}

export function useHead(options: UseHeadOptions) {
	if (!isBrowser) return;

	const previousTitle = document.title;

	if (options.title) {
		document.title = options.title;
	}

	if (options.description) {
		setMeta("description", options.description);
	}

	if (options.og) {
		if (options.og.title) setMeta("og:title", options.og.title, "property");
		if (options.og.description) setMeta("og:description", options.og.description, "property");
		if (options.og.image) setMeta("og:image", options.og.image, "property");
	}

	return () => {
		document.title = previousTitle;
		removeMeta("description");
		removeMeta("og:title", "property");
		removeMeta("og:description", "property");
		removeMeta("og:image", "property");
	};
}
