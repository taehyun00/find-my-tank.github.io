import { tankResults, quizDimensions } from "../data/data.js";

// 이미지 경로를 직접 문자열로 관리 (절대 경로로 수정)
const tankImages = {
  'ABOC': '/src/images/ABOC.png',
  'ABOG': '/src/images/ABOG.png',
  'ABTC': '/src/images/ABTC.png',
  'ABTG': '/src/images/ABTG.png',
  'AHOC': '/src/images/AHOC.png',
  'AHOG': '/src/images/AHOG.png',
  'AHTC': '/src/images/AHTC.png',
  'AHTG': '/src/images/AHTG.png',
  'DBOC': '/src/images/DBOC.png',
  'DBOG': '/src/images/DBOG.png',
  'DBTC': '/src/images/DBTC.png',
  'DBTG': '/src/images/DBTG.png',
  'DHOC': '/src/images/DHOC.png',
  'DHOG': '/src/images/DHOG.png',
  'DHTC': '/src/images/DHTC.png',
  'DHTG': '/src/images/DHTG.png'
};

// 🔥 카카오 SDK 초기화
const initKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init('6ff01bbe44a68cffc1a733ee16f5924a'); // 🔑 발급받은 키 입력
    console.log('카카오 SDK 초기화 완료:', window.Kakao.isInitialized());
  }
};

// 🔥 카카오톡 공유하기 함수
const shareKakao = (resultCode) => {
  const tank = tankResults[resultCode];
  const tankImage = tankImages[resultCode];
  const currentURL = window.location.origin;

  // 절대 경로로 이미지 URL 생성
  const imageURL = window.location.origin + tankImage;

  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: `반갑다 나 ${tank.name}인데... \n 니 탱크는 안궁금하냐`,
      description: "2차 세계대전에 펜타킬 함께한 탱크 알아보기",
      imageUrl: imageURL,
      link: {
        mobileWebUrl: currentURL,
        webUrl: currentURL,
      },
    },
    buttons: [
      {
        title: '검사하러가기',
        link: {
          mobileWebUrl: currentURL,
          webUrl: currentURL,
        },
      },
    ],
    installTalk: true, // 카카오톡 미설치 시 설치 유도
  });
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
  
  // 🔥 카카오 SDK 초기화
  setTimeout(() => initKakao(), 100);
  
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
                  <button id="kakaoShareButton" class="result-screen__button result-screen__button--kakao">
                      카카오톡 공유하기
                  </button>
              </div>
          </div>
      </section>
  `;
};

export const attachEvents = () => {
  const retryButton = document.getElementById('retryButton');
  const shareButton = document.getElementById('shareButton');
  const kakaoShareButton = document.getElementById('kakaoShareButton'); // 🔥 카카오 공유 버튼
  
  // 다시 테스트하기 버튼
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
  
  // 🔥 카카오톡 공유하기 버튼
  if (kakaoShareButton) {
      kakaoShareButton.addEventListener('click', (e) => {
          e.preventDefault();
          const resultCode = calculateResult();
          
          if (!window.Kakao || !window.Kakao.isInitialized()) {
              alert('카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
              initKakao();
              return;
          }
          
          shareKakao(resultCode);
      });
  }
  
  // 일반 공유하기 버튼
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
