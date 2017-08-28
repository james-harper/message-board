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
