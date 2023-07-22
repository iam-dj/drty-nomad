const logoContainer = document.querySelector('.logo-container');
const newBtn = document.querySelector('#newBtn');
const loginBtn = document.querySelector('#loginBtn');

newBtn.addEventListener('click', async () => {
    // event.preventDefault();

    logoContainer.style.display = 'none';
    window.location.href = '/login';

  });
  

loginBtn.addEventListener('click', async () => {
    // event.preventDefault();

    logoContainer.style.display = 'none';
    window.location.href = '/login';

  });

