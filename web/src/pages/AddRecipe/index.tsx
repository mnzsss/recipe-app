import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import filesize from 'filesize';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { FiTrash2, FiPlusSquare } from 'react-icons/fi';

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

interface AddRecipeData {
  image: string;
  title: string;
  description: string;
  prepare_mode: string;
  [key: string]: string;
}

const AddRecipe: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [ingredientsInputs, setIngredients] = useState<string[]>(['']);

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: AddRecipeData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Your recipe need a title'),
          description: Yup.string().required(),
          prepare_mode: Yup.string().required('how do you cook your recipe?'),
        });

        await schema.validate(data, { abortEarly: false });

        const ingredientsKeys = Object.getOwnPropertyNames(data).filter(key =>
          key.includes('ingredient'),
        );

        const ingredients = ingredientsKeys.map(key => data[key]).join('/');

        const recipeData = new FormData();

        if (!uploadedFiles.length) {
          throw new Error('No Image Found');
        }

        recipeData.append('file', uploadedFiles[0].file, uploadedFiles[0].name);
        recipeData.append('title', data.title);
        recipeData.append('difficulty', difficulty);
        recipeData.append('description', data.description);
        recipeData.append('ingredients', ingredients);
        recipeData.append('prepare_mode', data.prepare_mode);

        await api.post('/recipes', recipeData);

        history.push('/');

        toast('🍝 Wow so easy!', {
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
    [difficulty, history, uploadedFiles],
  );

  const handleUpload = useCallback((files: File[]): void => {
    const uploadFiles = files.map((file: File) => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(uploadFiles);
  }, []);

  const handleAddIngredient = useCallback(() => {
    setIngredients(old => [...old, '']);
  }, []);

  const handleRemoveIngredient = useCallback(idx => {
    setIngredients(old => old.filter((s, sidx) => idx !== sidx));
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <ImportFileContainer>
          <h2>Add a beatiful image</h2>

          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && <span>Arquivo Enviado com Sucesso</span>}

          {!uploadedFiles.length && (
            <span className="error">Arquivo Ainda não foi Enviado.</span>
          )}
        </ImportFileContainer>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Add your special recipe</h2>

          <Input name="title" placeholder="Recipe title" />

          <div className="difficulty">
            <h3>What is the difficulty?</h3>

            <div>
              <button
                type="button"
                className={difficulty === 'Easy' ? 'button selected' : 'button'}
                onClick={() => setDifficulty('Easy')}
              >
                Easy
              </button>

              <button
                type="button"
                className={
                  difficulty === 'Medium' ? 'button selected' : 'button'
                }
                onClick={() => setDifficulty('Medium')}
              >
                Medium
              </button>

              <button
                type="button"
                className={difficulty === 'Hard' ? 'button selected' : 'button'}
                onClick={() => setDifficulty('Hard')}
              >
                Hard
              </button>
            </div>
          </div>

          <Textarea
            rows={4}
            name="description"
            placeholder="Talk a little about the recipe"
          />

          <div className="ingredients">
            <h3>List of Ingredients</h3>

            {ingredientsInputs.map((ingredient, idx) => (
              <div className="ingredient" key={`${idx + 1}`}>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="small"
                >
                  <FiTrash2 color="#39008F" size={20} />
                </button>
                <Input
                  name={`${idx + 1}_ingredient`}
                  placeholder="new ingredient"
                />
              </div>
            ))}

            <button type="button" onClick={handleAddIngredient}>
              <FiPlusSquare color="#39008F" size={20} />
              Add new Ingredient
            </button>
          </div>

          <Textarea
            rows={4}
            name="prepare_mode"
            placeholder="How is your recipe prepared?"
          />

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
