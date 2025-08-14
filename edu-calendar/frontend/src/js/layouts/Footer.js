export default function Footer() {
    fetch('/src/views/layouts/footer.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('footer').innerHTML = html;
        });
}
