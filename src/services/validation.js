import rdfDataModel from '@rdfjs/data-model'
import rdfDataset from '@rdfjs/dataset'
import Validator from 'shacl-engine/Validator.js';
import { readFile, readDirectory } from './fileManagement.js';
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
    const queriesPath = "queries"

    // load user profile to shapes
    const userProfileString = await readFile(userProfilePath)
    const userProfile = await parseTurtle(userProfileString)

    // load queries to shapes
    const fileNames = await readDirectory(queriesPath)
    const queryProfilePromises = fileNames.map(fileName => [fileName, readFile(fileName)])

    // run validations
    const reports = []
    queryProfilePromises.forEach(async (query, index) => {
        try {
            const queryProfile = await parseTurtle(await query[1])
            const report = await createValidationReport(queryProfile, userProfile)
            console.log(`Validation for ${query[0]} was ${report.conforms}`)
        } catch (error) {
            console.log(`Promise ${index} rejected:`, error);
        }
    });
}

export default runValidation;