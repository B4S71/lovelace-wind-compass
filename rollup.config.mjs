import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/wind-compass-card.ts',
  output: {
    file: 'dist/wind-compass-card.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    terser({
      format: {
        comments: false
      }
    })
  ]
};
