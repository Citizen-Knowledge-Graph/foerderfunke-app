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

  initialNode.deleteOut(expandedPredicate, object);
  initialNode.addOut(expandedPredicate, replaceObject);

  return dataset;
};

export const addOut = (dataset, predicate, value, term = 'ff:mainPerson') => {
  const expandedPredicate = expandIdentifier(predicate);
  const expandedTerm = expandIdentifier(term);
  const initialNode = retrieveTermNode(dataset, expandedTerm);
  const newValue = rdf.blankNode(value);

  initialNode.deleteList(expandedPredicate); // ensure that we have no duplicates
  initialNode.addOut(expandedPredicate, newValue);

  return dataset;
};

const retrieveAttributes = (dataset, term, predicate) => {
  const initialNode = retrieveTermNode(dataset, term);
  return initialNode.out(predicate).quads();
};

const retrieveTermNode = (dataset, term, factory = rdf) => {
  return grapoi({ dataset, factory, term: term });
};
