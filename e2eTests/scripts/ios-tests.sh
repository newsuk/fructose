#!/bin/bash
xcrun simctl boot 'iPhone 7'
./node_modules/.bin/rnscl --searchDir ./e2eTests/ --pattern 'example/ios.showcase.js' --outputFile e2eTests/fructose/components.js
./node_modules/.bin/react-native start --resetCache &
./node_modules/.bin/react-native run-ios --no-packager
LOGLEVEL=verbose node_modules/.bin/jest ./e2eTests/example/ios.test.js --verbose --setupTestFrameworkScriptFile ./e2eTests/fructose/setup.native.js  --forceExit
