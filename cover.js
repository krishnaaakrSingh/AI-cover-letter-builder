const skillsInput = document.getElementById('userSkills');
const charCount = document.getElementById('charCount');

skillsInput.addEventListener('input', function() {
  charCount.textContent = this.value.length;
});

async function generateLetter() {
  const name = document.getElementById('userName').value.trim();
  const job = document.getElementById('jobRole').value.trim();
  const company = document.getElementById('companyName').value.trim();
  const skills = document.getElementById('userSkills').value.trim();
  const outputText = document.getElementById('outputText');
  const btn = document.querySelector('.btn');

  if (!name || !job || !company || !skills) {
    alert('All Fields Are Mandatory');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Generating...';
  outputText.style.color = '#888';
  outputText.textContent = 'AI Generating Your Cover Letter...';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model:'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: `Write a professional cover letter for:
Name: ${name}
Job Role: ${job}
Company: ${company}
Skills: ${skills}

Write a compelling, professional cover letter. Keep it concise and impactful.`
          }
        ]
      })
    });

    const data = await response.json();
    const letter = data.choices[0].message.content;
    outputText.style.color = '#333';
    outputText.textContent = letter;

  } catch (error) {
    outputText.textContent = 'Error: ' + error.message;
  }

  btn.disabled = false;
  btn.textContent = 'Generate Cover Letter';
}

function copyLetter() {
  const text = document.getElementById('outputText').textContent;
  if (text === 'Your AI generated cover letter will appear here...') {
    alert('First generate the cover letter');
    return;
  }
  navigator.clipboard.writeText(text);
  alert(' Copy Done');
    }
