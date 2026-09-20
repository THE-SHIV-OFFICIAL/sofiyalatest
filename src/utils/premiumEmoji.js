'use strict';

/**
 * Telegram custom emoji are sent with an emoji-id, not with an addemoji URL.
 * The supplied pack URLs are kept as the bot's curated pack catalog, while
 * PREMIUM_EMOJI_IDS lets the owner map aliases to real custom-emoji IDs.
 *
 * Example:
 * PREMIUM_EMOJI_IDS=bot=5368324170671202286,success=5368324170671202287
 */

const PACK_LINKS = Object.freeze([
  'https://t.me/addemoji/bellazpack_by_TgEmojis_bot',
  'https://t.me/addemoji/EVERYONExKSK_by_fStikBot',
  'https://t.me/addemoji/LoveDayEmoji',
  'https://t.me/addemoji/pack_eb01d_by_TgEmojis_bot',
  'https://t.me/addemoji/DSPSIR_by_TgEmojis_bot',
  'https://t.me/addemoji/sticks_787a5_by_TgEmodziBot',
  'https://t.me/addemoji/Callmejija_by_fStikBot',
  'https://t.me/addemoji/KripanshEmojis_by_fStikBot',
  'https://t.me/addemoji/DecorationEmojiPack',
  'https://t.me/addemoji/Combative_Olive_Parrotfish_by_fStikBot',
]);

function parseIds(value) {
  const ids = {};
  for (const item of String(value || '').split(',')) {
    const [alias, id] = item.split('=').map((part) => part?.trim());
    if (alias && /^\d+$/.test(id || '')) ids[alias] = id;
  }
  return ids;
}

const IDS = parseIds(process.env.PREMIUM_EMOJI_IDS);

function has(alias) {
  return Boolean(IDS[alias]);
}

/**
 * Return a Telegram HTML custom-emoji entity. If the owner has not supplied
 * an ID yet, return an empty string instead of leaking normal Unicode emoji.
 */
function emoji(alias, fallback = '') {
  return IDS[alias] ? `<tg-emoji emoji-id="${IDS[alias]}">${fallback}</tg-emoji>` : '';
}

function decorate(text, alias) {
  const prefix = emoji(alias);
  return prefix ? `${prefix} ${String(text || '')}` : String(text || '');
}

module.exports = { PACK_LINKS, IDS, has, emoji, decorate };