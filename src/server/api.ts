import { writeFile } from 'fs/promises';
import { appendFile, existsSync } from 'fs';
import { join } from 'path';

export async function saveFeedback(data: { feedback: string; email: string; date: string }) {
  const csvFilePath = join(process.cwd(), 'feedback.csv');
  const csvLine = `${data.feedback.replace(/,/g, ';')},${data.email},${data.date}\n`;

  try {
    if (!existsSync(csvFilePath)) {
      // Create file with headers if it doesn't exist
      await writeFile(csvFilePath, 'feedback,email,date\n');
    }

    // Append the new feedback data
    await new Promise<void>((resolve, reject) => {
      appendFile(csvFilePath, csvLine, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
}