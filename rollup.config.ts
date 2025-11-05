import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig([
    {
        input: {
            index: './src/index.ts'
        },
        output: [
            {
                dir: 'lib',
                entryFileNames: '[name].js',
                format: 'esm',
                sourcemap: false,
            },
            {
                dir: 'lib',
                entryFileNames: '[name].cjs',
                format: 'cjs',
                sourcemap: false,
                exports: "named",
            },
        ],
        plugins: [
            typescript({
                include: ["src/**/*.ts"],
            }),
        ],
    },
]);
