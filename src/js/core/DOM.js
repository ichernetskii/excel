class DOM {
  constructor(selector) {
    this.$el = typeof selector === "string" ? document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.innerHTML.trim();
    }
  }

  text(text) {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    } else {
      if (this.$el.tagName.toLowerCase() === "input") {
        return this.$el.value.trim();
      }
      return this.$el.textContent.trim();
    }
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  clear() {
    this.html("");
    return this;
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  hide() {
    this.$el.style.display = "none";
  }

  show() {
    this.$el.style.display = "block";
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  querySelector(selector) {
    return $(this.$el.querySelector(selector));
  }

  querySelectorAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector)).map(item => $(item));
  }

  get classList() {
    return this.$el.classList
  }

  get dataset() {
    return this.$el.dataset
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    } else {
      return this.$el.getAttribute(name);
    }
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(":");
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    } else {
      return this.$el.dataset.id;
    }
  }

  get row() {
    return this.$el.dataset.id.split(":")[0]
  }

  get col() {
    return this.$el.dataset.id.split(":")[1]
  }

  css(styles = {}) {
    for (const [key, value] of Object.entries(styles)) {
      this.$el.style[key] = value;
    }
  }

  getStyles(styles = []) {
    return styles.reduce((acc, style) => {
      acc[style] = this.$el.style[style];
      return acc;
    }, {});
  }
}

export function $(selector) {
  return new DOM(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes)
  }
  return $(el);
}
