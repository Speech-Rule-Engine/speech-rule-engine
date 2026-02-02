// Experimentation with tests

export function removeFenceAnnotation(tree: string) {
  const updatedXmlString = tree.replace(/(fences:[^;"]*);?/g, '').replace(/ annotation=""/g, '');
  return updatedXmlString;
}
