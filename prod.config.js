import resolve from '@rollup/plugin-node-resolve'; 
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

const name = pkg.name;

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.esm.js', format: "esm" },
    { file: 'dist/index.min.esm.js', format: "esm", plugins: [terser()] },
    { file: 'dist/index.cjs.js', format: "cjs", name },
    { file: 'dist/index.umd.js', format: "umd",	name }
  ],
  plugins: [
	typescript({lib: ["es5", "es6", "dom"], target: "es2020",declaration: true }),
	commonjs({extensions: ['.js','ts']}),
	resolve({ browser: true }),
  ]
};
