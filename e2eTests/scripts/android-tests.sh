emulator @fructose_device -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
./node_modules/.bin/rnscl --searchDir ./e2eTests/ --pattern 'example/*.showcase.js' --outputFile e2eTests/fructose/components.js
./node_modules/.bin/react-native start --resetCache &
BUNDLER_PID=$!
./node_modules/.bin/react-native run-android --no-packager
LOGLEVEL=verbose node_modules/.bin/jest ./e2eTests/example/android.test.js --verbose  --forceExit
kill -9 $EMU_PID
kill -9 $BUNDLER_PID