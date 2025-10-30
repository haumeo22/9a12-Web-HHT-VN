// script.js
document.addEventListener('DOMContentLoaded', () => {
  const scrollDown = document.getElementById('scrollDown');
  const enterBtn = document.getElementById('enterBtn');
  const contentSection = document.getElementById('content');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollToContent(){
    if(prefersReducedMotion){
      // jump
      contentSection.scrollIntoView({behavior:'auto'});
    } else {
      contentSection.scrollIntoView({behavior:'smooth'});
    }
  }

  scrollDown && scrollDown.addEventListener('click', scrollToContent);
  enterBtn && enterBtn.addEventListener('click', scrollToContent);

  // Optional: keyboard support (press ArrowDown or PageDown to go down)
  window.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowDown' || e.key === 'PageDown'){
      scrollToContent();
    }
  });

  // Small UX: if user scrolls by wheel, the browser's scroll-snap will handle snapping.
});
