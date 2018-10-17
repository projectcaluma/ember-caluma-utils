import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";
import gql from "graphql-tag";

module("Unit | Mirage GraphQL Mock | answer", function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const { id: formId } = this.server.create("form", { slug: "test-form" });
    const { id: documentId } = this.server.create("document", {
      formId: formId
    });

    const textQuestion = this.server.create("question", {
      type: "TEXT",
      formIds: [formId]
    });
    const textareaQuestion = this.server.create("question", {
      type: "TEXTAREA",
      formIds: [formId]
    });
    const integerQuestion = this.server.create("question", {
      type: "INTEGER",
      formIds: [formId]
    });
    const floatQuestion = this.server.create("question", {
      type: "FLOAT",
      formIds: [formId]
    });
    const checkboxQuestion = this.server.create("question", {
      type: "CHECKBOX",
      formIds: [formId]
    });
    const radioQuestion = this.server.create("question", {
      type: "RADIO",
      formIds: [formId]
    });

    this.textAnswer = this.server.create("answer", {
      questionId: textQuestion.id,
      documentId
    });
    this.textareaAnswer = this.server.create("answer", {
      questionId: textareaQuestion.id,
      documentId
    });
    this.integerAnswer = this.server.create("answer", {
      questionId: integerQuestion.id,
      documentId
    });
    this.floatAnswer = this.server.create("answer", {
      questionId: floatQuestion.id,
      documentId
    });
    this.checkboxAnswer = this.server.create("answer", {
      questionId: checkboxQuestion.id,
      documentId
    });
    this.radioAnswer = this.server.create("answer", {
      questionId: radioQuestion.id,
      documentId
    });

    this.apollo = this.owner.lookup("service:apollo");
  });

  test("can fetch answers (via documents)", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.query({
      query: gql`
        query {
          allDocuments {
            edges {
              node {
                id
                answers {
                  edges {
                    node {
                      ... on StringAnswer {
                        stringValue: value
                      }
                      ... on IntegerAnswer {
                        integerValue: value
                      }
                      ... on FloatAnswer {
                        floatValue: value
                      }
                      ... on ListAnswer {
                        listValue: value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    });

    assert.deepEqual(res.allDocuments.edges[0].node.answers.edges, [
      {
        __typename: "AnswerEdge",
        node: {
          __typename: "StringAnswer",
          stringValue: this.textAnswer.value
        }
      },
      {
        __typename: "AnswerEdge",
        node: {
          __typename: "StringAnswer",
          stringValue: this.textareaAnswer.value
        }
      },
      {
        __typename: "AnswerEdge",
        node: {
          __typename: "IntegerAnswer",
          integerValue: this.integerAnswer.value
        }
      },
      {
        __typename: "AnswerEdge",
        node: {
          __typename: "FloatAnswer",
          floatValue: this.floatAnswer.value
        }
      },
      {
        __typename: "AnswerEdge",
        node: {
          __typename: "ListAnswer",
          listValue: this.checkboxAnswer.value
        }
      },
      {
        __typename: "AnswerEdge",
        node: {
          __typename: "StringAnswer",
          stringValue: this.radioAnswer.value
        }
      }
    ]);
  });
});
