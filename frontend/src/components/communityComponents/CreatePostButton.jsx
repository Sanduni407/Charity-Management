import React from 'react';
import { Plus } from 'lucide-react';

const CreatePostButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-rose-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 md:hidden"
    >
      <Plus className="w-6 h-6 text-white" />
    </button>
  );
};

export default CreatePostButton;