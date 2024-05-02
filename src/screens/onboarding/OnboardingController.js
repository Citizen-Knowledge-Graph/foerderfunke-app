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

export const fetchOnboardingScreenData = async (onboardingFlow) => {
  const onboardingScreenData = new OnboardingScreenData();
  //
  // fetch datafields
  const datafieldsPath = await AsyncStorage.getItem('datafields');
  const datafieldsString = await readFile(datafieldsPath);
  //
  // fetch onboarding cards from registry
  const onboardingRegistryPath = await AsyncStorage.getItem(
    'onboarding-registry'
  );
  const onboardingCardsPath = await AsyncStorage.getItem('onboarding-cards');
  const onboardingRegistry = await readJson(onboardingRegistryPath);
  //
  // iterate through onboarding cards
  for (let card of onboardingFlow.cards) {
    const { name, index } = card;
    const newOnboardingCards = await fetchOnboardingCards(
      onboardingRegistry,
      onboardingCardsPath,
      name,
      index,
      datafieldsString
    );
    onboardingScreenData.insertOnboardingCards(newOnboardingCards, index);
  }

  return onboardingScreenData;
};

export const fetchOnboardingCards = async (
  onboardingRegistry,
  onboardingCardsPath,
  name,
  index,
  datafieldsString
) => {
  //
  // retrieve onboarding cards from registry
  const cardsPath = onboardingCardsPath + onboardingRegistry[name];
  const onboardingCards = await readJson(cardsPath);
  //
  // new onboarding cards
  const newOnboardingCards = [];
  for (let card of onboardingCards) {
    //
    // fetch datafield properties
    const { datatype, possibleValues, objectClass } =
      await fetchDatafieldProperties(datafieldsString, card.datafield);
    //
    //
    const newInputConstraints = new InputConstraints(
      datatype,
      possibleValues,
      objectClass
    );
    //
    // create onboarding card
    const newOnboardingCard = new OnboardingCard(
      card.datafield,
      card.term,
      card.title,
      card.linkedOnboarding ? card.linkedOnboarding : null,
      newInputConstraints
    );
    newOnboardingCards.push(newOnboardingCard);
  }
  return newOnboardingCards;
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
