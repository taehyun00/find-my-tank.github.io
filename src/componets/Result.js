import { tankResults, quizDimensions } from "../data/data.js";

// 모든 16개 이미지들을 import
import ABOC from "../images/ABOC.png";
import ABOG from "../images/ABOG.png";
import ABTC from "../images/ABTC.png";
import ABTG from "../images/ABTG.png";
import AHOC from "../images/AHOC.png";
import AHOG from "../images/AHOG.png";
import AHTC from "../images/AHTC.png";
import AHTG from "../images/AHTG.png";
import DBOC from "../images/DBOC.png";
import DBOG from "../images/DBOG.png";
import DBTC from "../images/DBTC.png";
import DBTG from "../images/DBTG.png";
import DHOC from "../images/DHOC.png";
import DHOG from "../images/DHOG.png";
import DHTC from "../images/DHTC.png";
import DHTG from "../images/DHTG.png";

// 이미지 매핑 객체 (16개 모두)
const tankImages = {
  'ABOC': ABOC,
  'ABOG': ABOG,
  'ABTC': ABTC,
  'ABTG': ABTG,
  'AHOC': AHOC,
  'AHOG': AHOG,
  'AHTC': AHTC,
  'AHTG': AHTG,
  'DBOC': DBOC,
  'DBOG': DBOG,
  'DBTC': DBTC,
  'DBTG': DBTG,
  'DHOC': DHOC,
  'DHOG': DHOG,
  'DHTC': DHTC,
  'DHTG': DHTG
};

// Quiz.js에서 전달받은 사용자 답변을 기반으로 결과 계산
const calculateResult = () => {
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '[]');
  
  if (userAnswers.length === 0) {
      return 'ABOC'; // 기본값
  }
  
  let resultCode = '';
  
  // quizDimensions의 순서대로 결과 코드 생성
  quizDimensions.forEach(dimension => {
      const userAnswer = userAnswers.find(answer => answer.dimensionId === dimension.id);
      
      if (userAnswer) {
          // 각 차원의 ID에 따라 결과 코드 문자 결정
          switch(dimension.id) {
              case 'AD': // 공격/수비 성향
                  resultCode += userAnswer.score > 0 ? 'A' : 'D';
                  break;
              case 'BH': // 대격돌/보조 성향
                  resultCode += userAnswer.score > 0 ? 'B' : 'H';
                  break;
              case 'OT': // 돌파/전략 성향
                  resultCode += userAnswer.score > 0 ? 'O' : 'T';
                  break;
              case 'CG': // 치명타/점진적 성향
                  resultCode += userAnswer.score > 0 ? 'C' : 'G';
                  break;
              default:
                  resultCode += 'A'; // 기본값
          }
      } else {
          resultCode += 'A'; // 답변이 없는 경우 기본값
      }
  });
  
  return resultCode;
};

export const render = () => {
  const resultCode = calculateResult();
  const tank = tankResults[resultCode];
  
  if (!tank) {
      return `
          <section class="result-screen">
              <div class="result-card">
                  <h2>결과를 찾을 수 없습니다</h2>
                  <p>결과 코드: ${resultCode}</p>
                  <button id="retryButton" class="result-screen__button">
                      다시 시작하기
                  </button>
              </div>
          </section>
      `;
  }
  
  // import된 이미지 사용
  const tankImage = tankImages[resultCode];
  
  return `
      <section class="result-screen">
          <div class="result-card">
              <h2 class="result-card__title">당신의 전차는...</h2>
              
              <div class="result-card__tank">
                  <div class="result-card__image-container">
                      <img 
                          src="${tankImage || ''}" 
                          alt="${tank.name}" 
                          class="result-card__image"
                          style="display: ${tankImage ? 'block' : 'none'};"
                      />
                      <div class="result-card__image-placeholder" style="display: ${tankImage ? 'none' : 'flex'};">
                          🚗 ${tank.name}
                      </div>
                  </div>
                  <h3 class="result-card__name">${tank.name}</h3>
              </div>
              
              <div class="result-card__description">
                  <p>${tank.description}</p>
              </div>
              
              <div class="result-card__code">
                  <small>결과 코드: ${resultCode}</small>
              </div>
              
              <div class="result-card__actions">
                  <button id="retryButton" class="result-screen__button result-screen__button--primary">
                      다시 테스트하기
                  </button>
                  <button id="shareButton" class="result-screen__button result-screen__button--secondary">
                      결과 공유하기
                  </button>
              </div>
          </div>
      </section>
  `;
};

export const attachEvents = () => {
  const retryButton = document.getElementById('retryButton');
  const shareButton = document.getElementById('shareButton');
  
  if (retryButton) {
      retryButton.addEventListener('click', (e) => {
          e.preventDefault();
          // localStorage 초기화
          localStorage.removeItem('userAnswers');
          // Quiz.js의 상태도 초기화 (전역 변수가 있다면)
          if (window.resetQuiz) {
              window.resetQuiz();
          }
          // 홈으로 이동
          window.navigateTo('/');
      });
  }
  
  if (shareButton) {
      shareButton.addEventListener('click', (e) => {
          e.preventDefault();
          const resultCode = calculateResult();
          const tank = tankResults[resultCode];
          
          if (!tank) return;
          
          const shareText = `🚗 나의 전차는 ${tank.name}!\n\n${tank.description}\n\n당신도 테스트해보세요! ${window.location.origin}`;
          
          if (navigator.share) {
              // Web Share API 지원하는 경우
              navigator.share({
                  title: '전차 성향 테스트 결과',
                  text: shareText,
                  url: window.location.origin
              }).catch(err => {
                  console.log('공유 실패:', err);
                  fallbackShare(shareText);
              });
          } else {
              fallbackShare(shareText);
          }
      });
  }
};

// 공유 기능 fallback
const fallbackShare = (shareText) => {
  if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
          alert('결과가 클립보드에 복사되었습니다!');
      }).catch(() => {
          prompt('아래 텍스트를 복사하세요:', shareText);
      });
  } else {
      prompt('아래 텍스트를 복사하세요:', shareText);
  }
};

export default { render, attachEvents };