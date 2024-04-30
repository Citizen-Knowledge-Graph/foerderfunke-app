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
  const datafieldsPath = await AsyncStorage.getItem('datafields');
  const datafieldsString = await readFile(datafieldsPath);
  for (let card of onbardingCards) {
    const { datatype, possibleValues, objectClass } =
      await fetchDatafieldProperties(datafieldsString, card.datafield);
    const newInputConstraints = new InputConstraints(
      datatype,
      possibleValues,
      objectClass
    );
    const newOnboardingCard = new OnboardingCard(
      card.datafield,
      card.term,
      card.title,
      card.linkedOnboarding ? card.linkedOnboarding : null,
      newInputConstraints
    );
    console.log(newOnboardingCard);
    onboardingScreenData.addOnboardingCard(newOnboardingCard);
  }
  return onboardingScreenData;
};

export const onboardingManager = async (
  onboardingScreenData,
  onboardingCard,
  update,
  index
) => {
  // if no update required proceed without updating
  if (!update) {
    return onboardingScreenData;
  }

  // otherwise fetch additional cards
  const additionalOnboardingCards = [];
  const newOnboardingCards = await readJson(
    onboardingCard.linkedOnboarding.path
  );
  const datafieldsPath = await AsyncStorage.getItem('datafields');
  const datafieldsString = await readFile(datafieldsPath);
  for (let card of newOnboardingCards) {
    const { datatype, possibleValues, objectClass } =
      await fetchDatafieldProperties(datafieldsString, card.datafield);
    const newInputConstraints = new InputConstraints(
      datatype,
      possibleValues,
      objectClass
    );
    const newOnboardingCard = new OnboardingCard(
      card.datafield,
      card.term,
      card.title,
      card.linkedOnboarding ? card.linkedOnboarding : null,
      newInputConstraints
    );
    console.log(newOnboardingCard);
    additionalOnboardingCards.push(newOnboardingCard);
  }

  // update onboarding screen data
  onboardingScreenData.onboadingCards.splice(
    index,
    0,
    additionalOnboardingCards
  );

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

  const objectClassQuery = `
    PREFIX ff: <https://foerderfunke.org/default#>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    
    SELECT ?class
    WHERE {
      ?shape a sh:NodeShape ;
             sh:property ?propertyShape .

      ?propertyShape sh:path ${datafield} ;
             sh:class ?class .
    }`;
  const objectClassList = await runSparqlSelectQueryOnRdfString(
    objectClassQuery,
    datafieldsString
  );
  const objectClass =
    objectClassList.length > 0 && objectClassList[0].class
      ? objectClassList[0].class
      : 'no object class provided';
  console.log('object class', objectClass);

  return { datatype, possibleValues, objectClass };
};

export const addUserProfileField = async (
  selectedUser,
  field,
  constraints,
  value,
  term
) => {
  //
  // fetch user profile paths
  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples'
  );
  const userProfilePath =
    userProfileExamplesPath + selectedUser.userId + '.ttl';

  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = addOut(userGraph, field, constraints, value, term);
  const updatedGraphString = await serializeTurtle(updatedGraph);
  console.log('new graph', updatedGraphString);
  await writeFile(userProfilePath, updatedGraphString);
};
