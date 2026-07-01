import { Router, Request, Response } from 'express';

const router = Router();

// In-memory mocks for demo/mock mode
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', joined: '2026-05-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Student', status: 'Active', joined: '2026-06-01' },
  { id: '3', name: 'Admin Root', email: 'admin@devverse.ai', role: 'Admin', status: 'Active', joined: '2026-01-01' },
  { id: '4', name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Suspended', joined: '2026-04-10' }
];

const mockFeedback = [
  { id: 'f1', user: 'john@example.com', rating: 5, comment: 'The AI Resume Analyzer is amazing! Helped me match my resume with React roles perfectly.', date: '2026-06-25' },
  { id: 'f2', user: 'jane@example.com', rating: 4, comment: 'Interview Coach is great but would love to have real-time audio analysis soon.', date: '2026-06-27' }
];

const mockAnnouncements = [
  { id: 'a1', title: 'Welcome to DevVerse AI v1.0!', content: 'We are thrilled to launch the ultimate student career development toolkit.', date: '2026-06-20' },
  { id: 'a2', title: 'Upcoming Feature: Live Audio Practice', content: 'Our interview coach module will soon support spoken responses!', date: '2026-06-28' }
];

// Admin Platform Statistics
router.get('/stats', (req: Request, res: Response) => {
  res.json({
    totalUsers: mockUsers.length,
    activeInterviews: 142,
    resumesAnalyzed: 512,
    studyNotesSummarized: 304,
    monthlyGrowth: 18.5,
    userBreakdown: { student: 3, admin: 1 },
    systemHealth: {
      cpuUsage: 24,
      memoryUsage: 62,
      apiLatency: 180 // ms
    }
  });
});

// Manage Users
router.get('/users', (req: Request, res: Response) => {
  res.json(mockUsers);
});

router.put('/users/:id/role', (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = mockUsers.find(u => u.id === id);
  if (user) {
    user.role = role;
    res.json({ message: 'User role updated successfully', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

router.put('/users/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = mockUsers.find(u => u.id === id);
  if (user) {
    user.status = status;
    res.json({ message: 'User status updated successfully', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Announcements
router.get('/announcements', (req: Request, res: Response) => {
  res.json(mockAnnouncements);
});

router.post('/announcements', (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }
  const newAnn = {
    id: `a${mockAnnouncements.length + 1}`,
    title,
    content,
    date: new Date().toISOString().split('T')[0]
  };
  mockAnnouncements.unshift(newAnn);
  res.status(201).json({ message: 'Announcement created successfully', announcement: newAnn });
});

// Feedback Reports
router.get('/feedback', (req: Request, res: Response) => {
  res.json(mockFeedback);
});

export default router;
