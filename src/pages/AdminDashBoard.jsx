import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrash } from 'react-icons/fa';

function AdminDashboard() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/artworks');
      setArtworks(response.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setError('Failed to fetch artworks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleDelete = async (artworkId) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/artworks/${artworkId}`);
      toast.success('Artwork deleted successfully');
      await fetchArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast.error(error.response?.data?.message || 'Failed to delete artwork');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Art Gallery Management
          </h1>
          <button
            onClick={() => navigate('/upload-artworks')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <FaPlus size={16} />
            Add New Artwork
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-600 bg-red-50 rounded-lg">{error}</div>
          ) : artworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <div
                  key={artwork._id}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-indigo-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate pr-2">
                      {artwork.title}
                    </h3>
                    <button
                      onClick={() => handleDelete(artwork._id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-full"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                  <div>
                    <span className="text-indigo-600 font-medium text-lg">
                      ${artwork.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-1">No artworks yet</p>
              <p className="text-gray-400">Add your first artwork to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
