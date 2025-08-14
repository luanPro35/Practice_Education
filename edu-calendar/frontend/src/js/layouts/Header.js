export default function Header() {
    fetch('/src/views/layouts/header.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('header').innerHTML = html;
        });
}
