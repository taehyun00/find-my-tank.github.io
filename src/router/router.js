import * as Quiz from '../pages/Quiz.js';
import * as Result from '../pages/Result.js'; // 🔥 오타 수정 (Reslut → Result)

const routes = {
    '/quiz': Quiz,
    '/result': Result
};

const app = document.getElementById('app');

export const router = () => {
    const path = window.location.pathname;
    const routeModule = routes[path];

    if (routeModule && typeof routeModule.render === 'function') {
        app.innerHTML = routeModule.render();
        if (typeof routeModule.attachEvents === 'function') {
            routeModule.attachEvents();
        }
    } else if (path !== '/' && path !== '/index.html') {
        app.innerHTML = '<h2>404 Not Found</h2>';
    }
    // 루트 경로('/')나 '/index.html'일 경우, 아무것도 하지 않아 기존 HTML을 유지합니다.
};

export const navigateTo = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    router();
};

export const renderCurrentRoute = () => {
    router();
};
