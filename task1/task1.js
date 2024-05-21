document.querySelector('.btn').addEventListener('click', function(e) {
    e.target.closest('.btn').classList.toggle('btn--toggle');
  })