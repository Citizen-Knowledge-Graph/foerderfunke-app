import { DataFactory, Parser, Writer } from 'n3';
import rdf from 'rdf-ext';

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

export const parseTurtle = async (content) => {
  const parser = new Parser();
  const quads = await parseQuads(content, parser);
  return rdf.dataset(quads);
};

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

export const combineTurtleStringsIntoDataset = async (turtleStrings) => {
  const combinedDataset = rdf.dataset();

  for (const turtleString of turtleStrings) {
    const dataset = await parseTurtle(turtleString);
    combinedDataset.addAll(dataset);
  }

  return combinedDataset;
};
