import { Factory, faker } from "ember-cli-mirage";

const TYPES = ["TEXT", "TEXTAREA", "INTEGER", "FLOAT", "CHECKBOX", "RADIO"];

export default Factory.extend({
  slug: i => `question-${i + 1}`,
  label: () => `${faker.lorem.sentence().replace(/\.$/, "")}?`,
  type: faker.list.random(...TYPES),
  isRequired: () => faker.random.boolean().toString(),
  isHidden: "false",
  isArchived: false,
  meta: JSON.stringify({}),

  afterCreate(question, server) {
    let config = {};

    if (["TEXT", "TEXTAREA"].includes(question.type)) {
      config.maxLength = faker.random.number({ min: 1, max: 255 });
    } else if (["INTEGER", "FLOAT"].includes(question.type)) {
      config.minValue = faker.random.number({ min: 1, max: 100 });
      config.maxValue = faker.random.number({
        min: config.minValue + 1,
        max: 1000
      });
    } else if (["CHECKBOX", "RADIO"].includes(question.type)) {
      const options = server.createList("option", 3);

      options.forEach(
        option => (option.slug = `${question.slug}-${option.slug}`)
      );

      config.optionIds = options.map(({ id }) => id);
    }

    question.update(config);
  }
});
