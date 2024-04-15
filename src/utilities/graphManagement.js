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

class NamespacedTerm {
  constructor(namespace, term) {
    this.namespace = namespace;
    this.term = term;
  }

  getNamespacedTerm() {
    if (this.namespace === 'literal') {
      return namespaces.xsd(this.term);
    } else {
      return namespaces[this.namespace](this.term);
    }
  }
}

export class ResponseObject {
  constructor(value, object) {
    this.value = value;
    this.object = object;
  }
}

export const getFirstOut = (dataset, predicate, term = 'ff:mainPerson') => {
  const targetNodes = retrieveAttributes(dataset, term, predicate);
  const nodesArray = Array.from(targetNodes);
  return nodesArray.length > 0 && nodesArray[0].object
    ? nodesArray[0].object
    : undefined;
};

export const updateOut = (
  update_type,
  dataset,
  predicate,
  predicate_namespace,
  object,
  update_value = null,
  term = 'mainPerson',
  term_namespace = 'ff'
) => {
  const termIri = new NamespacedTerm(term_namespace, term);
  const predicateIri = new NamespacedTerm(predicate_namespace, predicate);
  const initialNode = retrieveTermNode(dataset, termIri);
  const replaceObject = updateFromTerm(object, update_value);

  switch (update_type) {
    case 'add':
      initialNode.addOut(predicateIri.getNamespacedTerm(), object);
      break;
    case 'delete':
      initialNode.deleteOut(predicateIri.getNamespacedTerm(), object);
      break;
    case 'replace':
      initialNode.deleteOut(predicateIri.getNamespacedTerm(), object);
      initialNode.addOut(predicateIri.getNamespacedTerm(), replaceObject);

      break;
    default:
      throw new Error('Invalid update type');
  }
  return dataset;
};

const retrieveAttributes = (dataset, term, predicate, factory = rdf) => {
  const initialNode = retrieveTermNode(dataset, term);
  return initialNode.out(predicate).quads();
};

const retrieveTermNode = (dataset, term, factory = rdf) => {
  return grapoi({ dataset, factory, term: term.getNamespacedTerm() });
};
