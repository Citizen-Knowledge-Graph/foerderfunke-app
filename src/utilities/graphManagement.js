import grapoi from 'grapoi';
import rdf from 'rdf-ext';
import { updateFromTerm } from './termManagement';

const namespaces = {
  ff: 'https://foerderfunke.org/default#',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  fim: 'https://schema.fim.fitko.net/fields/baukasten/',
  schema: 'http://schema.org/',
  foaf: 'http://xmlns.com/foaf/0.1/',
  sh: 'http://www.w3.org/ns/shacl#',
};

function expandIdentifier(abbreviatedId) {
  const [namespace, value] = abbreviatedId.split(':');
  if (!value) {
    return { value: namespace };
  }
  if (!namespaces.hasOwnProperty(namespace)) {
    throw new Error(`Unknown namespace '${namespace}'`);
  }
  return rdf.namespace(namespaces[namespace])(value);
}

function compactUri(fullUri) {
  for (let prefix in namespaces) {
    if (fullUri.startsWith(namespaces[prefix])) {
      return `${prefix}:${fullUri.substring(namespaces[prefix].length)}`;
    }
  }
  return fullUri; // Return the original URI if no namespaces match
}

export const getFirstOut = (dataset, predicate, term = 'ff:mainPerson') => {
  const allResults = getAllOut(dataset, predicate, term);
  return allResults.length > 0 ? allResults[0] : undefined;
};

export const getAllOut = (dataset, predicate, term = 'ff:mainPerson') => {
  const expandedPredicate = expandIdentifier(predicate);
  const expandedTerm = expandIdentifier(term);

  console.log('expandedPredicate', expandedPredicate);
  console.log('expandedTerm', expandedTerm);

  const targetNodes = retrieveAttributes(
    dataset,
    expandedTerm,
    expandedPredicate
  );
  const nodesArray = Array.from(targetNodes);
  console.log('nodesArray', nodesArray);

  return nodesArray
    .map((node) => {
      if (node.object) {
        const compactedValue = compactUri(node.object.value);
        return updateFromTerm(node.object, compactedValue);
      }
      return undefined;
    })
    .filter((result) => result !== undefined);
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
  console.log('we are here with term: ', term);
  const startingNode = grapoi({ dataset, factory, term: term });

  return startingNode;
};
