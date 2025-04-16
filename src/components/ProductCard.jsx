const ProductCard = ({ product }) => {
    return (
      <div className="card bg-base-100 w-96 shadow-sm border-2 p-1">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="card-body border-t">
          <h3 className="card-title text-xl">{product.name}</h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-lg font-bold">{product.price} $</p>
          <div className="card-actions justify-end">
                <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  