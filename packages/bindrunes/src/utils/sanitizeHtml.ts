import DOMPurify from "dompurify";

export function sanitizeHtml(html: string): string {
	if (!html) return "";
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [
			"p",
			"br",
			"strong",
			"em",
			"b",
			"i",
			"u",
			"s",
			"code",
			"pre",
			"blockquote",
			"ul",
			"ol",
			"li",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"a",
			"span",
			"div",
			"table",
			"thead",
			"tbody",
			"tr",
			"th",
			"td",
			"hr",
			"img",
		],
		ALLOWED_ATTR: ["href", "target", "rel", "class", "src", "alt", "width", "height"],
	});
}
