const home = document.getElementById('home');
const logout = document.getElementById('logout');

home.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("home");
    window.location.href = '/';
});

// Example using plain JavaScript
const deleteButtons = document.querySelectorAll('button[data-note-id]');
const editButtons = document.querySelectorAll('button[data-note-id]');

deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
        const noteId = button.getAttribute('data-note-id');

        try {
            const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 202) {
                // console.log('Note deleted successfully');
                // Optionally, remove the deleted note from the UI.
                // This depends on your specific implementation.
                const parentDiv = button.closest('div').parentElement.parentElement.parentElement;
                parentDiv.remove();
            } else {
                console.error('Failed to delete the note');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});


editButtons.forEach((button) => {
    button.addEventListener('click', async() => {
        const noteId = button.getAttribute('data-note-id');
        try {
            const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: document.getElementById("title").value,
                    description: document.getElementById("description").value,
                    
                })
            });
        } catch (error) {}
    });
});


logout.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("logout");
    fetch('http://localhost:3000/logout', {
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