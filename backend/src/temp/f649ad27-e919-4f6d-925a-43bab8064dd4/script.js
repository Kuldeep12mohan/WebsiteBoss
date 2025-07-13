// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Emergency contact highlight
function highlightEmergency() {
    const emergencyInfo = document.querySelector('.emergency-info');
    if (emergencyInfo) {
        emergencyInfo.style.animation = 'pulse 2s infinite';
    }
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(style);