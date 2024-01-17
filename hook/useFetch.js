import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': 'b7c09135e4msh33b2ce983600106p1d4620jsnf2f535bde50e',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
  };

  // Função de retorno de dados
  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Realizar o fetch na API
      const response = await axios.request(options)

      if (response.status === 429) {
        const secondsToWait = Number(response.headers["retry-after"])
        await new Promise(resolve => setTimeout(resolve, secondsToWait * 1000))
        return requestWithRateLimit(url, username, password)
      }

      setData(response.data.data);
      setIsLoading(false);

    } catch (error) {
      setError(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useFetch;
