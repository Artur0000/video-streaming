const video = document.getElementById("video");
const source = document.getElementById("video-src");
const videoName = window.location.search.split("=")[1];
source.src = `/${videoName}`;
video.load();
