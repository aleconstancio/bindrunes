import type { TFunction } from "../shared-types";
import { createMetaContext, useMetaContext } from "./createMetaContext";

const I18N_KEY = Symbol("bindrunes-i18n");

export function createI18nContext(t: TFunction) {
	return createMetaContext(I18N_KEY, () => t);
}

export function useI18n(): TFunction {
	return useMetaContext<TFunction>(I18N_KEY);
}
