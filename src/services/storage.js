import {Store as N3Store, Parser as N3Parser, DataFactory} from "n3"
import { readFileFromFS } from "./fileManagement";

const { quad } = DataFactory;

class Storage {
    constructor() {
        if (Storage._instance) {
            throw new Error("Cannot instantiate more than one Storage, use Storage.getInstance()");
        }
        this.data = new N3Store();
    }

    static getInstance() {
        if (!Storage._instance) {
            Storage._instance = new Storage();
        }
        return Storage._instance;
    }

    /**
     * Loads a turtl file and returns array of quads.
     *
     * @param filePath Path to file.
     */
    async loadFile(fileName) {
        console.log("Loading file:", fileName)
        const parser = new N3Parser();
        const fileContent = await readFileFromFS(fileName)
        console.log(fileContent)

        return new Promise((resolve, reject) => {
            const quads = [];
            parser.parse(fileContent, (error, newQuad, _) => {
                if (error) {
                    reject(error);
                } else
                if (newQuad) {            
                    quads.push(newQuad)
                } else {
                    resolve(quads);
                }
            });
        });
    }
}

export default Storage;