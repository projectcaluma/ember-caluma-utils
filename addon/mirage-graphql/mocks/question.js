import BaseMock from "ember-caluma-utils/mirage-graphql/mocks/base";
import { MockList } from "graphql-tools";
import {
  Filter,
  Serializer,
  register
} from "ember-caluma-utils/mirage-graphql";

const optionFilter = new Filter("Option");
const optionSerializer = new Serializer("Option");

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
    const options = input.options.map(slug =>
      optionFilter.find(this.db.options, { slug })
    );
    const optionIds = options.map(({ id }) => String(id));

    const res = this.handleSavePayload.fn.call(this, _, {
      input: { ...input, options, optionIds, type: "RADIO" }
    });

    Object.assign(res.question, {
      options: {
        edges: () =>
          new MockList(options.length, () => ({
            node: (r, v, _, meta) =>
              optionSerializer.serialize(options[meta.path.prev.key])
          }))
      }
    });

    return res;
  }

  @register("SaveCheckboxQuestionPayload")
  handleSaveCheckboxQuestion(_, { input }) {
    const options = input.options.map(slug =>
      optionFilter.find(this.db.options, { slug })
    );
    const optionIds = options.map(({ id }) => String(id));

    const res = this.handleSavePayload.fn.call(this, _, {
      input: { ...input, options, optionIds, type: "CHECKBOX" }
    });

    Object.assign(res.question, {
      options: {
        edges: () =>
          new MockList(options.length, () => ({
            node: (r, v, _, meta) =>
              optionSerializer.serialize(options[meta.path.prev.key])
          }))
      }
    });

    return res;
  }
}
