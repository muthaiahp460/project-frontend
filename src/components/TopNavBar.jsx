import { ShoppingCart } from "lucide-react";

const TopNavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-100 p-4">
      <h1 className="text-xl font-bold">STORE</h1>
      <div className="flex gap-4">
        <a href="#" className="text-blue-500 underline">Landscape</a>
        <a href="#" className="text-blue-500 underline">Animals</a>
      </div>
      <div className="flex items-center gap-2">
        <ShoppingCart size={24} />
        <span>0</span>
      </div>
    </nav>
  );
};

export default TopNavBar;
