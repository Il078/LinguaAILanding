document.addEventListener('DOMContentLoaded', () => {
  // Signup form
  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      if (email) {
        console.log(`Signing up with: ${email}`);
        alert('Thank you! We’ll get in touch with you soon.');
        e.target.reset();
      } else {
        alert('Please enter a valid email.');
      }
    });
  }

  // Scroll animations
  const animatedElements = document.querySelectorAll('.animate');
  const animateOnScroll = () => {
    animatedElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 50) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});