// Lazy loading for videos using IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
    const lazyVideos = document.querySelectorAll('video[data-lazy-video]');

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    // Load the video source if not already loaded
                    if (!video.hasAttribute('src') && video.dataset.src) {
                        video.src = video.dataset.src;
                        video.load();
                    }
                    // Play the video if it's set to autoplay or on user interaction
                    if (video.hasAttribute('autoplay')) {
                        video.play();
                    }
                    videoObserver.unobserve(video);
                }
            });
        });

        lazyVideos.forEach(video => {
            videoObserver.observe(video);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyVideos.forEach(video => {
            if (video.dataset.src) {
                video.src = video.dataset.src;
                video.load();
            }
        });
    }
});

// Lazy loading for images (fallback, since loading="lazy" is used)
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});
