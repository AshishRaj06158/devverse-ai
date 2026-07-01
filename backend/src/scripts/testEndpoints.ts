// Test endpoints using native global fetch

const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('==================================================');
  console.log('🧪 DEVVERSE AI - ENDPOINT INTEGRATION VERIFIER   ');
  console.log('==================================================\n');

  // Test 1: Health Check / Home
  try {
    const res = await fetch(`${BASE_URL}/`);
    console.log(`[TEST 1] Root Health Status: ${res.status === 200 ? '✅ PASS' : '❌ FAIL'} (${res.status})`);
  } catch (err: any) {
    console.log('[TEST 1] Root Health Status: ❌ FAILED TO CONNECT - Is the server running?', err.message);
  }

  // Test 2: AI Resume Analyzer
  try {
    const res = await fetch(`${BASE_URL}/api/ai/analyze-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Ashish Raj - React developer with Node experience', jobRole: 'Frontend Engineer' })
    });
    const data = await res.json() as any;
    const hasKeys = data && data.atsScore !== undefined;
    console.log(`[TEST 2] AI Resume Analyzer: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status}, ATS Score: ${data?.atsScore}%)`);
  } catch (err: any) {
    console.log('[TEST 2] AI Resume Analyzer: ❌ ERROR', err.message);
  }

  // Test 3: AI Resume Bullets Improver
  try {
    const res = await fetch(`${BASE_URL}/api/ai/improve-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'I wrote some html code', role: 'Web Developer' })
    });
    const data = await res.json() as any;
    const hasKeys = data && data.improvedContent !== undefined;
    console.log(`[TEST 3] Resume Bullets Improver: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status})`);
  } catch (err: any) {
    console.log('[TEST 3] Resume Bullets Improver: ❌ ERROR', err.message);
  }

  // Test 4: AI Cover Letter Generator
  try {
    const res = await fetch(`${BASE_URL}/api/ai/cover-letter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName: 'Stripe', role: 'Full Stack Engineer', jobDescription: 'React Node development' })
    });
    const data = await res.json() as any;
    const hasKeys = data && data.coverLetter !== undefined;
    console.log(`[TEST 4] Cover Letter Generator: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status})`);
  } catch (err: any) {
    console.log('[TEST 4] Cover Letter Generator: ❌ ERROR', err.message);
  }

  // Test 5: AI Interview Questions
  try {
    const res = await fetch(`${BASE_URL}/api/ai/interview/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'React Developer', difficulty: 'Intermediate' })
    });
    const data = await res.json() as any;
    const hasKeys = data && Array.isArray(data.questions);
    console.log(`[TEST 5] Interview Questions Gen: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status}, Questions Count: ${data?.questions?.length})`);
  } catch (err: any) {
    console.log('[TEST 5] Interview Questions Gen: ❌ ERROR', err.message);
  }

  // Test 6: AI Interview Feedback
  try {
    const res = await fetch(`${BASE_URL}/api/ai/interview/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'React Developer',
        QAs: [{ question: 'What is DOM?', answer: 'Document Object Model interface.' }]
      })
    });
    const data = await res.json() as any;
    const hasKeys = data && data.overallRating !== undefined;
    console.log(`[TEST 6] Interview Coach Feedback: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status}, Rating: ${data?.overallRating}%)`);
  } catch (err: any) {
    console.log('[TEST 6] Interview Coach Feedback: ❌ ERROR', err.message);
  }

  // Test 7: Notes Summarizer
  try {
    const res = await fetch(`${BASE_URL}/api/ai/summarize-notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'SOLID Principles Single Responsibility means one reason to change.' })
    });
    const data = await res.json() as any;
    const hasKeys = data && data.summary !== undefined;
    console.log(`[TEST 7] Notes Summarizer API: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status}, Chapters: ${data?.chapters?.length})`);
  } catch (err: any) {
    console.log('[TEST 7] Notes Summarizer API: ❌ ERROR', err.message);
  }

  // Test 8: PYQ Analyzer
  try {
    const res = await fetch(`${BASE_URL}/api/ai/analyze-pyq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Explain TCP vs UDP 5 times. Explain Virtual memory 4 times.' })
    });
    const data = await res.json() as any;
    const hasKeys = data && data.repeatedQuestions !== undefined;
    console.log(`[TEST 8] PYQ Analyzer API: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status}, Repeated Questions Count: ${data?.repeatedQuestions?.length})`);
  } catch (err: any) {
    console.log('[TEST 8] PYQ Analyzer API: ❌ ERROR', err.message);
  }

  // Test 9: Admin Statistics
  try {
    const res = await fetch(`${BASE_URL}/api/admin/stats`);
    const data = await res.json() as any;
    const hasKeys = data && data.totalUsers !== undefined;
    console.log(`[TEST 9] Admin stats API: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status}, Total Users: ${data?.totalUsers})`);
  } catch (err: any) {
    console.log('[TEST 9] Admin stats API: ❌ ERROR', err.message);
  }

  // Test 10: Admin Developer Directory
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users`);
    const data = await res.json() as any;
    const hasKeys = Array.isArray(data);
    console.log(`[TEST 10] Admin Directory API: ${hasKeys ? '✅ PASS' : '❌ FAIL'} (Status: ${res.status}, Users Count: ${data?.length})`);
  } catch (err: any) {
    console.log('[TEST 10] Admin Directory API: ❌ ERROR', err.message);
  }

  console.log('\n==================================================');
  console.log('🏁 INTEGRATION TESTS CONCLUDED                    ');
  console.log('==================================================');
}

runTests();
