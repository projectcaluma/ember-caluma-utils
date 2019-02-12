import BaseMock from "ember-caluma-utils/mirage-graphql/mocks/base";
import { register } from "ember-caluma-utils/mirage-graphql";
import { classify } from "@ember/string";

export default class extends BaseMock {
  @register("Task")
  handleTask(root) {
    let taskId = root.taskId || (root.node && root.node(...arguments).id);
    let __typename = root.__typename;

    if (taskId) {
      __typename = `${classify(
        this.collection.findBy({ id: taskId }).type.toLowerCase()
      )}Task`;
    }

    return { __typename };
  }
}
