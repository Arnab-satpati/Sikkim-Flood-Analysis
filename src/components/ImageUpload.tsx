import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface ImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void;
  images: UploadedImage[];
}

export interface UploadedImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

export function ImageUpload({ onImagesChange, images }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: `${Date.now()}-${Math.random()}`,
            url: e.target?.result as string,
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: 'Click to edit description'
          };
          onImagesChange([...images, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (id: string) => {
    onImagesChange(images.filter(img => img.id !== id));
  };

  const updateImage = (id: string, field: 'title' | 'description', value: string) => {
    onImagesChange(images.map(img =>
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-cyan-500 bg-cyan-500/10'
            : 'border-slate-600 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800/70'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <p className="text-xl font-semibold text-white mb-2">
          Drop images here or click to upload
        </p>
        <p className="text-slate-400">
          Support for PNG, JPG, GIF up to 10MB
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-600 hover:border-cyan-500 transition-all duration-300 group">
              <div className="relative h-48">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => updateImage(image.id, 'title', e.target.value)}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Image title"
                />
                <textarea
                  value={image.description}
                  onChange={(e) => updateImage(image.id, 'description', e.target.value)}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  rows={2}
                  placeholder="Image description"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
