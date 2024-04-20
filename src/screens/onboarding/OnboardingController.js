import { readFile, readJson, writeFile } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseTurtle, serializeTurtle } from '../../utilities/rdfHandling';
import { addOut } from '../../utilities/graphManagement';
import { runSparqlSelectQueryOnRdfString } from '@foerderfunke/matching-engine/src/utils';
import {
  OnboardingScreenData,
  OnboardingCard,
  InputConstraints,
} from './OnboardingModel';

export const fetchOnboardingScreenData = async () => {
  const onboardingScreenData = new OnboardingScreenData();
  //
  // fetch onboarding cards
  const onbardingCards = await readJson('onboarding-cards.json');
  let datafieldsPath = await AsyncStorage.getItem('datafields');
  let datafieldsString = await readFile(datafieldsPath);
  for (let card of onbardingCards) {
    const { datatype, possibleValues } = await fetchDatafieldProperties(
      datafieldsString,
      card.datafield
    );
    const newInputConstraints = new InputConstraints(datatype, possibleValues);
    const newOnboardingCard = new OnboardingCard(
      card.datafield,
      card.title,
      card.description,
      newInputConstraints
    );
    onboardingScreenData.addOnboardingCard(newOnboardingCard);
  }
  return onboardingScreenData;
};

export const fetchDatafieldProperties = async (datafieldsString, datafield) => {
  const datatypeQuery = `
    PREFIX ff: <https://foerderfunke.org/default#>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?datatype
    WHERE {
      ?shape a sh:NodeShape ;
             sh:targetClass ff:Citizen ;
             sh:property ?prop .
      
      ?prop sh:path ${datafield} ;
            sh:datatype ?datatype .
    }`;

  const datatypeList = await runSparqlSelectQueryOnRdfString(
    datatypeQuery,
    datafieldsString
  );
  const datatype =
    datatypeList.length > 0 && datatypeList[0].datatype
      ? datatypeList[0].datatype
      : 'no datatype provided';
  console.log('datatype', datatype);
  const inValuesQuery = `
    PREFIX ff: <https://foerderfunke.org/default#>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?item
    WHERE {
      ?shape a sh:NodeShape ;
             sh:targetClass ff:Citizen ;
             sh:property ?prop .

      ?prop sh:path ${datafield} ;
            sh:in ?inList .
            
      # Traverse the RDF list
      ?inList rdf:rest* / rdf:first ?item.
    }`;
  const possibleValues = await runSparqlSelectQueryOnRdfString(
    inValuesQuery,
    datafieldsString
  );
  return { datatype, possibleValues };
};

export const addUserProfileField = async (selectedUser, field, value) => {
  //
  // fetch user profile paths
  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples'
  );
  const userProfilePath =
    userProfileExamplesPath + selectedUser.userId + '.ttl';

  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = addOut(userGraph, field, value);
  const updatedGraphString = await serializeTurtle(updatedGraph);
  console.log('new graph', updatedGraphString);
  await writeFile(userProfilePath, updatedGraphString);
};
