import { Router } from 'express';
import multer from 'multer';
import {
  analyzeResume,
  improveResumeContent,
  generateCoverLetter,
  generateInterviewQuestions,
  evaluateInterviewAnswers,
  summarizeNotes,
  analyzePYQ,
  summarizeAcademyLesson
} from '../controllers/aiController';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // limit 10MB
  }
});

// AI Routes
router.post('/analyze-resume', upload.single('file'), analyzeResume);
router.post('/improve-resume', improveResumeContent);
router.post('/cover-letter', generateCoverLetter);
router.post('/interview/questions', generateInterviewQuestions);
router.post('/interview/feedback', evaluateInterviewAnswers);
router.post('/summarize-notes', upload.single('file'), summarizeNotes);
router.post('/analyze-pyq', upload.single('file'), analyzePYQ);
router.post('/academy/summarize', summarizeAcademyLesson);

export default router;
