// DEPRECATED: This file is no longer used after migrating to Metro bundler in Expo SDK 53
// See https://github.com/akveo/react-native-ui-kitten/issues/996#issuecomment-616115469
// 
// This configuration was used when the project used Webpack for web builds.
// The project now uses Metro bundler as configured in app.json with "bundler": "metro"
//
// Keeping this file for reference but it's not loaded by Expo anymore.

// const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// module.exports = async function(env, argv) {
//     const config = await createExpoWebpackConfigAsync({
//         ...env,
//         babel: {
//             dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
//         }
//     }, argv);

//     config.module.rules.push({
//         test: /.m?js/,
//         resolve: {
//           fullySpecified: false,
//         },
//     })

//     config.resolve.alias['crypto'] = require.resolve('crypto-browserify');
//     config.resolve.alias['vm'] = require.resolve('vm-browserify');

//     return config;
// };