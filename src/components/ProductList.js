import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      if (response.data.length > 0) {
        setActiveProduct(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      await axios.post('/api/products', newProduct);
      fetchProducts();
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct);
      fetchProducts();
      setShowEditForm(false);
      setProductToEdit(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setActiveProduct(products[index]),
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Liste des produits</h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus className="mr-2" /> Ajouter un produit
        </button>
      </div>
      {products.length === 0 ? (
        <p className="text-gray-500">Aucun produit disponible.</p>
      ) : (
        <div className="flex flex-col space-y-6">
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="w-full max-w-lg mx-auto">
                <Slider {...settings} className="w-full h-full">
                  {products.map((product) => (
                    <div key={product._id} className="relative">
                      <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.model} className="mx-auto h-64 object-cover rounded-lg shadow-md" />
                      <div className="absolute top-0 right-0 flex space-x-2 p-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                          onClick={() => {
                            setProductToEdit(product);
                            setShowEditForm(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            {activeProduct && (
              <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">{activeProduct.model}</h2>
                <p><strong>Marque :</strong> {activeProduct.brand}</p>
                <p><strong>Fabriqué en France :</strong> {activeProduct.madeInFrance ? 'Oui' : 'Non'}</p>
                <p><strong>Genre :</strong> {activeProduct.gender}</p>
                <p><strong>Matière :</strong> {activeProduct.material}</p>
                <p><strong>Forme de monture :</strong> {activeProduct.frameShape}</p>
                <p><strong>Type de monture :</strong> {activeProduct.frameType}</p>
                <p><strong>Style de monture :</strong> {activeProduct.frameStyle}</p>
                <p><strong>Taille de monture :</strong> {activeProduct.frameSize}</p>
                <p><strong>Référence fabricant :</strong> {activeProduct.manufacturerRef}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {showAddForm && (
        <ProductForm
          onSave={addProduct}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {showEditForm && productToEdit && (
        <ProductForm
          product={productToEdit}
          onSave={updateProduct}
          onClose={() => {
            setShowEditForm(false);
            setProductToEdit(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
