import { Request, Response } from 'express';
import { model } from '../config/gemini';
import pdfParse from 'pdf-parse';

// Utility helper to extract JSON from a Gemini response string
function parseGeminiJSON(text: string, fallback: any): any {
  try {
    // Look for JSON markdown block or general JSON boundaries
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse Gemini JSON:', err, 'Raw text:', text);
    return fallback;
  }
}

// 1. AI Resume Analyzer
export const analyzeResume = async (req: Request, res: Response): Promise<void> => {
  try {
    let resumeText = req.body.text || '';
    const jobRole = req.body.jobRole || 'Software Engineer';

    if (req.file) {
      const dataBuffer = req.file.buffer;
      const parsedPdf = await pdfParse(dataBuffer);
      resumeText = parsedPdf.text;
    }

    if (!resumeText) {
      res.status(400).json({ error: 'No resume text or PDF uploaded' });
      return;
    }

    if (model) {
      const prompt = `
        You are an expert ATS (Applicant Tracking System) reviewer and hiring manager. 
        Analyze the following resume text specifically for the role of "${jobRole}".
        
        Resume text:
        ${resumeText.substring(0, 8000)}

        Evaluate and return a JSON object with the exact keys:
        {
          "atsScore": number (0-100),
          "grammarScore": number (0-100),
          "formattingScore": number (0-100),
          "keywordMatch": number (0-100),
          "missingSkills": string[],
          "suggestions": [{"title": string, "description": string}],
          "suggestedJobRoles": string[]
        }
        Respond with ONLY the JSON object. Do not write explanations outside the JSON.
      `;

      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const parsed = parseGeminiJSON(responseText, null);
        if (parsed) {
          res.json(parsed);
          return;
        }
      } catch (geminiErr) {
        console.error('Gemini Resume Analysis Error:', geminiErr);
      }
    }

    // High fidelity Mock Fallback
    console.log('Operating in Mock Mode for Resume Analysis');
    const skillsFound = ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Python', 'Git', 'SQL', 'TypeScript'];
    const resumeLower = resumeText.toLowerCase();
    const matches = skillsFound.filter(s => resumeLower.includes(s.toLowerCase()));
    const missing = ['Docker', 'AWS', 'CI/CD Pipelines', 'System Design', 'Kubernetes', 'GraphQL'].filter(
      s => !resumeLower.includes(s.toLowerCase())
    );

    const matchPercent = Math.min(100, Math.round((matches.length / skillsFound.length) * 100));
    const atsScore = Math.max(55, Math.min(95, 60 + matches.length * 4));
    
    res.json({
      atsScore,
      grammarScore: Math.floor(Math.random() * 15) + 80,
      formattingScore: Math.floor(Math.random() * 10) + 85,
      keywordMatch: matchPercent,
      missingSkills: missing.slice(0, 4),
      suggestions: [
        {
          title: 'Add quantitative metrics',
          description: 'Quantify your impact on past projects (e.g., "improved load time by 30%" or "managed team of 5").'
        },
        {
          title: 'Integrate missing core keywords',
          description: `Add mentions of relevant backend or DevOps tools such as: ${missing.slice(0, 3).join(', ')} to boost ATS readability.`
        },
        {
          title: 'Strengthen action verbs',
          description: 'Begin experience bullet points with powerful action words like "Led", "Designed", "Engineered", and "Optimized" rather than "Responsible for".'
        }
      ],
      suggestedJobRoles: [jobRole, 'Full Stack Developer', 'Software Engineer', 'Frontend Engineer']
    });
  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: error.message || 'Server error during resume analysis' });
  }
};

// 2. AI Resume Bullets Improver
export const improveResumeContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, role } = req.body;
    if (!content) {
      res.status(400).json({ error: 'No content to improve provided' });
      return;
    }

    if (model) {
      const prompt = `
        You are a professional resume writer. Rewrite the following resume bullet point or paragraph to make it look professional, metric-driven, and tailored for a "${role || 'Developer'}" role.
        
        Original Content:
        "${content}"
        
        Respond with a JSON object:
        {
          "improvedContent": "string"
        }
        Respond with ONLY JSON.
      `;
      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const parsed = parseGeminiJSON(responseText, null);
        if (parsed && parsed.improvedContent) {
          res.json({ improvedContent: parsed.improvedContent });
          return;
        }
      } catch (geminiErr) {
        console.error('Gemini Resume Improve Error:', geminiErr);
      }
    }

    // Mock Fallback
    res.json({
      improvedContent: `Successfully engineered and scaled high-performance client solutions for ${role || 'Developer'} role, driving a 25% increase in operational efficiency and optimizing modular UI response speeds by 35%.`
    });
  } catch (error: any) {
    console.error('Error improving resume content:', error);
    res.status(500).json({ error: error.message });
  }
};

// 3. AI Cover Letter Generator
export const generateCoverLetter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { jobDescription, companyName, role, resumeText } = req.body;

    if (!role || !companyName) {
      res.status(400).json({ error: 'Role and Company Name are required' });
      return;
    }

    if (model) {
      const prompt = `
        Write a professional cover letter.
        Company: ${companyName}
        Role: ${role}
        Job Description details: ${jobDescription || 'Standard software engineering role'}
        Resume context: ${resumeText || 'Enthusiastic applicant with coding background'}
        
        Respond with a JSON object:
        {
          "coverLetter": "string containing formatted cover letter with newlines"
        }
        Respond with ONLY JSON.
      `;
      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const parsed = parseGeminiJSON(responseText, null);
        if (parsed && parsed.coverLetter) {
          res.json(parsed);
          return;
        }
      } catch (geminiErr) {
        console.error('Gemini Cover Letter Error:', geminiErr);
      }
    }

    // Mock Fallback
    const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${role} position at ${companyName}. With my solid foundation in software development, combined with my hands-on experience building full-stack applications, I am confident in my ability to make an immediate impact on your engineering team.

In my previous projects, I have demonstrated a strong command of modern web technologies, designing highly modular architectures and optimizing client-side performance. The opportunity to contribute to ${companyName}'s vision is incredibly exciting to me, as I align closely with your dedication to innovation and engineering excellence.

Thank you for your time and consideration. I look forward to the opportunity to discuss how my skills and background align with the needs of your team.

Sincerely,
[Your Name]`;

    res.json({ coverLetter: letter });
  } catch (error: any) {
    console.error('Error generating cover letter:', error);
    res.status(500).json({ error: error.message });
  }
};

// 4. AI Interview Coach - Questions
export const generateInterviewQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, difficulty } = req.body;
    const selectedRole = role || 'Software Developer';
    const selectedDifficulty = difficulty || 'Intermediate';

    if (model) {
      const prompt = `
        You are an elite interviewer. Generate 5 interview questions for a candidate applying for the role of "${selectedRole}" at "${selectedDifficulty}" level.
        Mix core technical questions, problem-solving scenarios, and behavioral/system questions.
        
        Return a JSON array of questions, like:
        [
          {"id": 1, "question": "string", "category": "Technical | Behavioral | System"},
          ...
        ]
        Respond with ONLY the JSON array.
      `;
      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const parsed = parseGeminiJSON(responseText, null);
        if (parsed && Array.isArray(parsed)) {
          res.json({ questions: parsed });
          return;
        }
      } catch (geminiErr) {
        console.error('Gemini Interview Questions Error:', geminiErr);
      }
    }

    // Mock Fallback
    res.json({
      questions: [
        { id: 1, question: `Describe a challenging technical problem you solved while working on a ${selectedRole} application. What was the impact?`, category: 'Technical' },
        { id: 2, question: 'How do you handle disagreements with team members regarding architectural decisions?', category: 'Behavioral' },
        { id: 3, question: 'Explain the difference between SQL and NoSQL databases, and when you would choose one over the other.', category: 'Technical' },
        { id: 4, question: 'How do you optimize web application performance on the client-side?', category: 'System' },
        { id: 5, question: 'What is your understanding of RESTful API design principles and how do you secure endpoints?', category: 'Technical' }
      ]
    });
  } catch (error: any) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({ error: error.message });
  }
};

// 4. AI Interview Coach - Feedback
export const evaluateInterviewAnswers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, QAs } = req.body; // Array of { question: string, answer: string }

    if (!QAs || !Array.isArray(QAs)) {
      res.status(400).json({ error: 'QAs array is required' });
      return;
    }

    if (model) {
      const prompt = `
        You are an AI Interview Coach. Evaluate the candidate's answers to the questions for a "${role || 'Developer'}" interview.
        
        Interview details:
        ${JSON.stringify(QAs)}

        Evaluate and return a JSON object with scores out of 100, and feedback:
        {
          "technicalScore": number,
          "communicationScore": number,
          "confidenceScore": number,
          "grammarScore": number,
          "overallRating": number,
          "generalFeedback": "string",
          "breakdown": [
            {"question": "string", "rating": number, "feedback": "string", "betterAnswer": "string"}
          ]
        }
        Respond with ONLY JSON.
      `;
      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const parsed = parseGeminiJSON(responseText, null);
        if (parsed) {
          res.json(parsed);
          return;
        }
      } catch (geminiErr) {
        console.error('Gemini Interview Feedback Error:', geminiErr);
      }
    }

    // Mock Fallback
    const breakdown = QAs.map((qa, index) => {
      const ansLength = qa.answer ? qa.answer.trim().length : 0;
      const score = ansLength > 100 ? 85 : ansLength > 20 ? 70 : 45;
      return {
        question: qa.question,
        rating: score,
        feedback: ansLength > 100 
          ? 'Great depth and detail. Good explanation of technical components.' 
          : 'Answer is too brief. Try to structure your response using the STAR method (Situation, Task, Action, Result).',
        betterAnswer: `To improve, you could add: "In my experience, I resolved this by... which yielded a successful result of..." adding metric-based success stories.`
      };
    });

    const sum = breakdown.reduce((acc, b) => acc + b.rating, 0);
    const overallRating = Math.round(sum / breakdown.length);

    res.json({
      technicalScore: overallRating - 2,
      communicationScore: Math.min(100, overallRating + 3),
      confidenceScore: Math.min(100, overallRating + 1),
      grammarScore: Math.min(100, overallRating + 5),
      overallRating,
      generalFeedback: 'You did a solid job overall. Focus on elaborating more with structured examples and demonstrating confidence during technical explanations.',
      breakdown
    });
  } catch (error: any) {
    console.error('Error evaluating interview answers:', error);
    res.status(500).json({ error: error.message });
  }
};

// 5. Notes Summarizer
export const summarizeNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    let notesText = req.body.text || '';

    if (req.file) {
      const dataBuffer = req.file.buffer;
      const parsedPdf = await pdfParse(dataBuffer);
      notesText = parsedPdf.text;
    }

    if (!notesText) {
      res.status(400).json({ error: 'No notes text or PDF uploaded' });
      return;
    }

    if (model) {
      const prompt = `
        Summarize the following educational study notes. 
        Create detailed notes summary, chapter-wise breakdown, flashcards, a mock quiz, and a mind map structure.
        
        Notes content:
        ${notesText.substring(0, 8000)}

        Return a JSON object:
        {
          "summary": "string overview",
          "chapters": [{"title": "string", "content": "string"}],
          "flashcards": [{"question": "string", "answer": "string"}],
          "quiz": [{"question": "string", "options": ["string"], "correctAnswer": "string", "explanation": "string"}],
          "mindMap": {
            "name": "Root Concept",
            "children": [
              {
                "name": "Subconcept Name",
                "children": [{"name": "Child Concept"}]
              }
            ]
          }
        }
        Respond with ONLY the JSON object.
      `;
      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const parsed = parseGeminiJSON(responseText, null);
        if (parsed) {
          res.json(parsed);
          return;
        }
      } catch (geminiErr) {
        console.error('Gemini Notes Summarizer Error:', geminiErr);
      }
    }

    // Mock Fallback
    console.log('Operating in Mock Mode for Notes Summarizer');
    res.json({
      summary: 'This note covers key concepts in software architecture and design patterns, focusing on modularity, clean code principles, and scaling full-stack applications.',
      chapters: [
        {
          title: 'Chapter 1: Principles of Modularity',
          content: 'Modularity involves dividing a software system into multiple independent, exchangeable modules. This separation of concerns allows developers to build systems in isolation, improving testability and code quality.'
        },
        {
          title: 'Chapter 2: Design Patterns & SOLID',
          content: 'SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) form the backbone of robust object-oriented system design, allowing code to adapt to business rules changes without core refactoring.'
        }
      ],
      flashcards: [
        { question: 'What does the S in SOLID stand for?', answer: 'Single Responsibility Principle: A class or module should have one, and only one, reason to change.' },
        { question: 'What is Modularity?', answer: 'The degree to which a system\'s components may be separated and recombined, often with the benefit of flexibility and variety.' }
      ],
      quiz: [
        {
          question: 'Which design pattern is best suited for notifying multiple observer objects about changes in state?',
          options: ['Singleton Pattern', 'Observer Pattern', 'Factory Pattern', 'Decorator Pattern'],
          correctAnswer: 'Observer Pattern',
          explanation: 'The Observer Pattern creates a subscription model to notify multiple objects about any events that happen to the object they\'re observing.'
        },
        {
          question: 'What is the primary goal of the Single Responsibility Principle?',
          options: ['Ensure classes are small', 'Reduce code coupling', 'Ensure a class has only one reason to change', 'Improve database normalization'],
          correctAnswer: 'Ensure a class has only one reason to change',
          explanation: 'The Single Responsibility Principle asserts that a class should gather only features that serve a single organizational goal, giving it only one reason to change.'
        }
      ],
      mindMap: {
        name: 'Software Engineering Core',
        children: [
          {
            name: 'SOLID Principles',
            children: [
              { name: 'Single Responsibility' },
              { name: 'Open/Closed' },
              { name: 'Dependency Inversion' }
            ]
          },
          {
            name: 'Architectural Styles',
            children: [
              { name: 'Monolithic' },
              { name: 'Microservices' },
              { name: 'Serverless' }
            ]
          }
        ]
      }
    });
  } catch (error: any) {
    console.error('Error in notes summarizer:', error);
    res.status(500).json({ error: error.message });
  }
};

// 6. PYQ Analyzer
export const analyzePYQ = async (req: Request, res: Response): Promise<void> => {
  try {
    let pyqText = req.body.text || '';

    if (req.file) {
      const dataBuffer = req.file.buffer;
      const parsedPdf = await pdfParse(dataBuffer);
      pyqText = parsedPdf.text;
    }

    if (!pyqText) {
      res.status(400).json({ error: 'No PYQ text or PDF uploaded' });
      return;
    }

    if (model) {
      const prompt = `
        Analyze the following text extracted from Previous Year Examination Papers.
        Identify:
        - Most repeatedly asked questions/topics and their frequencies.
        - Difficulty distribution of topics.
        - Topics distribution.
        - Top 3 predicted questions for the upcoming exam.
        
        Text:
        ${pyqText.substring(0, 8000)}

        Return a JSON object:
        {
          "repeatedQuestions": [{"question": "string", "frequency": number, "topic": "string"}],
          "topicDistribution": [{"topic": "string", "count": number}],
          "difficultyAnalysis": [{"level": "Easy" | "Medium" | "Hard", "percentage": number}],
          "predictedQuestions": [{"question": "string", "topic": "string", "probability": number}]
        }
        Respond with ONLY the JSON object.
      `;
      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const parsed = parseGeminiJSON(responseText, null);
        if (parsed) {
          res.json(parsed);
          return;
        }
      } catch (geminiErr) {
        console.error('Gemini PYQ Analyzer Error:', geminiErr);
      }
    }

    // Mock Fallback
    console.log('Operating in Mock Mode for PYQ Analyzer');
    res.json({
      repeatedQuestions: [
        { question: 'Explain the difference between TCP and UDP with header structures.', frequency: 5, topic: 'Computer Networks' },
        { question: 'What is Virtual Memory? Explain the demand paging mechanism.', frequency: 4, topic: 'Operating Systems' },
        { question: 'Define Normalization. Explain 1NF, 2NF, 3NF, and BCNF with examples.', frequency: 3, topic: 'Database Systems' }
      ],
      topicDistribution: [
        { topic: 'Computer Networks', count: 12 },
        { topic: 'Operating Systems', count: 8 },
        { topic: 'Database Systems', count: 6 },
        { topic: 'Data Structures', count: 5 }
      ],
      difficultyAnalysis: [
        { level: 'Easy', percentage: 30 },
        { level: 'Medium', percentage: 50 },
        { level: 'Hard', percentage: 20 }
      ],
      predictedQuestions: [
        { question: 'Design an efficient client-server chat application protocol over TCP.', topic: 'Computer Networks', probability: 92 },
        { question: 'Analyze and implement the Banker\'s Algorithm for deadlock avoidance.', topic: 'Operating Systems', probability: 85 },
        { question: 'Explain two-phase locking protocol and database transaction ACID properties.', topic: 'Database Systems', probability: 78 }
      ]
    });
  } catch (error: any) {
    console.error('Error in PYQ analyzer:', error);
    res.status(500).json({ error: error.message });
  }
};

// 8. LMS AI Assistant (Lesson Summarizer / Questions generator)
export const summarizeAcademyLesson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, textContext } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt query parameters are required' });
      return;
    }

    if (model) {
      const gPrompt = `
        You are an expert AI tutor. 
        Analyze the following lesson context and answer the student query.
        
        Lesson context:
        ${textContext}

        Student query/action request:
        ${prompt}

        Return a clear, engaging, and professional response. If flashcards are requested, output them as numbered list.
      `;
      const result = await model.generateContent(gPrompt);
      const text = await result.response.text();
      res.json({ result: text });
      return;
    }

    // Mock Fallback
    res.json({
      result: `[Mock AI Assistant]: Successfully evaluated prompt "${prompt}". The lesson outlines core web routing directives, React suspense parameters, and modular UI structure guidelines.`
    });
  } catch (error: any) {
    console.error('Error in LMS assistant:', error);
    res.status(500).json({ error: error.message });
  }
};

