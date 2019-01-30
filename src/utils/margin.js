export function margin(v, type) {
  if (typeof v.margin === "object") {
    if (type === "vertical") return margin(v, "top") + margin(v, "bottom");
    if (type === "horizontal") return margin(v, "left") + margin(v, "right");
    return +v.margin[type] || 0;
  } else {
    return +v.margin || 0;
  }
}
