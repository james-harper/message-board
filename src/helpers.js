/**
 * Twemoji library is used so that emojis display consitently across browsers *ahem*EDGE
 */
export const emojify = (text, height = 26) => {
  if (!text) return;

  return twemoji.parse(text, {
    attributes() {
      return {
        style: `height: ${height}px; padding-top:10px`
      }
    },
    callback: (icon, options) => {
      return `https://d1j8pt39hxlh3d.cloudfront.net/emoji/emojione/3.1/png/128/${icon}.png`;
      // return `${options.base}svg/${icon}.svg`;
    }
  });
};

/**
 * Convert a url into a hyperlink
 *
 * @param {string} text
 * @param {boolean} openExternal Determine if the link should open in a new tab
 * @returns {string} The url wrapped in an <a> tag
 */
export const linkify = (text, openExternal = false) => text.replace(
  /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
  `<a href="$1" ${openExternal ? 'target="_blank"' : ''}>$1</a>`
);

/**
 * Convert line breaks to <br> tags
 * @param {string} text
 * @returns {string}
 */
export const convertLineBreaks = text => text.replace(/\n/g, '<br>');
