const home = document.getElementById('home');
const logout = document.getElementById('logout');
const closeButton = document.getElementById("close-button");
const modal = document.getElementById("modal");

home.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("home");
    window.location.href = '/';
});

const deleteButtons = document.querySelectorAll('button.delete-button[data-note-id]');
const editButtons = document.querySelectorAll('button.edit-button[data-note-id]');


deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
        const notesId = button.getAttribute('data-note-id');
        const modifiednoteId = notesId.slice(0, -1);
        // console.log(modifiednoteId);
        try {
            const response = await fetch(`/notes/${modifiednoteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 202) {
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


// Define a variable to store the noteId
let noteId = null;

editButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        noteId = button.getAttribute("data-note-id");
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");

        // Set default values in the inputs
        titleInput.value = "Default Title";
        descriptionInput.value = "Default Description";

        try {
            const response = await fetch(`/notes/${noteId}`);
            if (response.status === 200) {
                const data = await response.json();
                titleInput.value = data[0].title;
                descriptionInput.value = data[0].description;
                modal.style.display = "block";
            } else {
                console.error("Failed to fetch note data");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});

document.getElementById("save-button").addEventListener('click', async () => {
    if (noteId) {
        const updatedTitle = document.getElementById("title1").value;
        const updatedDescription = document.getElementById("description1").value;

        if (!updatedTitle || !updatedDescription) {
            alert('Title or description is missing');
            return;
        }

        try {
            const response = await fetch(`/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: noteId,
                    title: updatedTitle,
                    description: updatedDescription,
                })
            });

            if (response.status === 200) {
                modal.style.display = "none";
                location.reload();
            } else {
                console.error('Failed to update the note');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    } else {
        console.error('noteId is null; cannot update the note');
    }
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

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