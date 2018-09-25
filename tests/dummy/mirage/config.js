import config from "dummy/config/environment";
import graphqlHandler from "ember-caluma-utils/mirage-graphql";

export default function() {
  this.post(config.apollo.apiURL, graphqlHandler(this), 200);
}
