const uploadFileValue = document.querySelector(".upload-file__value");
const videoFile = document.querySelector(".upload-file__input");
videoFile.addEventListener("change", () => {
  const fileName = videoFile.files[0].name;
  uploadFileValue.innerText = fileName;
});
