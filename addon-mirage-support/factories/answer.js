import { Factory, faker } from "ember-cli-mirage";

export default Factory.extend({
  afterCreate(answer) {
    if (!answer.question) {
      return;
    }

    if (["TEXT", "TEXTAREA"].includes(answer.question.type)) {
      answer.update({ type: "STRING", value: faker.lorem.sentence() });
    } else if (answer.question.type === "INTEGER") {
      answer.update({
        type: "INTEGER",
        value: faker.random.number({
          min: answer.question.minValue,
          max: answer.question.maxValue
        })
      });
    } else if (answer.question.type === "FLOAT") {
      answer.update({
        type: "FLOAT",
        value: faker.random.number({
          min: answer.question.minValue,
          max: answer.question.maxValue,
          precision: 0.1
        })
      });
    } else if (answer.question.type === "CHECKBOX") {
      answer.update({
        type: "LIST",
        value: [faker.random.arrayElement(answer.question.options.models).slug]
      });
    } else if (answer.question.type === "RADIO") {
      answer.update({
        type: "STRING",
        value: faker.random.arrayElement(answer.question.options.models).slug
      });
    }
  }
});
