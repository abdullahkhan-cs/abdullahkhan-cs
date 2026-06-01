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

// Leadership Certificate Column Swap & Interactivity
const leadCards = document.querySelectorAll('#leadership .lead-card');
const activeCertDisplay = document.getElementById('active-cert-display');
const activeCertCaption = document.getElementById('active-cert-caption');

if (leadCards.length > 0 && activeCertDisplay) {
  const triggerSwitch = (card) => {
    const certSrc = card.getAttribute('data-cert');
    const certTitle = card.getAttribute('data-cert-title') || '';
    const currentSrc = activeCertDisplay.getAttribute('src');
    
    if (certSrc && currentSrc !== certSrc) {
      activeCertDisplay.style.opacity = '0';
      activeCertDisplay.style.transform = 'rotateY(20deg) rotateX(10deg) scale(0.95)';
      setTimeout(() => {
        activeCertDisplay.setAttribute('src', certSrc);
        activeCertDisplay.alt = certTitle;
        if (activeCertCaption) activeCertCaption.textContent = certTitle;
        activeCertDisplay.style.opacity = '1';
        activeCertDisplay.style.transform = 'rotateY(-6deg) rotateX(4deg) scale(0.98)';
      }, 200);
    }
    leadCards.forEach(c => c.classList.remove('active-lead-card'));
    card.classList.add('active-lead-card');
  };

  leadCards.forEach(card => {
    card.addEventListener('mouseenter', () => triggerSwitch(card));
    card.addEventListener('click', () => triggerSwitch(card));
  });

  const leadScrollObserver = new IntersectionObserver((entries) => {
    if (window.innerWidth > 992) {
      entries.forEach(entry => {
        if (entry.isIntersecting) triggerSwitch(entry.target);
      });
    }
  }, { rootMargin: "-30% 0px -30% 0px", threshold: 0 });

  leadCards.forEach(card => leadScrollObserver.observe(card));
}

// Conferences Certificate Column Swap & Interactivity
const confCards = document.querySelectorAll('#conferences .conf-card');
const activeConfDisplay = document.getElementById('active-conf-display');
const activeConfCaption = document.getElementById('active-conf-caption');

if (confCards.length > 0 && activeConfDisplay) {
  const triggerConfSwitch = (card) => {
    const certSrc = card.getAttribute('data-conf-cert');
    const certTitle = card.getAttribute('data-conf-cert-title') || '';
    const currentSrc = activeConfDisplay.getAttribute('src');

    if (certSrc && currentSrc !== certSrc) {
      activeConfDisplay.style.opacity = '0';
      activeConfDisplay.style.transform = 'rotateY(20deg) rotateX(10deg) scale(0.95)';
      setTimeout(() => {
        activeConfDisplay.setAttribute('src', certSrc);
        activeConfDisplay.alt = certTitle;
        if (activeConfCaption) activeConfCaption.textContent = certTitle;
        activeConfDisplay.style.opacity = '1';
        activeConfDisplay.style.transform = 'rotateY(-6deg) rotateX(4deg) scale(0.98)';
      }, 200);
    }
    confCards.forEach(c => c.classList.remove('active-conf-card'));
    card.classList.add('active-conf-card');
  };

  confCards.forEach(card => {
    card.addEventListener('mouseenter', () => triggerConfSwitch(card));
    card.addEventListener('click', () => triggerConfSwitch(card));
  });

  const confScrollObserver = new IntersectionObserver((entries) => {
    if (window.innerWidth > 992) {
      entries.forEach(entry => {
        if (entry.isIntersecting) triggerConfSwitch(entry.target);
      });
    }
  }, { rootMargin: "-30% 0px -30% 0px", threshold: 0 });

  confCards.forEach(card => confScrollObserver.observe(card));
}

