import rdf from 'rdf-ext';

export function updateFromTerm(originalObject, newValue, factory = rdf) {
  if (originalObject.termType === 'BlankNode') {
    return factory.blankNode(newValue);
  }

  if (originalObject.termType === 'Literal') {
    return factory.literal(
      newValue,
      originalObject.datatype.language ||
        factory.namedNode(originalObject.datatype.value),
    );
  }

  if (originalObject.termType === 'NamedNode') {
    return factory.namedNode(newValue);
  }
}

export default updateFromTerm;
