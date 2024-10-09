import React from 'react';

interface Image {
  file: File | null;
  preview: string | null;
}

const handleImageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<Image>>
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        file: file,
        preview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }
};

const initialImage: Image = {
  file: null,
  preview: null,
};

export { handleImageUpload, initialImage };
export type { Image };
