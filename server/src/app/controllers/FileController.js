import File from '../schemas/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename, key } = req.file;

    const file = await File.create({
      name,
      hash_name: filename || key,
      path: `http://localhost:3333/files/${filename || key}`,
    });

    return res.json(file);
  }
}

export default new FileController();
