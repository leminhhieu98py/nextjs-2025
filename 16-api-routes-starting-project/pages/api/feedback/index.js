import fs from 'fs/promises';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'data', 'feedback.json');

const getData = async (filePath) => {
  const file = await fs.readFile(filePath);
  const fileData = JSON.parse(file);

  return fileData;
};

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const feedbackData = {
      id: new Date().toISOString(),
      email,
      feedback
    };

    const filePath = getFilePath();
    const fileData = await getData(filePath);

    fileData.push(feedbackData);

    fs.writeFile(filePath, JSON.stringify(fileData));

    res.status(201).json({ message: 'Add feedback' });
  } else {
    const filePath = getFilePath();
    const fileData = await getData(filePath);

    res.status(200).json({ data: fileData });
  }
}

export default handler;
