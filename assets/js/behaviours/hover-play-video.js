function showPosterFrame(video) {
  const seek = () => {
    video.currentTime = 0.1;
  };
  if (video.readyState >= 1) {
    seek();
  } else {
    video.addEventListener('loadedmetadata', seek, { once: true });
  }
}

export function initHoverPlayVideo(root = document) {
  root.querySelectorAll('.hover-play-video').forEach((element) => {
    const video = element.querySelector('video');
    if (!video) {
      return;
    }
    showPosterFrame(video);
    element.addEventListener('mouseenter', () => video.play().catch(() => {}));
    element.addEventListener('mouseleave', () => video.pause());
  });
}
