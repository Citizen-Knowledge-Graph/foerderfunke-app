import grapoi from 'grapoi';
import rdf from 'rdf-ext';

/**
 * Retrieves RDF quads for a given subject and predicate from the specified dataset.
 * This function dynamically resolves the namespaces for both the term (subject) and predicate
 * before querying the dataset. It uses the grapoi library to facilitate graph traversal
 * and quad retrieval based on the resolved IRI of the subject and predicate.
 *
 * @param {DatasetCore} dataset - The RDF dataset to be queried.
 * @param {DataFactory} [factory=rdf] - The factory used for creating RDF/JS data structures, defaulting to `rdf`. * @param {string} term - The term identifying the subject node.
 @param {string} term - The term identifying the subject node.
 * @param {string} predicate - The predicate under which nodes are related to the subject.
 * @returns {Array<Quad>} An array of RDF/JS Quads that represent the relationship
 * from the subject to related objects via the specified predicate.
 */
export const retrieveAttributes = (dataset, term, predicate, factory = rdf) => {
  const initialNode = retrieveTermNode(dataset, term);

  const predicateIri = findNamespace(predicate);
  return initialNode.out(predicateIri).quads();
};

/**
 * This function fetches target nodes, attempts to convert the iterable of into
 * an array to access the first node. If the first node exists and contains an
 * `object` property, the value of this object is returned. Otherwise, the
 * function returns `undefined`.
 *
 * @param {Object} data - The source data from which attributes are to be retrieved.
 * @param {String} term - The node name to start the search from.
 * @param {String} predicate - The predicate to be used for filtering the target nodes.
 *
 * @returns {any} The value of the object from the first target node if available,
 * otherwise `undefined`.
 */
export const getFirstAttributeValue = (data, term, predicate) => {
  const targetNodes = retrieveAttributes(data, term, predicate);
  const nodesArray = Array.from(targetNodes);
  return nodesArray.length > 0 && nodesArray[0].object
    ? nodesArray[0].object.value
    : undefined;
};

/**
 * Updates the object linked to a term node by a specific predicate in the
 * dataset based on the update operation specified.
 *
 * @param {Object} data - The dataset containing the term node.
 * @param {string} term - The term identifying the node to be updated.
 * @param {string} predicate - The predicate linking the term node to the object.
 * @param {string} object - The object to be updated or deleted.
 * @param {string} update_type - The type of update operation ('add', 'delete', 'replace').
 * @param {string} [new_object=null] - The new object to replace the existing one, required if update_type is 'replace'.
 * @throws {Error} Throws an error if an invalid update type is provided.
 */
export const updatePredicatedObject = (
  data,
  predicate,
  object,
  update_type,
  new_object = null,
  term = 'citizen-a',
) => {
  const initialNode = retrieveTermNode(data, term);
  const predicateIri = findNamespace(predicate);
  const objectIri = findNamespace(object);
  const newObjectIri = new_object ? findNamespace(new_object) : null;
  switch (update_type) {
    case 'add':
      initialNode.addOut(predicateIri, objectIri);
      break;
    case 'delete':
      initialNode.deleteOut(predicateIri, objectIri);
      break;
    case 'replace':
      initialNode.deleteOut(predicateIri, objectIri);
      initialNode.addOut(predicateIri, newObjectIri);
      break;
    default:
      throw new Error('Invalid update type');
  }
  return data;
};

/**
 * Retrieves a node associated with a specific term from a dataset.
 *
 * @param {Object} dataset - The dataset from which the term node is to be retrieved.
 * @param {string} term - The term for which the node is sought. It is converted to an IRI using `findNamespace`.
 * @param {Object} [factory=rdf] - An optional RDF/JS data factory to be used for creating nodes, literals, etc.
 * @returns {Object} The node associated with the given term, retrieved using the `grapoi` function.
 */
export const retrieveTermNode = (dataset, term, factory = rdf) => {
  const termIri = findNamespace(term);
  return grapoi({dataset, factory, term: termIri});
};

/**
 * Attempts to find and return the namespaced version of a given predicate by
 * trying each known namespace. Iterates through a predefined list of namespaces
 * and checks if the predicate exists within any of them. If a match is found,
 * the namespaced term (as an RDF/JS NamedNode) for the predicate is returned.
 * If no match is found after checking all namespaces, returns null.
 *
 * @param {string} term - The term name to be namespaced.
 * @returns {NamedNode|null} The namespaced predicate as an RDF/JS NamedNode, or
 * null if not found in any namespace.
 */
function findNamespace(term) {
  const ns = {
    ff: rdf.namespace('https://foerderfunke.org/default#'),
    rdf: rdf.namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
    xsd: rdf.namespace('http://www.w3.org/2001/XMLSchema#'),
  };

  for (const key in ns) {
    const namespacedPredicate = ns[key](term);
    if (namespacedPredicate && namespacedPredicate.value) {
      return namespacedPredicate;
    }
  }
  return null;
}
