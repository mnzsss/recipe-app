import React, { ReactNode, useState } from 'react';
import { RiImageAddLine } from 'react-icons/ri';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: Function;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return (
        <>
          {selectedFileUrl ? (
            <img src={selectedFileUrl} alt="Point Thumbnail" />
          ) : (
            <UploadMessage>Select ou Drop file here.</UploadMessage>
          )}
        </>
      );
    }

    if (isDragRejest) {
      return (
        <UploadMessage type="error">File type not supported.</UploadMessage>
      );
    }

    return <UploadMessage type="success">Drop file here.</UploadMessage>;
  }

  return (
    <>
      <Dropzone
        accept="image/*"
        onDropAccepted={files => {
          const file = files[0];

          const fileUrl = URL.createObjectURL(file);

          setSelectedFileUrl(fileUrl);

          onUpload(files);
        }}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <div>
              {!selectedFileUrl && (
                <>
                  <RiImageAddLine size={60} color="#EA687E" />
                  <span>UPLOAD IMAGE</span>
                  <input {...getInputProps()} data-testid="upload" />
                </>
              )}
              {renderDragMessage(isDragActive, isDragReject)}
            </div>
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
