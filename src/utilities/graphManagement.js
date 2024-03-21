import grapoi from 'grapoi';
import rdf from 'rdf-ext';

const namespaces = {
  ff: rdf.namespace('https://foerderfunke.org/default#'),
  rdf: rdf.namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  xsd: rdf.namespace('http://www.w3.org/2001/XMLSchema#'),
};

export class NamespacedTerm {
  constructor(namespace, term) {
    this.namespace = namespace;
    this.term = term;
  }

  getNamespacedTerm() {
    if (this.namespace === 'literal') {
      return this.term;
    } else {
      return namespaces[this.namespace](this.term);
    }
  }
}

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
export const retrieveAttributes = (dataset, term, predicate, factory = rdf) => {
  const initialNode = retrieveTermNode(dataset, term);
  return initialNode.out(predicate.getNamespacedTerm()).quads();
};

/**
 * This function fetches target nodes, attempts to convert the iterable of into
 * an array to access the first node. If the first node exists and contains an
 * `object` property, the value of this object is returned. Otherwise, the
 * function returns `undefined`.
 *
 * @param {Object} dataset - The source data from which attributes are to be retrieved.
 * @param {NamespacedTerm} term - The node name to start the search from.
 * @param {NamespacedTerm} predicate - The predicate to be used for filtering the target nodes.
 *
 * @returns {any} The value of the object from the first target node if available,
 * otherwise `undefined`.
 */
export const getFirstAttributeValue = (dataset, term, predicate) => {
  const targetNodes = retrieveAttributes(dataset, term, predicate);
  const nodesArray = Array.from(targetNodes);
  console.log('this thingy; ', nodesArray[0].object);
  return nodesArray.length > 0 && nodesArray[0].object
    ? nodesArray[0].object.value
    : undefined;
};

/**
 * Updates the object linked to a term node by a specific predicate in the
 * dataset based on the update operation specified.
 *
 * @param {Object} dataset - The dataset containing the term node.
 * @param {NamespacedTerm} term - The term identifying the node to be updated.
 * @param {NamespacedTerm} predicate - The predicate linking the term node to the object.
 * @param {NamespacedTerm} object - The object to be updated or deleted.
 * @param {string} update_type - The type of update operation ('add', 'delete', 'replace').
 * @param {NamespacedTerm} [new_object=null] - The new object to replace the existing one, required if update_type is 'replace'.
 * @throws {Error} Throws an error if an invalid update type is provided.
 */
export const updatePredicatedObject = (
  dataset,
  predicate,
  object,
  update_type,
  new_object = null,
  term = 'user-profile',
) => {
  const initialNode = retrieveTermNode(dataset, term);
  initialNode.addOut(
    predicate.getNamespacedTerm(),
    new_object.getNamespacedTerm(),
  );
  for (const quad of initialNode.out(predicate.getNamespacedTerm()).quads()) {
    console.log(`\t${quad.object.value}`);
  }

  switch (update_type) {
    case 'add':
      initialNode.addOut(
        predicate.getNamespacedTerm(),
        object.getNamespacedTerm(),
      );
      break;
    case 'delete':
      initialNode.deleteOut(
        predicate.getNamespacedTerm(),
        object.getNamespacedTerm(),
      );
      break;
    case 'replace':
      console.log('we are here');
      initialNode.deleteOut(
        predicate.getNamespacedTerm(),
        object.getNamespacedTerm(),
      );
      initialNode.addOut(
        predicate.getNamespacedTerm(),
        new_object.getNamespacedTerm(),
      );
      console.log('this happened');
      break;
    default:
      throw new Error('Invalid update type');
  }
  return dataset;
};

/**
 * Retrieves a node associated with a specific term from a dataset.
 *
 * @param {object} dataset - The RDF dataset to search within.
 * @param {NamespacedTerm} term - The term to find within the dataset.
 * @param {object} [factory=rdf] - Optional RDF data factory, defaults to 'rdf'.
 * @returns {object} The term node from the dataset.
 */
export const retrieveTermNode = (dataset, term, factory = rdf) => {
  return grapoi({dataset, factory, term: term.getNamespacedTerm()});
};
