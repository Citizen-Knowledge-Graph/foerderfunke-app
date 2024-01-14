import {Store as N3Store, Parser as N3Parser, DataFactory} from "n3"
import fs from "fs";
import path from "path";

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
    async loadFile(filePath) {
        console.log("Loading file:", filePath)
        const parser = new N3Parser();
        const rdfStream = fs.createReadStream(filePath);
        const filename = path.basename(filePath, ".ttl")

        return new Promise((resolve, reject) => {
            const quads = [];
            parser.parse(rdfStream, (error, newQuad, prefixes) => {
                if (error) {
                    reject(error);
                } else
                if (newQuad) {
                    quads.push(quad(newQuad.subject, newQuad.predicate, newQuad.object, filename))
                } else {
                    resolve(quads);
                }
            });
        });
    }
}