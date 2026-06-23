import { describe, expect, it, vi } from "vitest";
import { useMultiTenant } from "./createMultiTenant.svelte";

describe("useMultiTenant", () => {
	const tenants = [
		{ id: "t1", name: "Tenant 1" },
		{ id: "t2", name: "Tenant 2" },
		{ id: "t3", name: "Tenant 3" },
	];

	it("initializes with first tenant by default", () => {
		const mt = useMultiTenant({ tenants });
		expect(mt.currentTenant?.id).toBe("t1");
	});

	it("initializes with specified default tenant", () => {
		const mt = useMultiTenant({ tenants, defaultTenantId: "t2" });
		expect(mt.currentTenant?.id).toBe("t2");
	});

	it("setTenant changes current tenant", () => {
		const mt = useMultiTenant({ tenants });
		mt.setTenant("t3");
		expect(mt.currentTenant?.id).toBe("t3");
	});

	it("setTenant calls onTenantChange", () => {
		const onChange = vi.fn();
		const mt = useMultiTenant({ tenants, onTenantChange: onChange });
		mt.setTenant("t2");
		expect(onChange).toHaveBeenCalledWith(tenants[1]);
	});

	it("setTenant ignores invalid id", () => {
		const mt = useMultiTenant({ tenants });
		mt.setTenant("invalid");
		expect(mt.currentTenant?.id).toBe("t1");
	});

	it("isCurrentTenant returns correct value", () => {
		const mt = useMultiTenant({ tenants });
		expect(mt.isCurrentTenant("t1")).toBe(true);
		expect(mt.isCurrentTenant("t2")).toBe(false);
	});

	it("tenants list is accessible", () => {
		const mt = useMultiTenant({ tenants });
		expect(mt.tenants).toHaveLength(3);
	});
});
