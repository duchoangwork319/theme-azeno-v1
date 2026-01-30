'use strict';

const path = require('path');
const fs = require('fs');
const cwd = process.cwd();

/**
 * Lists all .js files in the client/js folder.
 * @returns {Object} An object where keys are filenames without extensions and values are full paths.
 */
const listJSFiles = () => {
  const folderPath = path.join(cwd, 'client/js');
  try {
    const files = fs.readdirSync(folderPath, { withFileTypes: true });
    const result = {};
    files
      .filter(file => file.isFile() && file.name.endsWith('.js'))
      .forEach(file => {
        const name = path.basename(file.name, path.extname(file.name));
        result[name] = path.join(folderPath, file.name);
      });
    return result;
  } catch (error) {
    console.error(`Error reading folder: ${error.message}`);
    throw error;
  }
};

module.exports = [
  {
    mode: 'production',
    entry: listJSFiles(),
    output: {
      path: path.join(cwd, 'assets'),

      // use [name] to create a js file for each entry point
      filename: '[name].js',

      // assetModuleFilename for assets like fonts and images
      assetModuleFilename: '[name][ext]'
    },
    ignoreWarnings: [/./],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true
            }
          }
        }
      ]
    },
    target: ['web', 'es5']
  }
];
