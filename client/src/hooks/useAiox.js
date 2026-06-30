import axios from "axios";
import { useEffect, useState } from "react";


export const useAxios = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    if (!url) return;

    const axiosData = async () => {
      setLoading(true); 
      setError(null);   

      try {
        const response = await axios.get(url, options);
        
        setData(response.data); 
      } catch (err) {
   
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false); 
      }
    };

    axiosData();
  }, dependencies); 

  
  return { data, loading, error };
};