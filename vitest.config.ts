import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		dir: 'src',
		coverage: {
			provider: 'v8',
		},
	},
});
