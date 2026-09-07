const siteRoot = new URL('../', import.meta.url);

export function siteUrl(path) {
  return new URL(path, siteRoot).href;
}

export function element(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function safeUrl(value, allowMail = false) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value, siteRoot);
    return ['http:', 'https:', ...(allowMail ? ['mailto:'] : [])].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function externalLink(label, url, className = 'button button-secondary') {
  const href = safeUrl(url, true);
  if (!href) return null;
  const link = element('a', className, label);
  link.href = href;
  if (!href.startsWith('mailto:')) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  return link;
}
