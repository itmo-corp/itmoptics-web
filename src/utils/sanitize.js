import sanitizeHtml from 'sanitize-html';

const sanitize = text => {
  return sanitizeHtml(text, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'acronym']),
    allowedAttributes: {
      '*': ['style'],
      a: ['href', 'name', 'target'],
      img: ['src', 'align', 'alt', 'height', 'width'],
      abbr: ['title'],
      acronym: ['title'],
      code: ['lang', 'linenumbers'],
      p: ['dir'],
    },
    allowedStyles: {
      '*': {
        'text-decoration': [/^(?:blink|line-through|overline|underline)$/],
        color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        'text-align': [/^left$/, /^right$/, /^center$/],
      },
    },
  });
};

export default sanitize;
