
document.addEventListener('DOMContentLoaded', function() {
    const deleteLinks = document.querySelectorAll('.delete-post');

    deleteLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor behavior
            const postId = event.currentTarget.getAttribute('data-id');

            fetch(`/post/delete/${postId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Remove the post from the DOM or redirect as required
                    window.location.reload();
                } else {
                    console.error('Failed to delete post');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});

