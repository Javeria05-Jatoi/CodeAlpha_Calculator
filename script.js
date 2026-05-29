// ── Store the current expression ──
let expression = '';

// ── Append number or operator to expression ──
function appendToDisplay(value) {
  // Prevent multiple dots in one number
  if (value === '.') {
    const parts = expression.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
  }

  // Prevent two operators in a row
  const lastChar = expression.slice(-1);
  const operators = ['+', '-', '*', '/'];
  if (operators.includes(lastChar) && operators.includes(value)) {
    expression = expression.slice(0, -1);
  }

  expression += value;

  // Show expression on display
  document.getElementById('expression').textContent = formatExpression(expression);

  // Show live result as you type
  try {
    const live = eval(expression);
    if (!isNaN(live) && isFinite(live)) {
      document.getElementById('result').textContent = parseFloat(live.toFixed(10));
    }
  } catch (e) {
    // Not a complete expression yet — that's fine
  }
}

// ── Calculate final result ──
function calculate() {
  if (expression === '') return;

  try {
    const final = eval(expression);

    if (!isFinite(final)) {
      document.getElementById('result').textContent = 'Error';
      document.getElementById('expression').textContent = '';
      expression = '';
      return;
    }

    const rounded = parseFloat(final.toFixed(10));
    document.getElementById('expression').textContent = formatExpression(expression) + ' =';
    document.getElementById('result').textContent = rounded;
    expression = String(rounded);

  } catch (e) {
    document.getElementById('result').textContent = 'Error';
    document.getElementById('expression').textContent = '';
    expression = '';
  }
}

// ── Clear everything ──
function clearAll() {
  expression = '';
  document.getElementById('expression').textContent = '';
  document.getElementById('result').textContent = '0';
}

// ── Delete last character ──
function deleteLast() {
  expression = expression.slice(0, -1);
  document.getElementById('expression').textContent = formatExpression(expression);

  if (expression === '') {
    document.getElementById('result').textContent = '0';
    return;
  }

  try {
    const live = eval(expression);
    if (!isNaN(live) && isFinite(live)) {
      document.getElementById('result').textContent = parseFloat(live.toFixed(10));
    }
  } catch (e) {}
}

// ── Format expression for display (replace * and / with × ÷) ──
function formatExpression(expr) {
  return expr
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/-/g, ' − ');
}

// ── Keyboard Support (Bonus) ──
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
  else if (e.key === '+') appendToDisplay('+');
  else if (e.key === '-') appendToDisplay('-');
  else if (e.key === '*') appendToDisplay('*');
  else if (e.key === '/') { e.preventDefault(); appendToDisplay('/'); }
  else if (e.key === '.') appendToDisplay('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
});