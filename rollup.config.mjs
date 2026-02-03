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
      terser({
        format: {
          comments: false
        }
      })
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
      terser({
        format: {
          comments: false
        }
      })
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
      terser({
        format: {
          comments: false
        }
      })
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
      terser({
        format: {
          comments: false
        }
      })
    ]
  },
  {
    input: 'src/heating-cooling-card.ts',
    output: {
      file: 'dist/heating-cooling-card.js',
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
  }
];
