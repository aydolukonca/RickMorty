import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAll = (baseUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const allData = [];
        let page = 1;
        let totalPages = 1;

        // İlk istekte toplam sayfa ssayisini alma
        const response = await axios.get(`${baseUrl}?page=${page}`);
        totalPages = response.data.info.pages;

        // İlk sayfadaki veriyi ekleme
        allData.push(...response.data.results);

        // Kalan sayfalari cekme
        for (page = 2; page <= totalPages; page++) {
          const pageResponse = await axios.get(`${baseUrl}?page=${page}`);
          allData.push(...pageResponse.data.results);
        }

        setData(allData);
      } catch (err) {
        setError("Veri çekilirken bir hata oluştu.");
      }
      setLoading(false);
    };

    fetchAllData();
  }, [baseUrl]);

  return { data, loading, error };
};

export default useFetchAll;
