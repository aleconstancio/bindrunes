import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStorage } from "../utils/createStorage";

describe("createStorage", () => {
	let storage: ReturnType<typeof createStorage>;

	beforeEach(() => {
		localStorage.clear();
		storage = createStorage("test");
	});

	it("get returns null for missing key", () => {
		expect(storage.get("missing")).toBeNull();
	});

	it("set and get round-trips a string value", () => {
		storage.set("name", "Alice");
		expect(storage.get("name")).toBe("Alice");
	});

	it("set and get round-trips an object value", () => {
		storage.set("config", { theme: "dark", lang: "pt" });
		expect(storage.get("config")).toEqual({ theme: "dark", lang: "pt" });
	});

	it("set and get round-trips a number value", () => {
		storage.set("count", 42);
		expect(storage.get("count")).toBe(42);
	});

	it("remove deletes the key", () => {
		storage.set("temp", "value");
		storage.remove("temp");
		expect(storage.get("temp")).toBeNull();
	});

	it("clear removes only prefixed keys", () => {
		storage.set("a", 1);
		storage.set("b", 2);
		localStorage.setItem("other_key", "keep");
		storage.clear();
		expect(storage.get("a")).toBeNull();
		expect(storage.get("b")).toBeNull();
		expect(localStorage.getItem("other_key")).toBe("keep");
	});

	it("keys are prefixed correctly", () => {
		storage.set("x", "val");
		expect(localStorage.getItem("test_x")).toBe('"val"');
	});

	it("get returns null for malformed JSON", () => {
		localStorage.setItem("test_bad", "{invalid json");
		expect(storage.get("bad")).toBeNull();
	});
});
