document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');

    const specsButton = document.getElementById('show-specs');
    const popup = document.getElementById('specs-popup');
    const closePopup = document.getElementById('close-popup');
    const specsDetails = document.getElementById('specs-details');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseover', () => {
            mainImage.src = thumbnail.src;
        });
    });

    specsButton.addEventListener('click', () => {
        fetch('products/products.csv')
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                const headers = lines[0].split(',');
                const values = lines[1].split(',');

                let specsHTML = '<ul>';
                headers.forEach((header, index) => {
                    specsHTML += `<li><strong>${header}:</strong> ${values[index]}</li>`;
                });
                specsHTML += '</ul>';

                specsDetails.innerHTML = specsHTML;
                popup.style.display = 'flex';
            });
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});