import { computed } from "@ember/object";
import Mixin from "@ember/object/mixin";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  defaultDataIdFromObject
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "ember-caluma-utils/-private/fragment-types";

// TODO: maybe extract this service into a general caluma utils addon
export default Mixin.create({
  cache: computed(
    () =>
      new InMemoryCache({
        fragmentMatcher: new IntrospectionFragmentMatcher({
          introspectionQueryResultData
        }),
        dataIdFromObject: obj => {
          if (obj.slug) {
            obj = Object.assign({}, obj, { _id: obj.slug });
          }

          return defaultDataIdFromObject(obj);
        }
      })
  )
});
