import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoader(false));
  }, [url]);

  return { data, error, loader };
};
