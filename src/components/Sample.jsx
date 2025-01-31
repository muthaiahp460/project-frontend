const PaintingCard = ({ image, title, category, price }) => {
    return (
      <div className="painting-card">
        <div className="image-container">
          <img src={image} alt={title} />
        </div>
        <div className="details">
          <div className="title">{title}</div>
          <div className="category">{category}</div>
          <div className="price">A${price}</div>
        </div>
      </div>
    );
  };
  
  export default PaintingCard;
  