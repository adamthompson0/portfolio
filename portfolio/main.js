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