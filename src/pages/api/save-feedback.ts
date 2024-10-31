import { NextApiRequest, NextApiResponse } from 'next';
import { saveFeedback } from '../../server/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = req.body;
    await saveFeedback(data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}