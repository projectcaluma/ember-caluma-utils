import BaseMock from "ember-caluma-utils/mirage-graphql/mocks/base";
import { MockList } from "graphql-tools";
import {
  Filter,
  Serializer,
  register
} from "ember-caluma-utils/mirage-graphql";
import { classify } from "@ember/string";

const optionFilter = new Filter("Option");
const optionSerializer = new Serializer("Option");

export default class extends BaseMock {
  @register("Question")
  handleQuestion(root) {
    let questionId =
      root.questionId || (root.node && root.node(...arguments).id);
    let __typename = root.__typename;

    if (questionId) {
      __typename = `${classify(
        this.collection.findBy({ id: questionId }).type.toLowerCase()
      )}Question`;
    }

    return { __typename };
  }

  handleInterfaceType(root, vars, _, meta) {
    return this.handle.fn.call(
      this,
      root,
      { ...vars, id: root.questionId },
      _,
      meta
    );
  }

  @register("TextQuestion")
  handleTextQuestion() {
    return this.handleInterfaceType(...arguments);
  }

  @register("TextareaQuestion")
  handleTextareaQuestion() {
    return this.handleInterfaceType(...arguments);
  }

  @register("IntegerQuestion")
  handleIntegerQuestion() {
    return this.handleInterfaceType(...arguments);
  }

  @register("FloatQuestion")
  handleFloatQuestion() {
    return this.handleInterfaceType(...arguments);
  }

  @register("CheckboxQuestion")
  handleChecboxQuestion() {
    return this.handleInterfaceType(...arguments);
  }

  @register("RadioQuestion")
  handleRadioQuestion() {
    return this.handleInterfaceType(...arguments);
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
