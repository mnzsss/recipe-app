import React, { ReactNode } from 'react';
import { RiImageAddLine } from 'react-icons/ri';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: Function;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragRejest) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <>
      <Dropzone accept="image/*" onDropAccepted={files => onUpload(files)}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <div>
              <RiImageAddLine size={60} color="#EA687E" />
              <span>UPLOAD IMAGE</span>
              <input {...getInputProps()} data-testid="upload" />
              {renderDragMessage(isDragActive, isDragReject)}
            </div>
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
