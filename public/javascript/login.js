const btn = document.getElementById("login");
const btn2 = document.getElementById("signup");
btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    if(email=="" || password==""){
        alert("Please fill all the fields");
        return;
    }
    // Create an object with the data you want to send
    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            // console.log('Login Successfully');
            location.href = '/';
        } else {
            console.error('Login failed');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

btn2.addEventListener('click', async (e) => {

    e.preventDefault();

    const email = document.getElementById("signEmail").value;
    const password = document.getElementById("signPass").value;
    const username = document.getElementById("username").value;

    
    if(email=="" || password=="" || username==""){
        alert("Please fill all the fields");
        return;
    }

    // Create an object with the data you want to send
    const data = {
        email: email,
        password: password,
        username: username
    };

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            // console.log('Login Successfully');
            location.href = '/';
        } else {
            console.error('Sigup failed');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});



