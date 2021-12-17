const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');
const textarea = form.querySelector('textarea');
const btn = form.querySelector('button');

const addComment = (text, id) => {
  const videoComments = document.querySelector('.video__comments ul');
  const newComment = document.createElement('li');
  newComment.dataset.id = id;
  newComment.className = 'video__comment';
  const icon = document.createElement('i');
  const span = document.createElement('span');
  span.innerText = ' ' + text;
  icon.className = 'fas fa-comment';
  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

const handelSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text.trim() === '') {
    return;
  }
  const response = await fetch(`/api/video/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = '';
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const extendTextarea = () => {
  textarea.style.height = '5px';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

form.addEventListener('submit', handelSubmit);
textarea.addEventListener('input', extendTextarea);
