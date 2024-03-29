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

/**
 * This function fetches target nodes, attempts to convert the iterable of into
 * an array to access the first node. If the first node exists and contains an
 * `object` property, the value of this object is returned. Otherwise, the
 * function returns `undefined`.
 *
 * @param {DatasetCore} dataset - The source data from which attributes are to be retrieved.
 * @param {string} term - The node name to start the search from.
 * @param {string} term_namespace - Namespace of starting node.
 * @param {string} predicate - The predicate to be used for filtering the target nodes.
 * @param {string} predicate_namespace - Namespace of predicate.
 *
 * @returns {any} The value of the object from the first target node if available,
 * otherwise `undefined`.
 */
export const getFirstOut = (
  dataset,
  predicate,
  predicate_namespace,
  term = 'mainPerson',
  term_namespace = 'ff',
) => {
  const termIri = new NamespacedTerm(term_namespace, term);
  const predicateIri = new NamespacedTerm(predicate_namespace, predicate);
  const targetNodes = retrieveAttributes(dataset, termIri, predicateIri);
  const nodesArray = Array.from(targetNodes);
  return nodesArray.length > 0 && nodesArray[0].object
    ? nodesArray[0].object
    : undefined;
};

/**
 * Updates the object linked to a term node by a specific predicate in the
 * dataset based on the update operation specified.
 *
 * NOTE: This currently only allows literal updates
 *
 * @param {string} update_type - The type of update operation ('add', 'delete', 'replace').
 * @param {Object} dataset - The dataset containing the term node.
 * @param {string} term - The node name to start the search from.
 * @param {string} term_namespace - Namespace of starting node.
 * @param {string} predicate - The predicate to be used for filtering the target nodes.
 * @param {string} predicate_namespace - Namespace of predicate.
 * @param {Object} object - The object to be updated or deleted.
 * @param {string | null} [update_value=null] - The new object to replace the existing one, required if update_type is 'replace'.
 * @throws {Error} Throws an error if an invalid update type is provided.
 */
export const updateOut = (
  update_type,
  dataset,
  predicate,
  predicate_namespace,
  object,
  update_value = null,
  term = 'mainPerson',
  term_namespace = 'ff',
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

/**
 * Retrieves RDF quads for a given subject and predicate from the specified dataset.
 * This function dynamically resolves the namespaces for both the term (subject) and predicate
 * before querying the dataset. It uses the grapoi library to facilitate graph traversal
 * and quad retrieval based on the resolved IRI of the subject and predicate.
 *
 * @param {DatasetCore} dataset - The RDF dataset to be queried.
 * @param {DataFactory} [factory=rdf] - The factory used for creating RDF/JS data structures, defaulting to `rdf`. * @param {string} term - The term identifying the subject node.
 * @param {NamespacedTerm} term - The term identifying the subject node.
 * @param {NamespacedTerm} predicate - The predicate under which nodes are related to the subject.
 * @returns {Array<Quad>} An array of RDF/JS Quads that represent the relationship
 * from the subject to related objects via the specified predicate.
 */
const retrieveAttributes = (dataset, term, predicate, factory = rdf) => {
  const initialNode = retrieveTermNode(dataset, term);
  return initialNode.out(predicate.getNamespacedTerm()).quads();
};

/**
 * Retrieves a node associated with a specific term from a dataset.
 *
 * @param {object} dataset - The RDF dataset to search within.
 * @param {NamespacedTerm} term - The term to find within the dataset.
 * @param {object} [factory=rdf] - Optional RDF data factory, defaults to 'rdf'.
 * @returns {object} The term node from the dataset.
 */
const retrieveTermNode = (dataset, term, factory = rdf) => {
  return grapoi({dataset, factory, term: term.getNamespacedTerm()});
};
