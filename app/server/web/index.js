const getVideoNames = async () => {
  const result = await fetch(`${window.location.href}video/names`);
  return result.json();
};

const drawVideoNames = async () => {
  const emptyFolder = document.getElementById("empty-folder");
  try {
    const names = await getVideoNames();
    const videoList = document.getElementById("videos-list");

    if (names.length) {
      videoList.style.display = "flex";
    } else {
      emptyFolder.style.display = "inline";
    }

    names.forEach((name, index) => {
      let videoItem = document.getElementById("video-item");
      if (index > 0) {
        videoItem = videoItem.cloneNode();
      }
      videoItem.innerHTML = `<button onclick="onVideoClick(this)">${name}</button>`;
      videoList.appendChild(videoItem);
    });
  } catch {
    emptyFolder.style.display = "inline";
  }
};

const onVideoClick = ({ textContent }) =>
  (window.location.href = `${window.location.href}play?video=${textContent}`);

drawVideoNames();
