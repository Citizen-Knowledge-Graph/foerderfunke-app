import { Parser } from 'n3';
import rdfDataset from '@rdfjs/dataset'

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

export const parseTurtle = async (content) => {
    const parser = new Parser();
    quads = await parseQuads(content, parser);
    return rdfDataset.dataset(quads)
}

