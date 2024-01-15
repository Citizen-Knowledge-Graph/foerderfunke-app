import rdf from 'rdf-ext';
import SHACLValidator from "rdf-validate-shacl"
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
    return NamedShape(fileName, rdf.dataset(quads))
}

/**
 * Returns validator object
 */
function createValidator(shapes) {
    return new SHACLValidator(shapes, {factory: rdf});
}

/**
 * Create report for profile
 */
export async function createValidationReport(shapes, profile) {
    console.log("validator is being created")
    const validator = createValidator(shapes.shape);
    console.log("validator has been created")
    const report = await validator.validate(profile.shape)
    return NamedValidationReport(shapes.name, profile.name, report);
}
