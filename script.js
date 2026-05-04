// Fade-in on scroll (and on tab switch)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

function observeElements() {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Initial observe
observeElements();

// Tab switching logic
const tabLinks = document.querySelectorAll('.tab-link');
const tabPanes = document.querySelectorAll('.tab-pane');

tabLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get target tab id
    const targetId = this.getAttribute('data-tab');
    
    // Remove active class from all links and panes
    tabLinks.forEach(l => l.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked link and corresponding pane
    this.classList.add('active');
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.add('active');
      
      // Reset animations for fade-in elements within this pane
      const fadeElements = targetPane.querySelectorAll('.fade-in');
      fadeElements.forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
      });
    }
  });
});
