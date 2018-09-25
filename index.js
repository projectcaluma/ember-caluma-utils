"use strict";

const Funnel = require("broccoli-funnel");
const mergeTrees = require("broccoli-merge-trees");
const path = require("path");

module.exports = {
  name: require("./package").name,

  options: {
    babel: {
      // Use babel 7 plugins with ember-cli-babel 7.x as soon as
      // https://github.com/ef4/ember-auto-import/issues/119 is resolved
      plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]
    }
  },

  treeForApp(appTree) {
    const trees = [appTree];

    const mirageDir = path.join(__dirname, "addon-mirage-support");
    const mirageTree = new Funnel(mirageDir, { destDir: "mirage" });
    trees.push(mirageTree);

    return mergeTrees(trees);
  }
};
