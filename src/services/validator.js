import rdfDataModel from '@rdfjs/data-model'
import rdfDataset from '@rdfjs/dataset'
import Validator from 'shacl-engine/Validator.js';
import { DataFactory } from "n3";

import storage from "./storage.js";

const {quad} = DataFactory;

export function NamedShape(name, shape) {
    return {
        name: name,
        shape: shape
    }
}

function NamedValidationReport(queryName, profileName, report) {
    return {
        queryName: queryName,
        profileName: profileName,
        report: report
    }
}

/**
 * Loads data from filepath to a shapes object. Shapes object is used to validate profiles.
 */
export async function loadToShapes(fileName) {
    const store = storage.getInstance();
    const quads = await store.loadFile(fileName);
    console.log(`${fileName} has been loaded into shape`)
    return NamedShape(fileName, rdfDataset.dataset(quads))
}

/**
 * Returns validator object
 */
function createValidator(shapes) {
    return new Validator(shapes, { factory: rdfDataModel })
}     

/**
 * Create report for profile
 */
export async function createValidationReport(shapes, profile) {
    const validator = createValidator(shapes.shape);
    const dataset = profile.shape
    const report = await validator.validate( { dataset } )
    return NamedValidationReport(shapes.name, profile.name, report);
}
