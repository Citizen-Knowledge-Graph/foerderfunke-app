import { Parser } from 'n3';
import rdfDataset from '@rdfjs/dataset'


/**
 * Parses RDF quads from the given content.
 *
 * This function takes a string of content and a parser object, and returns a Promise that resolves to an array of quads. The Promise is rejected if the parser encounters an error.
 *
 * @param {string} content - The string content to be parsed into RDF quads.
 * @param {Object} parser - The parser object used to parse the content. It should have a `parse` method that takes content and a callback.
 * @returns {Promise<Array>} A Promise that resolves to an array of RDF quads parsed from the content.
 */
function parseQuads(content, parser) {
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
}

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

    quads = await parseQuads(content, parser);

    return rdfDataset.dataset(quads)
}

