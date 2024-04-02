import { DataFactory, Parser, Writer } from 'n3';
import rdf from 'rdf-ext';

/**
 * Parses RDF quads from the given content.
 *
 * This function takes a string of content and a parser object, and returns a
 * Promise that resolves to an array of quads. The Promise is rejected if the
 * parser encounters an error.
 *
 * @param {string} content - The string content to be parsed into RDF quads.
 * @param {Object} parser - The parser object used to parse the content. It should have a `parse` method that takes content and a callback.
 * @returns {Promise<Array>} A Promise that resolves to an array of RDF quads parsed from the content.
 */
const parseQuads = (content, parser) => {
  return new Promise((resolve, reject) => {
    const quads = [];
    parser.parse(content, (error, newQuad, _) => {
      if (error) {
        reject(error);
      } else if (newQuad) {
        quads.push(newQuad);
      } else {
        resolve(quads);
      }
    });
  });
};

/**
 * Asynchronously parses Turtle content into an RDF dataset.
 *
 * This function takes a string of Turtle content, uses a new Parser instance to parse it into RDF quads, and then converts these quads into an RDF dataset.
 *
 * @param {string} content - The Turtle content to be parsed.
 * @returns {Promise<Object>} A Promise that resolves to an RDF dataset containing the parsed quads.
 */
export const parseTurtle = async (content) => {
  const parser = new Parser();
  const quads = await parseQuads(content, parser);
  return rdf.dataset(quads);
};

/**
 * Serializes an RDF dataset to a canonical N-Quads string format.
 *
 * Takes an RDF/JS DatasetCore compliant dataset and converts it into a canonical
 * N-Quads string. This format is a line-based representation of RDF quads,
 * suitable for RDF data comparisons and storage. Although named `serializeTurtle`,
 * the function outputs in N-Quads, a related format that also accommodates named graphs.
 *
 * @returns {string} Serialized dataset in canonical N-Quads format.
 */
export const serializeTurtle = async (dataset) => {
  const writer = new Writer({ format: 'Turtle' });
  dataset._quads.forEach(({ subject, predicate, object, graph }) => {
    writer.addQuad(
      DataFactory.namedNode(subject.value),
      DataFactory.namedNode(predicate.value),
      object.termType === 'Literal'
        ? DataFactory.literal(object.value, object.datatype || object.language)
        : DataFactory.namedNode(object.value),
      graph.value
        ? DataFactory.namedNode(graph.value)
        : DataFactory.defaultGraph()
    );
  });

  return new Promise((resolve, reject) => {
    writer.end((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Reads and parses a list of Turtle strings into a single combined RDF/JS dataset.
 * @param {string[]} turtleStrings - An array of Turtle strings to be parsed.
 * @returns {Promise<DatasetCore>} A Promise that resolves to a combined RDF/JS
 * dataset containing all parsed triples.
 */
export const combineTurtleStringsIntoDataset = async (turtleStrings) => {
  const combinedDataset = rdf.dataset();

  for (const turtleString of turtleStrings) {
    const dataset = await parseTurtle(turtleString);
    combinedDataset.addAll(dataset);
  }

  return combinedDataset;
};
