/* globals it expect */

import loader from "./componentLoader";

it("returns an object with keys when using .showcasefiles", () => {
  // mocks the showcase structure that is exported in times-components
  const mockShowcase = {
    default: {
      name: "Primitives/ArticleLabel",
      children: [
        {
          type: "story",
          name: "Article Label",
          component: () => "lol"
        }
      ]
    }
  };

  const getShowcasesObject = () => [mockShowcase];
  const loadedShowcases = loader(getShowcasesObject);
  const returnedComponent = loadedShowcases["Primitives/Article Label"]();
  expect(returnedComponent).toEqual("lol");
});

it("filters out non story showcases", () => {
  // mocks the showcase structure that is exported in times-components
  const mockShowcase = {
    default: {
      name: "Primitivesl",
      children: [
        {
          type: "not a story",
          name: "Article Label",
          component: () => "lol"
        }
      ]
    }
  };

  const getShowcasesObject = () => [mockShowcase];

  const loaded = loader(getShowcasesObject);
  expect(loaded).toEqual({});
});

it("returns showcases without a platform", () => {
  const mockShowcase = {
    default: {
      name: "Primitives",
      children: [
        {
          type: "story",
          name: "Article Label",
          component: () => "lol"
        }
      ]
    }
  };

  const getShowcasesObject = () => [mockShowcase];
  const loadedShowcases = loader(getShowcasesObject);
  const returnedComponent = loadedShowcases["Primitives/Article Label"]();
  expect(returnedComponent).toEqual("lol");
});

it("filters out showcases that don't match specified plaform", () => {
  const mockShowcase = {
    default: {
      name: "Primitives",
      children: [
        {
          platform: "native",
          type: "story",
          name: "Article Label",
          component: () => "lol"
        }
      ]
    }
  };

  const getShowcasesObject = () => [mockShowcase];

  const loaded = loader(getShowcasesObject, "web");
  expect(loaded).toEqual({});
});

it("does not explode when a showcase file has no default export", () => {
  let mockShowcase;

  const getShowcasesObject = () => [mockShowcase];

  const loaded = loader(getShowcasesObject, "web");
  expect(loaded).toEqual({});
});
