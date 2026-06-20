import type { Component } from "svelte";

export interface SettingsTab {
	id: string;
	label: string;
	icon?: Component | string;
}
