import ts from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    ts(),
    terser(),
    json(),
    nodeResolve({
      preferBuiltins: false,
      browser: true
    }),
  ],
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    },
    {
      file: 'dist/umd.js',
      format: 'iife'
    }
  ]
}