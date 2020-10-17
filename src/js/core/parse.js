export function parse(value = "") {
  if (value.toString().startsWith("=")) {
    try {
      return eval(value.slice(1));
    } catch {
      return value;
    }
  } else {
    return value;
  }
}
