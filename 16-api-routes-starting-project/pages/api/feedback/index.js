import fs from 'fs/promises';
import path from 'path';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const feedbackData = {
      id: new Date().toISOString(),
      email,
      feedback
    };

    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const file = await fs.readFile(filePath);
    const fileData = JSON.parse(file);
    fileData.push(feedbackData);

    fs.writeFile(filePath, JSON.stringify(fileData));

    res.status(201).json({ message: 'Add feedback' });
  } else {
    console.log('No no!!!');
  }
}

export default handler;
