import config from "dummy/config/environment";
import graphqlHandler from "ember-caluma-utils/test-support/mirage";

export default function() {
  this.post(config.apollo.apiURL, graphqlHandler(), 200);
}
