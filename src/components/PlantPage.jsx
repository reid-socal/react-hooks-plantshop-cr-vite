import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Failed to fetch plants:", err));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants((currentPlants) => [...currentPlants, newPlant]);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;