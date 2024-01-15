import rdf from 'rdf-ext';
import storage from "./storage.js";
import { DataFactory } from "n3";

const {quad} = DataFactory;

export function NamedShape(name, shape) {
    return {
        name: name,
        shape: shape
    }
}

/**
 * Loads data from filepath to a shapes object. Shapes object is used to validate profiles.
 */
export async function loadToShapes(fileName) {
    const store = storage.getInstance();
    const quads = await store.loadFile(fileName);
    console.log("done loading quads: ", quads)
    return NamedShape(fileName, rdf.dataset(quads))
}
