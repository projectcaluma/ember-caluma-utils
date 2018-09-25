import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import BaseSerializer from "ember-caluma-utils/test-support/mirage/serializers/base";

module("Unit | Mirage GraphQL Serializer | base", function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.serializer = new BaseSerializer("X");
  });

  test("can serialize objects", async function(assert) {
    assert.expect(3);

    assert.deepEqual(this.serializer.serialize(), {});
    assert.deepEqual(this.serializer.serialize({ foo: "bar" }), {
      foo: "bar"
    });
    assert.deepEqual(this.serializer.serialize({ slug: "test-test" }), {
      slug: "test-test",
      id: btoa("X:test-test")
    });
  });

  test("can deserialize objects", async function(assert) {
    assert.expect(3);

    assert.deepEqual(this.serializer.deserialize(), {});
    assert.deepEqual(this.serializer.deserialize({ foo: "bar" }), {
      foo: "bar"
    });
    assert.deepEqual(this.serializer.deserialize({ id: btoa("X:test-test") }), {
      slug: "test-test"
    });
  });
});
