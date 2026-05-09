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
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });
}


tabLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Close mobile menu if open
    if (navList && navList.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navList.classList.remove('active');
    }

    
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

// Modal Logic
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('fullImage');
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

function closeModal() {
  document.getElementById('imageModal').style.display = "none";
}

// Close modal when clicking outside the image
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
