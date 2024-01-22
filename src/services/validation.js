import rdfDataModel from '@rdfjs/data-model'
import Validator from 'shacl-engine/Validator.js';
import { readFile, readJson } from './fileManagement.js';
import { parseTurtle } from './rdfHandling.js';

function NamedReport(name, report) {
    this.name = name;
    this.report = report;
}

/**
 * Create report for profile
 */
const createValidationReport = async (shapes, profile) => {
    const validator = new Validator(shapes, { factory: rdfDataModel })
    return await validator.validate({ dataset: profile })
}

// run validation
const runValidation = async () => {

    // set up filepaths
    const userProfilePath = "user-profile.ttl"
    const queryRegistryPath = "query-registry.json"
    const queriesPath = "queries"

    // load user profile to shapes
    const userProfileString = await readFile(userProfilePath)
    const userProfile = await parseTurtle(userProfileString)

    // load query registry
    const queryRegistry = await readJson(queryRegistryPath)

    // Iterate through registry
    for (let key in queryRegistry) {
        if (queryRegistry.hasOwnProperty(key)) {
            console.log("Running validation for: ", key);

            const queryString = await readFile(queryRegistry[key]["path"])
            const queryProfile = await parseTurtle(queryString)
            const report = await createValidationReport(queryProfile, userProfile)

            console.log(`Validation for ${key} was ${report.conforms}`)
        }
    }
}

export default runValidation;