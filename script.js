import { router, navigateTo, renderCurrentRoute } from './src/router/router.js';

window.navigateTo = navigateTo; 
window.renderCurrentRoute = renderCurrentRoute;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    
    if (startButton) {
        startButton.addEventListener('click', () => {
            navigateTo('/quiz'); 
        });
        
    }
    
    window.addEventListener('popstate', router);

    if (window.location.pathname !== '/') {
        router();
    }
});