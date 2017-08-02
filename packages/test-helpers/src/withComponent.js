/* globals describe beforeEach beforeAll afterAll */
import Client from "../../client";
import log from "npmlog";

const client = Client(7811);
log.verbose("client socket", client.socket);
export default ()  => {
  const withComponent = (component, description, tests) => {
    const hashed = JSON.stringify(component);

    const loadComponent = async () => {
        return await client.loadComponent(hashed).then( () => log.verbose('loadComponent', hashed))
    }
    
    const disconnect = async () => {
      client.disconnect();
    }

    const fructose = {};
    fructose.loadComponent = loadComponent;
    fructose.disconnect = disconnect;
    if (describe !== undefined) {
      describe(`withComponent: description`, () => {
        tests(fructose);
      });
    } else {
      tests(fructose);
    }
  };

  global.withComponent = withComponent;
};
