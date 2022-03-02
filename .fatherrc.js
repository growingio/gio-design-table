const LessPluginImportNodeModules = require('less-plugin-import-node-modules');
export default {
  cjs: 'babel',
  entry: 'src/index.ts',
  esm: 'babel',
  extractCSS: true,
  file: 's2-table',
  lessInBabelMode: { plugins: [new LessPluginImportNodeModules()] },
  runtimeHelpers: true,
  umd: {
    globals: {
      react: 'React',
    },
    minFile: true,
    sourcemap: false,
  },
};
