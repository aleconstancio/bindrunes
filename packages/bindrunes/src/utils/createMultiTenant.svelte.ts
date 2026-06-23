import { createMetaContext, useMetaContext } from "./createMetaContext.svelte";

const KEY = Symbol("multi-tenant");

export interface Tenant {
	id: string;
	name: string;
	[key: string]: unknown;
}

export interface CreateMultiTenantOptions<T extends Tenant> {
	tenants: T[];
	defaultTenantId?: string;
	onTenantChange?: (tenant: T) => void;
}

export interface MultiTenantResult<T extends Tenant> {
	currentTenant: T | undefined;
	tenants: T[];
	setTenant: (id: string) => void;
	isCurrentTenant: (id: string) => boolean;
}

export function useMultiTenant<T extends Tenant>(
	options: CreateMultiTenantOptions<T>,
): MultiTenantResult<T> {
	const { tenants, defaultTenantId = tenants[0]?.id, onTenantChange } = options;

	let currentTenantId = $state(defaultTenantId);

	const currentTenant = $derived(tenants.find((t) => t.id === currentTenantId));

	function setTenant(id: string) {
		const tenant = tenants.find((t) => t.id === id);
		if (tenant) {
			currentTenantId = id;
			onTenantChange?.(tenant);
		}
	}

	function isCurrentTenant(id: string): boolean {
		return id === currentTenantId;
	}

	return {
		get currentTenant() {
			return currentTenant;
		},
		get tenants() {
			return tenants;
		},
		setTenant,
		isCurrentTenant,
	};
}

// Context-based version for sharing across components
export function createMultiTenantContext<T extends Tenant>(options: CreateMultiTenantOptions<T>) {
	return createMetaContext(KEY, () => useMultiTenant(options));
}

export function useMultiTenantContext<T extends Tenant>(): MultiTenantResult<T> {
	return useMetaContext(KEY);
}
