const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const voter_id = document.getElementById('voter-id').value;
  const password = document.getElementById('password').value;
  // const token = voter_id;

  const headers = {
    'method': "GET",
};

  fetch(`http://127.0.0.1:8080/login?voter_id=${voter_id}&password=${password}`,{headers})
  .then(response => {
    if (response.status==200) {
      return response.json();
    } else {
      throw new Error('Login failed');
    }
  })
  .then(async data => {console.log(data.response.role);
    if (data.response.role === 'admin') {
      await localStorage.setItem('jwtTokenAdmin', data.response.token);
      window.location.replace(`http://127.0.0.1:8080/admin.html?Authorization=${localStorage.getItem('jwtTokenAdmin')}`);
    } else if (data.response.role === 'user'){
      await localStorage.setItem('jwtTokenVoter', data.response.token);
      window.location.replace(`http://127.0.0.1:8080/index.html?Authorization=${localStorage.getItem('jwtTokenVoter')}`);
    }
  })
  // .catch(error => {
  //   console.error('Login failed:', error);
  // });
});
