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

  charCount.textContent = password.length;

  let timeEstimate = "Very Fast";
  if (password.length >= 10 && strength >= 4) timeEstimate = "Few Days";
  if (password.length >= 12 && strength >= 5) timeEstimate = "Several Years";
  if (password.length >= 16 && strength >= 5) timeEstimate = "Millions of Years";

  crackTime.textContent = password ? timeEstimate : "N/A";

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

function suggestPassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 14; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  document.getElementById('password').value = password;
  checkPassword();
}


function exportCSV() {
  const password = document.getElementById('password').value;
  const feedback = document.getElementById('feedback').textContent;
  const charCount = document.getElementById('char-count').textContent;
  const crackTime = document.getElementById('crack-time').textContent;
  const recommendation = document.getElementById('recommendation').textContent;

  const moreAdvice = `\n
Strong Password Recommendations:
- Minimum Length: 12 characters. Ideal: 16+ characters.
- Include uppercase, lowercase, numbers, and special characters.
- Avoid common words, names, birthdays, and sequences (123456, qwerty).
- Use different passwords for each account.
- Utilize a password manager for storage and generation.
- Consider passphrases like "BlueTiger$Eats99Pasta!" for memorability.
- Use strength meters where possible.
- Change passwords periodically, especially after a suspected compromise.`;
  const csv = `Password,Strength,Length,Crack Time,Recommendation\n"${password}","${feedback}",${charCount},"${crackTime}","${recommendation} ${moreAdvice}"`;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "password_check_result.csv");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function togglePassword() {
  const pwField = document.getElementById('password');
  pwField.type = pwField.type === 'password' ? 'text' : 'password';
}
