import grapoi from 'grapoi';
import rdf from 'rdf-ext';
import { updateFromTerm } from './termManagement';

const namespaces = {
  ff: rdf.namespace('https://foerderfunke.org/default#'),
  rdf: rdf.namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  xsd: rdf.namespace('http://www.w3.org/2001/XMLSchema#'),
  rdfs: rdf.namespace('http://www.w3.org/2000/01/rdf-schema#'),
  fim: rdf.namespace('https://schema.fim.fitko.net/fields/baukasten/'),
  schema: rdf.namespace('http://schema.org/'),
  foaf: rdf.namespace('http://xmlns.com/foaf/0.1/'),
};

function expandIdentifier(abbreviatedId) {
  const [namespace, value] = abbreviatedId.split(':');
  if (!value) {
    throw new Error(
      'Identifier must include a namespace and a value separated by a colon.'
    );
  }
  if (!namespaces.hasOwnProperty(namespace)) {
    throw new Error(`Unknown namespace '${namespace}'`);
  }
  return namespaces[namespace](value);
}

export class ResponseObject {
  constructor(value, object) {
    this.value = value;
    this.object = object;
  }
}

export const getFirstOut = (dataset, predicate, term = 'ff:mainPerson') => {
  const expandedPredicate = expandIdentifier(predicate);
  const expandedTerm = expandIdentifier(term);
  const targetNodes = retrieveAttributes(
    dataset,
    expandedTerm,
    expandedPredicate
  );
  const nodesArray = Array.from(targetNodes);
  return nodesArray.length > 0 && nodesArray[0].object
    ? nodesArray[0].object
    : undefined;
};

export const updateOut = (
  update_type,
  dataset,
  predicate,
  object,
  update_value = null,
  term = 'ff:mainPerson'
) => {
  const expandedPredicate = expandIdentifier(predicate);
  const expandedTerm = expandIdentifier(term);

  const initialNode = retrieveTermNode(dataset, expandedTerm);
  const replaceObject = updateFromTerm(object, update_value);

  switch (update_type) {
    case 'add':
      initialNode.addOut(expandedPredicate, object);
      break;
    case 'delete':
      initialNode.deleteOut(expandedPredicate, object);
      break;
    case 'replace':
      initialNode.deleteOut(expandedPredicate, object);
      initialNode.addOut(expandedPredicate, replaceObject);

      break;
    default:
      throw new Error('Invalid update type');
  }
  return dataset;
};

const retrieveAttributes = (dataset, term, predicate) => {
  const initialNode = retrieveTermNode(dataset, term);
  return initialNode.out(predicate).quads();
};

const retrieveTermNode = (dataset, term, factory = rdf) => {
  return grapoi({ dataset, factory, term: term });
};
