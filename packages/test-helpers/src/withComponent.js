/* globals describe */

import stack from "callsite";
import path from "path";
import AppSnaps from "../../snapshots";
import fructoseClient from "../../client";
import log from "../../common/logger";
import rnComponentKey from "../../common/rnComponentKey";
import { assertSnapshot } from "./snapshotTest";

let client;

export const disconnectClient = () =>
  new Promise((resolve) => {
    if (typeof client === 'undefined') {
     resolve();
    } else {
      client.socket.disconnect();
      resolve();
    }
  })

export const startClient = () =>
  new Promise(resolve => {
    client = fructoseClient(7811);
    resolve(client);
  })

export default () => {
  const withComponent = (component, description, tests) => {
    let hashed;

    if (typeof client === 'undefined') {
      log.verbose("withComponent", `starting fructose client`);
      startClient();
    }

    try {
      hashed = rnComponentKey(component);
    } catch (err) {
      throw new Error(`${err} to test: ${description}`);
    }

    const testFilePath = stack()[1].getFileName();

    const loadComponent = async() =>
      client.loadComponent(hashed);

    const snapshotTest = async(platform, testname) => {
      const testDir = path.dirname(testFilePath);
      const snapsPath = `${testDir}/__snapshots__`;

      log.verbose("withComponent", `snapshot file path is : ${snapsPath}`);
      const snaps = new AppSnaps(platform, snapsPath);
      await assertSnapshot(snaps, testname);
    };

    const fructose = {
      loadComponent,
      snapshotTest
    };

    if (describe !== undefined) {
      const testName = `${description} \n with Component: ${component.props
        .fructoseID}`;
      describe(testName, () => {
        tests(fructose);
      });
    } else {
      tests(fructose);
    }
  };

  log.verbose("withComponent", "setting up withComponent Global");
  global.withComponent = withComponent;
};