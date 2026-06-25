import { createMetaContext, useMetaContext } from "./createMetaContext.svelte";
import {
	type CreateMultiTenantOptions,
	type MultiTenantResult,
	type Tenant,
	useMultiTenant,
} from "./useMultiTenant.svelte";

const KEY = Symbol("multi-tenant");

export function createMultiTenantContext<T extends Tenant>(options: CreateMultiTenantOptions<T>) {
	return createMetaContext(KEY, () => useMultiTenant(options));
}

export function useMultiTenantContext<T extends Tenant>(): MultiTenantResult<T> {
	return useMetaContext<T>(KEY);
}
