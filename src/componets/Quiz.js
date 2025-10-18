import { quizDimensions } from "../data/data.js";

let currentDimensionIndex = 0;
let currentQuestionIndex = 0; 
let userAnswers = [];

export const render = () => {
    if (currentDimensionIndex >= quizDimensions.length) {
        return `<div>결과를 계산 중입니다...</div>`; 
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

            currentDimensionIndex++;
            
            if (currentDimensionIndex < quizDimensions.length) {
                window.renderCurrentRoute(); 
            } else {
                console.log('최종 답변:', userAnswers);
                
                window.navigateTo('/result'); 
            }
        });
    }
};

export default { render, attachEvents };