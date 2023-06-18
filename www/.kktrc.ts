import path from 'path';
import webpack from 'webpack';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import { mdCodeModulesLoader } from 'markdown-react-code-preview-loader';
import pkg from './package.json';

export default (conf: WebpackConfiguration, env: 'production' | 'development', options: LoaderConfOptions) => {
  conf = rawModules(conf, env, { ...options });
  conf = mdCodeModulesLoader(conf);
  conf = scopePluginOptions(conf, env, {
    ...options,
    allowedFiles: [path.resolve(process.cwd(), 'README.md')],
  });
  // Get the project version.
  conf.plugins!.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
  );
  conf.module!.exprContextCritical = false;
  if (env === 'production') {
    conf.output = { ...conf.output, publicPath: './' };
    conf.optimization = {
      ...conf.optimization,
      splitChunks: {
        automaticNameDelimiter: '.',
        maxSize: 500000,
        minSize: 100000,
        cacheGroups: {
          reactvendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            reuseExistingChunk: true,
            chunks: 'all',
            priority: -10,
          },
          refractor: {
            test: /[\\/]node_modules[\\/](refractor)[\\/]/,
            name: 'refractor-prismjs-vendor',
            chunks: 'all',
          },
        },
      },
    };
  }
  return conf;
};
