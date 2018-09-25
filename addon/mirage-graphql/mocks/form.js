import BaseMock from "ember-caluma-utils/mirage-graphql/mocks/base";
import {
  Serializer,
  Filter,
  register
} from "ember-caluma-utils/mirage-graphql";
import { MockList } from "graphql-tools";

const questionSerializer = new Serializer("Question");
const questionFilter = new Filter("Question");

export default class extends BaseMock {
  @register("ArchiveFormPayload")
  handleArchiveForm(
    _,
    {
      input: { id: slug, clientMutationId }
    }
  ) {
    const form = this.filter.find(this.collection, { slug });
    const res = this.collection.update(form.id, { isArchived: true });

    return {
      form: this.serializer.serialize(res),
      clientMutationId
    };
  }

  @register("PublishFormPayload")
  handlePublishForm(
    _,
    {
      input: { id: slug, clientMutationId }
    }
  ) {
    const form = this.filter.find(this.collection, { slug });
    const res = this.collection.update(form.id, { isPublished: true });

    return {
      form: this.serializer.serialize(res),
      clientMutationId
    };
  }

  @register("ReorderFormQuestionsPayload")
  handleReorderFormQuestions(
    root,
    {
      input: { form: slug, questions: questionSlugs, clientMutationId }
    }
  ) {
    const form = this.filter.find(this.collection, { slug });

    const questions = questionSlugs.map(slug => {
      return questionFilter.find(this.db.questions, { slug });
    });

    const res = this.collection.update(form.id, {
      questionIds: questions.map(({ id }) => id)
    });

    return {
      form: {
        ...this.serializer.serialize(res),
        questions: {
          edges: () =>
            new MockList(questions.length, () => ({
              node: (r, v, _, meta) =>
                questionSerializer.serialize(questions[meta.path.prev.key])
            }))
        }
      },
      clientMutationId
    };
  }

  @register("AddFormQuestionPayload")
  handleAddFormQuestion(
    root,
    {
      input: { form: slug, question: questionSlug, clientMutationId }
    }
  ) {
    const form = this.filter.find(this.collection, { slug });

    const question = questionFilter.find(this.db.questions, {
      slug: questionSlug
    });

    this.db.questions.update(question.id, {
      formIds: [...(question.formIds || []), form.id]
    });

    const res = this.collection.update(form.id, {
      questionIds: [...(form.questionIds || []), question.id]
    });

    const questions = res.questionIds.map(id => this.db.questions.find(id));

    return {
      form: {
        ...this.serializer.serialize(res),
        questions: {
          edges: () =>
            new MockList(questions.length, () => ({
              node: (r, v, _, meta) =>
                questionSerializer.serialize(questions[meta.path.prev.key])
            }))
        }
      },
      clientMutationId
    };
  }

  @register("RemoveFormQuestionPayload")
  handleRemoveFormQuestion(
    root,
    {
      input: { form: slug, question: questionSlug, clientMutationId }
    }
  ) {
    const form = this.filter.find(this.collection, { slug });

    const question = questionFilter.find(this.db.questions, {
      slug: questionSlug
    });

    this.db.questions.update(question.id, {
      formIds: question.formIds.filter(id => id !== form.id)
    });

    const res = this.collection.update(form.id, {
      questionIds: form.questionIds.filter(id => id !== question.id)
    });

    const questions = res.questionIds.map(id => this.db.questions.find(id));

    return {
      form: {
        ...this.serializer.serialize(res),
        questions: {
          edges: () =>
            new MockList(questions.length, () => ({
              node: (r, v, _, meta) =>
                questionSerializer.serialize(questions[meta.path.prev.key])
            }))
        }
      },
      clientMutationId
    };
  }
}
