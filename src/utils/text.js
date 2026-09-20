'use strict';

function stripStandardEmoji(value) {
  if (value == null) return value;
  return String(value)
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[\uFE0F\u200D]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

module.exports = { stripStandardEmoji };