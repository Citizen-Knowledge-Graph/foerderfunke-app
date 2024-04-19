import rdf from 'rdf-ext';

export function updateFromTerm(originalObject, newValue, factory = rdf) {
  if (originalObject.termType === 'BlankNode') {
    console.log('blank node', newValue);
    return factory.blankNode(newValue);
  }

  if (originalObject.termType === 'Literal') {
    console.log('literal', newValue);
    return factory.literal(
      newValue,
      originalObject.datatype.language ||
        factory.namedNode(originalObject.datatype.value)
    );
  }

  if (originalObject.termType === 'NamedNode') {
    console.log('named node', newValue);
    return factory.namedNode(newValue);
  }
}

export default updateFromTerm;
