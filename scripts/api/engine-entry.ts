/**
 * API engine bundle entry — esbuilt to api/_engine.js at build time so the
 * Vercel function imports ONE plain module instead of tracing the whole
 * TypeScript content tree at cold start. Underscore files never deploy as
 * endpoints; this is a library, not a function.
 */
export { CONTENT } from '../../src/content/world'
export { newGame, reduce, visibleChoices } from '../../src/engine/reduce'
export { auditedScore } from '../../src/engine/audit'
