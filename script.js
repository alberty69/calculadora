// Seleção dos elementos do visor
const previousOpElement = document.getElementById('previous-op');
const currentOpElement = document.getElementById('current-op');
const buttons = document.querySelectorAll('.btn');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// Atualiza os valores na tela
function updateDisplay() {
  currentOpElement.innerText = currentOperand;
    if (operation != null) {
        previousOpElement.innerText = `${previousOperand} ${operation}`;
          } else {
              previousOpElement.innerText = '';
                }
                }

                // Adiciona número ou ponto decimal
                function appendNumber(number) {
                  if (number === '.' && currentOperand.includes('.')) return;
                    if (currentOperand === '0' && number !== '.') {
                        currentOperand = number;
                          } else {
                              currentOperand += number;
                                }
                                }

                                // Escolhe a operação matemática
                                function chooseOperation(op) {
                                  if (currentOperand === '') return;
                                    if (previousOperand !== '') {
                                        compute();
                                          }
                                            operation = op;
                                              previousOperand = currentOperand;
                                                currentOperand = '';
                                                }

                                                // Realiza o cálculo
                                                function compute() {
                                                  let computation;
                                                    const prev = parseFloat(previousOperand);
                                                      const current = parseFloat(currentOperand);

                                                        if (isNaN(prev) || isNaN(current)) return;

                                                          switch (operation) {
                                                              case '+':
                                                                    computation = prev + current;
                                                                          break;
                                                                              case '-':
                                                                                    computation = prev - current;
                                                                                          break;
                                                                                              case '*':
                                                                                                    computation = prev * current;
                                                                                                          break;
                                                                                                              case '/':
                                                                                                                    if (current === 0) {
                                                                                                                            alert('Divisão por zero não permitida!');
                                                                                                                                    clear();
                                                                                                                                            return;
                                                                                                                                                  }
                                                                                                                                                        computation = prev / current;
                                                                                                                                                              break;
                                                                                                                                                                  case '%':
                                                                                                                                                                        computation = (prev * current) / 100;
                                                                                                                                                                              break;
                                                                                                                                                                                  default:
                                                                                                                                                                                        return;
                                                                                                                                                                                          }

                                                                                                                                                                                            // Evita problemas de precisão decimal do JavaScript
                                                                                                                                                                                              currentOperand = Math.round(computation * 10000000) / 10000000;
                                                                                                                                                                                                currentOperand = currentOperand.toString();
                                                                                                                                                                                                  operation = undefined;
                                                                                                                                                                                                    previousOperand = '';
                                                                                                                                                                                                    }

                                                                                                                                                                                                    // Limpa tudo (Botão C)
                                                                                                                                                                                                    function clear() {
                                                                                                                                                                                                      currentOperand = '0';
                                                                                                                                                                                                        previousOperand = '';
                                                                                                                                                                                                          operation = undefined;
                                                                                                                                                                                                          }

                                                                                                                                                                                                          // Apaga o último caractere (Backspace)
                                                                                                                                                                                                          function backspace() {
                                                                                                                                                                                                            if (currentOperand.length === 1) {
                                                                                                                                                                                                                currentOperand = '0';
                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                      currentOperand = currentOperand.slice(0, -1);
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        // Cliques nos botões da calculadora
                                                                                                                                                                                                                        buttons.forEach(button => {
                                                                                                                                                                                                                          button.addEventListener('click', () => {
                                                                                                                                                                                                                              if (button.dataset.num) {
                                                                                                                                                                                                                                    appendNumber(button.dataset.num);
                                                                                                                                                                                                                                          updateDisplay();
                                                                                                                                                                                                                                              } else if (button.dataset.op) {
                                                                                                                                                                                                                                                    chooseOperation(button.dataset.op);
                                                                                                                                                                                                                                                          updateDisplay();
                                                                                                                                                                                                                                                              } else if (button.dataset.action === 'clear') {
                                                                                                                                                                                                                                                                    clear();
                                                                                                                                                                                                                                                                          updateDisplay();
                                                                                                                                                                                                                                                                              } else if (button.dataset.action === 'backspace') {
                                                                                                                                                                                                                                                                                    backspace();
                                                                                                                                                                                                                                                                                          updateDisplay();
                                                                                                                                                                                                                                                                                              } else if (button.id === 'equal') {
                                                                                                                                                                                                                                                                                                    compute();
                                                                                                                                                                                                                                                                                                          updateDisplay();
                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                // Suporte para atalhos do teclado físico
                                                                                                                                                                                                                                                                                                                document.addEventListener('keydown', (e) => {
                                                                                                                                                                                                                                                                                                                  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
                                                                                                                                                                                                                                                                                                                      appendNumber(e.key);
                                                                                                                                                                                                                                                                                                                          updateDisplay();
                                                                                                                                                                                                                                                                                                                            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                                                                                                                                                                                                                                                                                                                                chooseOperation(e.key);
                                                                                                                                                                                                                                                                                                                                    updateDisplay();
                                                                                                                                                                                                                                                                                                                                      } else if (e.key === '%') {
                                                                                                                                                                                                                                                                                                                                          chooseOperation('%');
                                                                                                                                                                                                                                                                                                                                              updateDisplay();
                                                                                                                                                                                                                                                                                                                                                } else if (e.key === 'Enter' || e.key === '=') {
                                                                                                                                                                                                                                                                                                                                                    e.preventDefault();
                                                                                                                                                                                                                                                                                                                                                        compute();
                                                                                                                                                                                                                                                                                                                                                            updateDisplay();
                                                                                                                                                                                                                                                                                                                                                              } else if (e.key === 'Backspace') {
                                                                                                                                                                                                                                                                                                                                                                  backspace();
                                                                                                                                                                                                                                                                                                                                                                      updateDisplay();
                                                                                                                                                                                                                                                                                                                                                                        } else if (e.key === 'Escape') {
                                                                                                                                                                                                                                                                                                                                                                            clear();
                                                                                                                                                                                                                                                                                                                                                                                updateDisplay();
                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                                                                  