function checkPassword() {
  const password = document.getElementById('password').value;
  const strengthBar = document.getElementById('strength-bar');
  const feedback = document.getElementById('feedback');
  const charCount = document.getElementById('char-count');
  const crackTime = document.getElementById('crack-time');

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Character count
  charCount.textContent = password.length;

  // Crack time estimation (simple logic)
  let timeEstimate = "Very Fast";
  if (password.length >= 10 && strength >= 4) timeEstimate = "Few Days";
  if (password.length >= 12 && strength >= 5) timeEstimate = "Several Years";
  if (password.length >= 16 && strength >= 5) timeEstimate = "Millions of Years";

  crackTime.textContent = password ? timeEstimate : "N/A";

  // Reset bar
  strengthBar.className = '';
  if (strength <= 2) {
    strengthBar.classList.add('fill-weak');
    feedback.textContent = "Weak";
  } else if (strength === 3 || strength === 4) {
    strengthBar.classList.add('fill-medium');
    feedback.textContent = "Medium";
  } else if (strength >= 5) {
    strengthBar.classList.add('fill-strong');
    feedback.textContent = "Strong";
  }
}
