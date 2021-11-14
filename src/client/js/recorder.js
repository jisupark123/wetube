const recordBtn = document.getElementById("recordBtn");

const handleRecord = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
};

recordBtn.addEventListener("click", handleRecord);
