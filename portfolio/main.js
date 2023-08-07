const slider = document.querySelector('#slider');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');


function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerHeight = 50; // Adjust this value based on your header height
  
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - headerHeight;
      const duration = 800; // Adjust the duration for the scrolling animation
      let startTime = null;
  
      function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const ease = Math.easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, ease);
  
        if (timeElapsed < duration) {
          requestAnimationFrame(scrollAnimation);
        }
      }
  
      requestAnimationFrame(scrollAnimation);
    }
  }
  
  // Add click event listeners to navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  // Easing function for smooth scrolling animation
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };



  let slideIndex = 0;

  // Function to show the current slide
  function showSlide() {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
  }
  
  // Function to navigate to the previous slide
  function prevSlide() {
    if (slideIndex > 0) {
      slideIndex--;
      showSlide();
    }
  }
  
  // Function to navigate to the next slide
  function nextSlide() {
    if (slideIndex < slider.children.length - 1) {
      slideIndex++;
      showSlide();
    }
  }
  
  // Add click event listeners to the navigation buttons
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);