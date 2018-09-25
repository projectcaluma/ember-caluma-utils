import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";
import gql from "graphql-tag";

module("Unit | Mirage GraphQL Mock | question", function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const form = this.server.create("form", { slug: "test-form" });

    this.server.create("question", {
      slug: "archived-question",
      type: "TEXT",
      isArchived: true
    });

    this.server.create("question", {
      slug: "search-question",
      type: "TEXT",
      label: "Blabla"
    });

    this.server.create("question", {
      slug: "exclude-form-question",
      type: "TEXT",
      formIds: [form.id]
    });

    this.apollo = this.owner.lookup("service:apollo");
  });

  test("can fetch questions", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.query({
      query: gql`
        query {
          allQuestions {
            edges {
              node {
                slug
              }
            }
          }
        }
      `
    });

    assert.deepEqual(res.allQuestions.edges, [
      {
        __typename: "QuestionEdge",
        node: {
          __typename: "TextQuestion",
          slug: "archived-question"
        }
      },
      {
        __typename: "QuestionEdge",
        node: {
          __typename: "TextQuestion",
          slug: "search-question"
        }
      },
      {
        __typename: "QuestionEdge",
        node: {
          __typename: "TextQuestion",
          slug: "exclude-form-question"
        }
      }
    ]);
  });

  test("can filter archived questions", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.query({
      query: gql`
        query {
          allQuestions(isArchived: true) {
            edges {
              node {
                slug
              }
            }
          }
        }
      `
    });

    assert.deepEqual(res.allQuestions.edges, [
      {
        __typename: "QuestionEdge",
        node: {
          __typename: "TextQuestion",
          slug: "archived-question"
        }
      }
    ]);
  });

  test("can search questions", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.query({
      query: gql`
        query {
          allQuestions(search: "Blabla") {
            edges {
              node {
                slug
              }
            }
          }
        }
      `
    });

    assert.deepEqual(res.allQuestions.edges, [
      {
        __typename: "QuestionEdge",
        node: {
          __typename: "TextQuestion",
          slug: "search-question"
        }
      }
    ]);
  });

  test("can exclude questions of a certain form", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.query({
      query: gql`
        query Questions($excludeForms: [ID]) {
          allQuestions(excludeForms: $excludeForms) {
            edges {
              node {
                slug
              }
            }
          }
        }
      `,
      variables: { excludeForms: ["test-form"] }
    });

    assert.deepEqual(res.allQuestions.edges, [
      {
        __typename: "QuestionEdge",
        node: {
          __typename: "TextQuestion",
          slug: "archived-question"
        }
      },
      {
        __typename: "QuestionEdge",
        node: {
          __typename: "TextQuestion",
          slug: "search-question"
        }
      }
    ]);
  });

  test("can add text question", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.mutate({
      mutation: gql`
        mutation {
          saveTextQuestion(
            input: { slug: "test-question", label: "Test Question" }
          ) {
            question {
              slug
              label
            }
          }
        }
      `
    });

    assert.deepEqual(res.saveTextQuestion.question, {
      __typename: "TextQuestion",
      slug: "test-question",
      label: "Test Question"
    });
  });

  test("can add textarea question", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.mutate({
      mutation: gql`
        mutation {
          saveTextareaQuestion(
            input: { slug: "test-question", label: "Test Question" }
          ) {
            question {
              slug
              label
            }
          }
        }
      `
    });

    assert.deepEqual(res.saveTextareaQuestion.question, {
      __typename: "TextareaQuestion",
      slug: "test-question",
      label: "Test Question"
    });
  });

  test("can add integer question", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.mutate({
      mutation: gql`
        mutation {
          saveIntegerQuestion(
            input: { slug: "test-question", label: "Test Question" }
          ) {
            question {
              slug
              label
            }
          }
        }
      `
    });

    assert.deepEqual(res.saveIntegerQuestion.question, {
      __typename: "IntegerQuestion",
      slug: "test-question",
      label: "Test Question"
    });
  });

  test("can add float question", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.mutate({
      mutation: gql`
        mutation {
          saveFloatQuestion(
            input: { slug: "test-question", label: "Test Question" }
          ) {
            question {
              slug
              label
            }
          }
        }
      `
    });

    assert.deepEqual(res.saveFloatQuestion.question, {
      __typename: "FloatQuestion",
      slug: "test-question",
      label: "Test Question"
    });
  });

  test("can add radio question", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.mutate({
      mutation: gql`
        mutation {
          saveRadioQuestion(
            input: { slug: "test-question", label: "Test Question" }
          ) {
            question {
              slug
              label
            }
          }
        }
      `
    });

    assert.deepEqual(res.saveRadioQuestion.question, {
      __typename: "RadioQuestion",
      slug: "test-question",
      label: "Test Question"
    });
  });

  test("can add checkbox question", async function(assert) {
    assert.expect(1);

    const res = await this.apollo.mutate({
      mutation: gql`
        mutation {
          saveCheckboxQuestion(
            input: { slug: "test-question", label: "Test Question" }
          ) {
            question {
              slug
              label
            }
          }
        }
      `
    });

    assert.deepEqual(res.saveCheckboxQuestion.question, {
      __typename: "CheckboxQuestion",
      slug: "test-question",
      label: "Test Question"
    });
  });
});
