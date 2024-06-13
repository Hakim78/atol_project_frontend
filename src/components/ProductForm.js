import React, { useState, useEffect } from 'react';

const ProductForm = ({ product = {}, onSave, onClose }) => {
  const [formState, setFormState] = useState({
    model: '',
    brand: '',
    madeInFrance: false,
    gender: '',
    material: '',
    frameShape: '',
    frameType: '',
    frameStyle: '',
    frameSize: '',
    manufacturerRef: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormState(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Modèle</label>
              <input
                type="text"
                name="model"
                value={formState.model}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Marque</label>
              <input
                type="text"
                name="brand"
                value={formState.brand}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Fabriqué en France</label>
              <input
                type="checkbox"
                name="madeInFrance"
                checked={formState.madeInFrance}
                onChange={handleChange}
                className="ml-2"
              />
            </div>
            <div>
              <label className="block">Genre</label>
              <input
                type="text"
                name="gender"
                value={formState.gender}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Matière</label>
              <input
                type="text"
                name="material"
                value={formState.material}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Forme de monture</label>
              <input
                type="text"
                name="frameShape"
                value={formState.frameShape}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Type de monture</label>
              <input
                type="text"
                name="frameType"
                value={formState.frameType}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Style de monture</label>
              <input
                type="text"
                name="frameStyle"
                value={formState.frameStyle}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Taille de monture</label>
              <input
                type="text"
                name="frameSize"
                value={formState.frameSize}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Référence fabricant</label>
              <input
                type="text"
                name="manufacturerRef"
                value={formState.manufacturerRef}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
              <label className="block">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formState.imageUrl}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Annuler
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
