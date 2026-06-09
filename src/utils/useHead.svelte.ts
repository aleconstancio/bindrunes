type UseHeadOptions = {
  title?: string;
  description?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useHead(options: UseHeadOptions) {
  if (typeof window === 'undefined') return;

  if (options.title) {
    document.title = options.title;
  }

  if (options.description) {
    setMeta('description', options.description);
  }

  if (options.og) {
    if (options.og.title) setMeta('og:title', options.og.title, 'property');
    if (options.og.description) setMeta('og:description', options.og.description, 'property');
    if (options.og.image) setMeta('og:image', options.og.image, 'property');
  }
}
