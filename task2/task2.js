const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    const width = window.screen.width
    const height = window.screen.height
    alert(`Ваш экран ${width} пикселей в ширину и ${height} пикселей в высоту`)
})