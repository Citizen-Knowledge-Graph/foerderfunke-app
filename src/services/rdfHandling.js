import formats from '@rdfjs/formats';

const parseTurtle = async (content) => {

    // initialise parser
    const parser = formats.parsers.get('text/turtle')

    // parse and return content
    return parser.import(content)
}

