import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} className="detail-image" />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <Link to="/products">Back to Products</Link>
    </div>
  );
};

export default ProductDetails;
