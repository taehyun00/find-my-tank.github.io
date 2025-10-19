import { quizDimensions } from "../data/data.js";
import { track } from '@vercel/analytics'; // 🔥 추가

let currentDimensionIndex = 0;
let currentQuestionIndex = 0; 
let userAnswers = [];

// Quiz 상태 초기화 함수
export const resetQuiz = () => {
  currentDimensionIndex = 0;
  currentQuestionIndex = 0;
  userAnswers = [];
};

// 전역에서 접근 가능하도록
window.resetQuiz = resetQuiz;

export const render = () => {
  if (currentDimensionIndex >= quizDimensions.length) {
      return ``; 
  }

  const currentDimension = quizDimensions[currentDimensionIndex];
  const question = currentDimension.questions[currentQuestionIndex];
  
  return `
      <section class="quiz-screen quiz-screen--centered">
          <h2 class="quiz-card__question">${question.question}</h2>

          <div class="quiz-card__options" id="quizOptionsContainer">
              ${question.options.map((option, index) => `
                  <button 
                      class="quiz-option" 
                      data-dimension="${currentDimension.id}"
                      data-score="${option.score}"
                      data-question-index="${index}"
                      aria-label="${option.text} 선택"
                  >
                      ${option.text}
                  </button>
              `).join('')}
          </div>

          <p class="quiz-screen__progress">
              ${currentDimensionIndex + 1} / ${quizDimensions.length}
              <span class="sr-only">번째 질문입니다.</span>
          </p>
      </section>
  `;
};

export const attachEvents = () => {
  const optionsContainer = document.getElementById('quizOptionsContainer');

  if (optionsContainer) {
      optionsContainer.addEventListener('click', (e) => {
          const button = e.target.closest('.quiz-option');
          if (!button) return;

          const dimensionId = button.dataset.dimension;
          const score = parseInt(button.dataset.score);
          userAnswers.push({ dimensionId, score });

          // 🔥 답변 이벤트 추적
          track('quiz_answer', { 
              dimension: dimensionId, 
              question: currentDimensionIndex + 1,
              score: score
          });

          currentDimensionIndex++;
          
          // 다음 질문이 있으면 계속, 없으면 결과 페이지로
          if (currentDimensionIndex < quizDimensions.length) {
              window.renderCurrentRoute(); 
          } else {
              console.log('최종 답변:', userAnswers);
              
              // localStorage에 결과 저장
              localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
              
              // 🔥 퀴즈 완료 이벤트 추적
              track('quiz_completed', {
                  total_questions: quizDimensions.length
              });
              
              // 결과 페이지로 이동
              window.navigateTo('/result'); 
          }
      });
  }
};

export default { render, attachEvents };
