export default function() {
  var mode = "identity",
      layout = identity;

  function gridding(nodes) {
    return layout(nodes);
  }

  function identity(nodes) {
    return nodes;
  }

  return gridding;
};
