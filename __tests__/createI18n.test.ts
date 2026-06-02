import { describe, it, expect, vi } from 'vitest';
import { mountComposable } from './helpers/test-wrapper.svelte';
import { createI18n } from '../src/utils/createI18n.svelte';

const testOptions = {
	default: 'en',
	dicts: {
		en: { greeting: 'Hello', farewell: 'Goodbye {name}', count: '{n} items' },
		fr: { greeting: 'Bonjour', farewell: 'Au revoir {name}' },
		de: { greeting: () => 'Hallo' },
	},
};

describe('createI18n — t()', () => {
	it('returns the correct string for an existing key in the current locale', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.t('greeting')).toBe('Hello');
	});

	it('returns the key itself when the key is missing from all locales', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.t('nonexistent')).toBe('nonexistent');
	});

	it('falls back to fallback locale when primary locale is missing a key', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		i18n.setLocale('fr');
		expect(i18n.t('count', { n: 3 })).toBe('3 items');
	});

	it('interpolates {params} in the string', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.t('farewell', { name: 'Alice' })).toBe('Goodbye Alice');
	});

	it('leaves {unknown} placeholders untouched when param is missing', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.t('farewell')).toBe('Goodbye {name}');
	});

	it('calls function-based dict entries with params', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		i18n.setLocale('de');
		expect(i18n.t('greeting')).toBe('Hallo');
	});

	it('resolves to the fallback locale when the current locale dict is missing', async () => {
		const i18n = await mountComposable(() =>
			createI18n({
				default: 'pt',
				dicts: { en: { hello: 'Hello' } },
				fallback: 'en',
			})
		);
		expect(i18n.t('hello')).toBe('Hello');
	});

	it('returns key when neither current nor fallback locale have the key', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.t('missing_key')).toBe('missing_key');
	});
});

describe('createI18n — setLocale', () => {
	it('switches the locale to a known locale', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		i18n.setLocale('fr');
		expect(i18n.locale).toBe('fr');
	});

	it('does not switch to an unknown locale', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		i18n.setLocale('es');
		expect(i18n.locale).toBe('en');
	});

	it('t() reflects the new locale after setLocale', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		i18n.setLocale('fr');
		expect(i18n.t('greeting')).toBe('Bonjour');
	});
});

describe('createI18n — locale / locales', () => {
	it('locale returns the current locale', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.locale).toBe('en');
	});

	it('locales returns all available locale keys', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.locales).toEqual(['en', 'fr', 'de']);
	});
});

describe('createI18n — edge cases', () => {
	it('handles empty params object without error', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.t('greeting', {})).toBe('Hello');
	});

	it('handles numeric param values', async () => {
		const i18n = await mountComposable(() => createI18n(testOptions));
		expect(i18n.t('count', { n: 42 })).toBe('42 items');
	});
});
