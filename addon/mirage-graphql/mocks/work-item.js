import BaseMock from "ember-caluma-utils/mirage-graphql/mocks/base";
import { register } from "ember-caluma-utils/mirage-graphql";

export default class extends BaseMock {
  @register("WorkItem")
  handleCase({ __typename }) {
    return { __typename };
  }
}
