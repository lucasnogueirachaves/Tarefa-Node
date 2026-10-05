import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src", "!src/**/*.spec.ts"],
	format: ["esm"],
	outDir: "build",
	sourcemap: true,
	shims: true,
	target: "esnext",
});
