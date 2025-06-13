const video = document.getElementById('myVideo');
const section = document.getElementById('video-section');

const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) {
    video.pause();
  } else {
    // Optional: play if back in view
    video.play();
  }
}, {
  threshold: 0.5 // pause when less than 50% of section is visible
});

observer.observe(section);
