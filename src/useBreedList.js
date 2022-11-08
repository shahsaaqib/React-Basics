import { useState, useEffect, useDebugValue } from "react";

const localCahce = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useDebugValue("Number of items in cache:" + Object.keys(localCahce).length);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCahce[animal]) {
      setBreedList(localCahce[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCahce[animal] = json.breeds || [];
      setBreedList(localCahce[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
