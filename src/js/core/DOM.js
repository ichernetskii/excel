class DOM {
  constructor(selector) {
    this.$el = typeof selector === "string" ? document.querySelector(selector) : selector;
  }

  html(html = "") {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
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
