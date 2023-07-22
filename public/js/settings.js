document.querySelector(".settings-form").addEventListener('submit',  async(e) => {
    e.preventDefault();

    console.log(e);

    const firstName = document.querySelector('#first_name-edit').value;
    const lastName = document.querySelector('#last_name-edit').value;
    const username = document.querySelector('#username-edit').value;
    const age = document.querySelector('#user_age-edit').value;
    const home = document.querySelector('#user_home-edit').value;
    const aboutMe = document.querySelector('#about_me-edit').value;

    console.log(firstName);

    const res = await fetch('/api/users/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            user_name: username,
            user_age: age,
            user_home: home,
            about_me: aboutMe,
        }),
    })
    window.location.replace('/profile?settingsSaved=true');
})

