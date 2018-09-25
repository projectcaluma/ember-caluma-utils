import BaseFilter from "ember-caluma-utils/test-support/mirage/filters/base";

export default class extends BaseFilter {
  isArchived(records, value) {
    return records.filter(({ isArchived }) => isArchived === value);
  }
}
