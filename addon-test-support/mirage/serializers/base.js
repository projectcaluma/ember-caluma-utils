export const slugToId = (slug, type) => btoa(`${type}:${slug}`);
export const idToSlug = id => atob(id).split(":")[1];

export default class {
  constructor(type) {
    this.type = type;
  }

  serialize(deserialized = {}) {
    const { slug = null, ...obj } = deserialized;

    return (
      deserialized &&
      (slug
        ? {
            ...obj,
            slug,
            id: slugToId(slug, this.type)
          }
        : obj)
    );
  }

  deserialize(serialized = {}) {
    const { id = null, ...obj } = serialized;

    return (
      serialized &&
      (id
        ? {
            slug: idToSlug(id),
            ...obj
          }
        : obj)
    );
  }
}
