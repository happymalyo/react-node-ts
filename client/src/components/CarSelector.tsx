import React, { useState, useEffect } from "react";
import { inputSelectStyle } from "./styles";

// Data types
type Brand = "TOYOTA" | "RENAULT";
type ToyotaModel = "Avensis" | "Aygo" | "Prius" | "Yaris";
type RenaultModel = "Clio" | "Espace" | "Mégane" | "Scenic";
type CarModel = ToyotaModel | RenaultModel;

// Car data
// To be more concise, Key should be in Brand type and CarModel should be in CarModel type.
const carData: Record<Brand, CarModel[]> = {
  TOYOTA: ["Avensis", "Aygo", "Prius", "Yaris"],
  RENAULT: ["Clio", "Espace", "Mégane", "Scenic"],
};

const CarSelector = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | "">("");
  const [selectedModel, setSelectedModel] = useState<CarModel | "">("");

  // Set selected model to be empty in the input summary after changing brand
  useEffect(() => {
    setSelectedModel("");
  }, [selectedBrand]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value as Brand);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value as CarModel);
  };

  return (
    <div>
      <h5>Car Selector </h5>
      <div>
        <label htmlFor="brand">Marques :</label>
        <select
          id="brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          style={inputSelectStyle}
        >
          <option value="">Sélectionnez une marque</option>
          {Object.keys(carData).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="model">Modèles :</label>
        <select
          id="model"
          value={selectedModel}
          onChange={handleModelChange}
          disabled={!selectedBrand}
          style={inputSelectStyle}
        >
          <option value="">Sélectionnez un modèle</option>
          {selectedBrand &&
            carData[selectedBrand].map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="recap">Récapitulatif:</label>
        <input
          id="recap"
          type="text"
          value={
            selectedBrand && selectedModel
              ? `${selectedBrand}   ${selectedModel}`
              : ""
          }
          style={inputSelectStyle}
          readOnly
        />
      </div>
    </div>
  );
};

export default CarSelector;
