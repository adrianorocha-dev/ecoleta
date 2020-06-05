import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

type Props = {
  onFileChanged: (file: File) => void;
};

const DropZone: React.FC<Props> = ({ onFileChanged }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileChanged(file);
    },
    [onFileChanged]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumnail" />
      ) : isDragActive ? (
        <p>
          <FiUpload />
          Solte a imagem aqui ...
        </p>
      ) : (
        <p>
          <FiUpload />
          Arraste para cá a imagem do estabelecimento
        </p>
      )}
    </div>
  );
};

export default DropZone;
