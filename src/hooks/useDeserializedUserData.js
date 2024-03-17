import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {parseTurtle} from '../utilities/rdfHandling';

const useDeserializedUserData = () => {
  const serializedUserData = useSelector(state => state.userReducer);
  const [deserializedData, setDeserializedData] = useState(null);

  useEffect(() => {
    const performDeserialization = async () => {
      if (serializedUserData && serializedUserData['user-profile']) {
        try {
          const data = await parseTurtle(serializedUserData['user-profile']);
          setDeserializedData(data);
        } catch (error) {
          console.error('Deserialization error:', error);
        }
      }
    };

    performDeserialization();
  }, [serializedUserData]);

  return deserializedData;
};

export default useDeserializedUserData;
