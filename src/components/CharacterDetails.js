import React from "react";

const CharacterDetails = ({ character }) => {
  if (!character) return <div>Bir karakter seçin.</div>;

  //API'den gelecek ozellikleri adlandirmak icin.
  return (
    <div>
      <h2>{character.name}</h2>
      <p>Durum: {character.status}</p>
      <p>Tür: {character.species}</p>
      <p>Cinsiyet: {character.gender}</p>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default CharacterDetails;
