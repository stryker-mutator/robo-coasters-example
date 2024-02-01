export class RoboComponent extends HTMLElement {
  by = new Selector(this);
}

export class Selector {
  #element;

  /** @type {Record<string, HTMLElement>} */
  class;
  /** @type {Record<string, HTMLElement>} */
  id;

  /** @param {HTMLElement} element */
  constructor(element) {
    this.#element = element;
    this.class = new Proxy(
      {},
      {
        get: (_, property) =>
          this.#element?.querySelector(`.${toKebabCase(String(property))}`),
      },
    );
    this.id = new Proxy(
      {},
      {
        get: (_, property) =>
          this.#element?.querySelector(`#${toKebabCase(String(property))}`),
      },
    );
  }
}

/** @param {string} str */
function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @param {HTMLTemplateElement} template
 * @returns {HTMLElement}
 */
export function cloneTemplate(template) {
  return /** @type {HTMLElement} */ (template.content.cloneNode(true));
}
