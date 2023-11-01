const logout = document.getElementById('logout');
const todo = document.getElementById('todo');
const btn = document.getElementById('btn');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("logout");
    fetch('/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res);
        window.location.href = '/login';
    }).catch((err) => {
        console.log(err);
    })
});

function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
    }
    return null;
}


const id = getCookie("userId");
if (id) {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        if (title == "" || description == "") {
            alert("Please fill all the fields");
            return;
        }
        // Create an object with the data you want to send
        const data = {
            title: title,
            description: description,
            id: id
        };

        try {
            const response = await fetch('/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                location.href = '/';
            } else {
                console.error('Failed due to some reason');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
}
else{
     console.log( "Please login first");
}

todo.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("todo");
    window.location.href = '/notes';
});
