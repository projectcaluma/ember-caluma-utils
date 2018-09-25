import BaseSerializer from "./base";
import { classify } from "@ember/string";

export default class extends BaseSerializer {
  serialize(obj) {
    const val = super.serialize(obj);

    return {
      ...val,
      __typename: `${classify(val.type.toLowerCase())}Question`
    };
  }
}
