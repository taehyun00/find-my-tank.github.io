import { router, navigateTo, renderCurrentRoute } from './src/router/router.js';
import { inject, track } from '@vercel/analytics'; // 🔥 추가

// 🔥 Analytics 초기화
inject();

window.navigateTo = navigateTo; 
window.renderCurrentRoute = renderCurrentRoute;

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('popstate', router);
    
    // 현재 경로가 루트가 아닐 경우에만 router를 실행하여 
    // 딥 링크(예: /quiz)로 바로 접속하는 경우를 처리합니다.
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        router();
    }
    
    // startButton 이벤트 리스너는 이제 router.js가 아닌 script.js에서 직접 처리합니다.
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 동작 방지
            
            // 🔥 시작 버튼 클릭 이벤트 추적
            track('start_quiz');
            
            navigateTo('/quiz'); 
        });
    }
});
