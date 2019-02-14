import BaseMock from "ember-caluma-utils/mirage-graphql/mocks/base";
import { register } from "ember-caluma-utils/mirage-graphql";
import { classify } from "@ember/string";
import { atob } from "ember-caluma-utils/helpers/atob";
import { camelize, dasherize } from "@ember/string";
import { MockList } from "graphql-tools";

export default class extends BaseMock {
  @register("Task")
  handleTask(root, vars) {
    const serialized = this.handle.fn.call(this, root, vars);

    let taskId = root.taskId || (root.node && root.node(...arguments).id);
    let __typename = root.__typename;

    if (taskId) {
      __typename = `${classify(
        this.collection.findBy({ id: taskId }).type.toLowerCase()
      )}Task`;
    }

    return { ...serialized, __typename };
  }

  handleInterfaceType(root, vars, _, meta) {
    return this.handle.fn.call(
      this,
      root,
      { ...vars, id: root.taskId },
      _,
      meta
    );
  }

  @register("SimpleTask")
  handleSimpleTask() {
    return this.handleInterfaceType(...arguments);
  }

  @register("CompleteWorkflowForm")
  handleCompleteWorkflowForm() {
    return this.handleInterfaceType(...arguments);
  }

  @register("CompleteTaskForm")
  handleCompleteTaskForm() {
    return this.handleInterfaceType(...arguments);
  }
}
