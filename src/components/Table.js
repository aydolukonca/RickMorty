import React, { useState, useEffect } from "react";
import useFetchAll from "../hooks/useFetchAll";
import "../styles/Table.css";

const Table = () => {
  const { data, loading, error } = useFetchAll("https://rickandmortyapi.com/api/character");
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ name: "", status: "", species: "" });
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  // Filtreleme ve Sayfalama
  useEffect(() => {
    let results = data;

    // Filtreleme
    if (filter.name) {
      results = results.filter((character) =>
        character.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter.status) {
      results = results.filter(
        (character) => character.status.toLowerCase() === filter.status.toLowerCase()
      );
    }
    if (filter.species) {
      results = results.filter((character) =>
        character.species.toLowerCase().includes(filter.species.toLowerCase())
      );
    }

    // Sayfa Sayisini Hesaplama
    setTotalPages(Math.ceil(results.length / pageSize));

    // Anlik secilen sayfanin verilerini gosterme
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = results.slice(startIndex, startIndex + pageSize);

    setFilteredData(paginatedData);
  }, [data, filter, pageSize, currentPage]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setCurrentPage(1); // Filtre degisirse sayfa 1'e donmek icin
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Sayfa boyutu degisirse sayfa 1'e donmek icin
  };

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Rick and Morty Karakter Tablosu</h1>

      {/* Filtreleme Alani */}
      <div className="filter-input">
        <input
          type="text"
          name="name"
          placeholder="İsme göre filtrele"
          onChange={handleFilterChange}
        />
        <select name="status" onChange={handleFilterChange}>
          <option value="">Durum Seç</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          type="text"
          name="species"
          placeholder="Türe göre filtrele"
          onChange={handleFilterChange}
        />
      </div>

      {/* Sayfa Boyutu Ayarlama */}
      <div className="pagination">
        <label>Sayfa Boyutu: </label>
        <select onChange={handlePageSizeChange} value={pageSize}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      {/* Tablo */}
      <table>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Durum</th>
            <th>Tür</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((character) => (
            <tr key={character.id} onClick={() => setSelectedCharacter(character)}>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfa Numaralari (Dropdown) */}
      <div className="pagination">
        <label>Sayfa Seç: </label>
        <select onChange={handlePageChange} value={currentPage}>
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Secilen Karater Detaylari */}
      {selectedCharacter && (
        <div className="character-details">
          <h2>{selectedCharacter.name}</h2>
          <p>Durum: {selectedCharacter.status}</p>
          <p>Tür: {selectedCharacter.species}</p>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
        </div>
      )}
    </div>
  );
};

export default Table;
