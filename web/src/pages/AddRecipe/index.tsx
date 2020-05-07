import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import filesize from 'filesize';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Upload from '../../components/Upload';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import { Container, Content, ImportFileContainer } from './styles';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

const AddRecipe: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Your recipe need a title'),
          meal: Yup.string().required('Whats meal is this ?'),
          difficulty: Yup.string().required(
            'Why difficulty to prepare recipe ?',
          ),
          details: Yup.string().required('how do you cook your recipe?'),
        });

        await schema.validate(data, { abortEarly: false });

        const fileData = new FormData();

        if (!uploadedFiles.length) {
          throw new Error('No Image Found');
        }

        fileData.append('file', uploadedFiles[0].file, uploadedFiles[0].name);

        const { data: file } = await api.post('/files', fileData);

        const { data: recipe } = await api.post('/recipes', data);

        await api.put('/recipes', {
          recipe_id: recipe._id,
          image_id: file._id,
        });

        history.push('/');

        toast('🦄 Wow so easy!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        toast.error('⛔️ Something went wrong! try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    [history, uploadedFiles],
  );

  const handleUpload = useCallback((files: File[]): void => {
    const uploadFiles = files.map((file: File) => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(uploadFiles);
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <ImportFileContainer>
          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && <span>Arquivo Enviado com Sucesso</span>}

          {!uploadedFiles.length && (
            <span className="error">Arquivo Ainda não foi Enviado.</span>
          )}
        </ImportFileContainer>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="title" placeholder="Insert title recipe" />

          <Input name="meal" placeholder="Info Meal type" />

          <Input name="difficulty" placeholder="Info Difficulty" />

          <Textarea rows={5} name="details" placeholder="Info Recipe Details" />

          <button type="submit" className="button">
            save and share
          </button>
        </Form>
      </Content>

      <Footer />
    </Container>
  );
};

export default AddRecipe;
