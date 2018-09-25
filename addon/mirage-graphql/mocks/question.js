import BaseMock from "ember-caluma-utils/mirage-graphql/mocks/base";
import { register } from "ember-caluma-utils/mirage-graphql";

export default class extends BaseMock {
  @register("Question")
  handle({ __typename }) {
    return { __typename };
  }

  @register("SaveTextQuestionPayload")
  handleSaveTextQuestion(_, { input }) {
    return this.handleSavePayload.fn.call(this, _, {
      input: { ...input, type: "TEXT" }
    });
  }

  @register("SaveTextareaQuestionPayload")
  handleSaveTextareaQuestion(_, { input }) {
    return this.handleSavePayload.fn.call(this, _, {
      input: { ...input, type: "TEXTAREA" }
    });
  }

  @register("SaveIntegerQuestionPayload")
  handleSaveIntegerQuestion(_, { input }) {
    return this.handleSavePayload.fn.call(this, _, {
      input: { ...input, type: "INTEGER" }
    });
  }

  @register("SaveFloatQuestionPayload")
  handleSaveFloatQuestion(_, { input }) {
    return this.handleSavePayload.fn.call(this, _, {
      input: { ...input, type: "FLOAT" }
    });
  }

  @register("SaveRadioQuestionPayload")
  handleSaveRadioQuestion(_, { input }) {
    return this.handleSavePayload.fn.call(this, _, {
      input: { ...input, type: "RADIO" }
    });
  }

  @register("SaveCheckboxQuestionPayload")
  handleSaveCheckboxQuestion(_, { input }) {
    return this.handleSavePayload.fn.call(this, _, {
      input: { ...input, type: "CHECKBOX" }
    });
  }
}
