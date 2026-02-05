import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/slick-screen-cards.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
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
      terser()
    ]
  },
  {
    input: 'src/minimal-weather-card.ts',
    output: {
      file: 'dist/minimal-weather-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
    input: 'src/squircle-clock-card.ts',
    output: {
      file: 'dist/squircle-clock-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
    input: 'src/simple-climate-card.ts',
    output: {
      file: 'dist/simple-climate-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
    input: 'src/energy-flow-card.ts',
    output: {
      file: 'dist/energy-flow-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
    input: 'src/person-card.ts',
    output: {
      file: 'dist/person-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
    input: 'src/vacuum-card.ts',
    output: {
      file: 'dist/vacuum-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
    input: 'src/mower-card.ts',
    output: {
      file: 'dist/mower-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  },
  {
    input: 'src/notification-badge-card.ts',
    output: {
      file: 'dist/notification-badge-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ]
  }
];


