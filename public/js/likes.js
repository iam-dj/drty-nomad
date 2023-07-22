async function likeStamp() {
  const stampId = this.attributes["data-id"].nodeValue;
  const likeCounter = this.querySelector('.like-counter');
  // make put request
  const res = await fetch(`/api/stamps/${stampId}/like`, {
    method: "PUT",
  });
  const likes = await res.json();
  likeCounter.textContent = likes.count;
}

const likeBtns = document.getElementsByClassName("stamp-like-btn");

for (let i = 0; i < likeBtns.length; i++) {
  // console.log(likeBtns[i]);
  likeBtns[i].addEventListener("click", likeStamp);
}
