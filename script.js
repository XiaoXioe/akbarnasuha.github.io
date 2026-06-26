document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Navigation (Toggle)
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navLinksList.style.display === 'flex';
      
      if (isExpanded) {
        navLinksList.style.display = 'none';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
      } else {
        navLinksList.style.display = 'flex';
        navLinksList.style.flexDirection = 'column';
        navLinksList.style.position = 'absolute';
        navLinksList.style.top = '100%';
        navLinksList.style.left = '0';
        navLinksList.style.width = '100%';
        navLinksList.style.background = 'rgba(6, 9, 19, 0.95)';
        navLinksList.style.padding = '2rem';
        navLinksList.style.borderBottom = '1px solid var(--border-color)';
        navLinksList.style.gap = '1.5rem';
        navToggle.innerHTML = '<i class="fas fa-times"></i>';
      }
    });
  }

  // 3. Active Link Highlighter on Scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  });

  // 4. Scroll Reveal Animations (using Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 5. Skills Progress Bar Animation
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const targetValue = bar.getAttribute('data-level');
          bar.style.transform = `scaleX(${targetValue / 100})`;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  if (skillSection) {
    skillObserver.observe(skillSection);
  }

  // 6. Dynamic Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
