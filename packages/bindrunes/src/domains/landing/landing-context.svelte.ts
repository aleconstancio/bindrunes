import { createMetaContext, useMetaContext } from "../../utils/createMetaContext";

const KEY = Symbol("landing");

export interface LandingState {
	readonly billingAnnual: boolean;
	readonly activeSection: string;
	readonly menuOpen: boolean;
	setBillingAnnual(v: boolean): void;
	setActiveSection(v: string): void;
	setMenuOpen(v: boolean): void;
}

export function createLandingState(): LandingState {
	let billingAnnual = $state(false);
	let activeSection = $state("");
	let menuOpen = $state(false);

	const state = {
		get billingAnnual() {
			return billingAnnual;
		},
		get activeSection() {
			return activeSection;
		},
		get menuOpen() {
			return menuOpen;
		},
		setBillingAnnual(v: boolean) {
			billingAnnual = v;
		},
		setActiveSection(v: string) {
			activeSection = v;
		},
		setMenuOpen(v: boolean) {
			menuOpen = v;
		},
	};

	return createMetaContext(KEY, () => state);
}

export function useLanding(): LandingState {
	return useMetaContext<LandingState>(KEY);
}
