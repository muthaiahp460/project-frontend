import PaintingCard from "./PaintingCard";
import image1 from "../assets/image.png";
import TopNavBar from "./TopNavBar";

const paintings = [
  { image: image1, title: "Color Bird", category: "Animals", price: 200 }
];

const Gallery = () => {
  return (
    <>
    <TopNavBar />
        <div className="gallery">
        {paintings.map((painting, index) => (
            <PaintingCard key={index} {...painting} />
        ))}
        </div>
    </>
    
  );
};

export default Gallery;
