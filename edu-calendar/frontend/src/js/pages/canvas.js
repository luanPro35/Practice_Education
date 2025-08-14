document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ostrichX1 = -250; // Start off-screen
    let ostrichX2 = -500; // Start further off-screen

    const treeImage = new Image();
    treeImage.src = '../../assets/images/logo/caymauha.png';

    const ostrichImage1 = new Image();
    ostrichImage1.src = '../../assets/images/logo/anhthadieu.png';

    const ostrichImage2 = new Image();
    ostrichImage2.src = '../../assets/images/logo/anhthadieu2.png';

    // Background
    const drawBackground = () => {
        const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        sky.addColorStop(0, '#ffcc80');
        sky.addColorStop(1, '#ff8a65');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#d4a373';
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
    };

    // Draw Trees from Image
    const drawTrees = () => {
        // Background trees
        const bgTreeWidth = 250;
        const bgTreeHeight = 300;
        ctx.drawImage(treeImage, 100, canvas.height - 380, bgTreeWidth, bgTreeHeight);
        ctx.drawImage(treeImage, 700, canvas.height - 380, bgTreeWidth, bgTreeHeight);

        // Foreground trees
        const fgTreeWidth = 350;
        const fgTreeHeight = 400;
        ctx.drawImage(treeImage, 350, canvas.height - 420, fgTreeWidth, fgTreeHeight);
        
        // Largest foreground tree
        const largestTreeWidth = 450;
        const largestTreeHeight = 500;
        ctx.drawImage(treeImage, 900, canvas.height - 520, largestTreeWidth, largestTreeHeight);
    };

    // Draw Ostriches
    const drawOstriches = () => {
        const ostrichHeight = 200;
        const ostrichWidth = 200;
        ctx.drawImage(ostrichImage1, ostrichX1, canvas.height - 250, ostrichWidth, ostrichHeight);
        ctx.drawImage(ostrichImage2, ostrichX2, canvas.height - 270, ostrichWidth, ostrichHeight);
    };

    // Leaves
    const leaves = [];
    for (let i = 0; i < 150; i++) {
        leaves.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 2 + 1,
            color: ['#e57373', '#ffb74d', '#fdd835'][Math.floor(Math.random() * 3)]
        });
    }

    const drawLeaves = () => {
        leaves.forEach(leaf => {
            ctx.fillStyle = leaf.color;
            ctx.beginPath();
            ctx.arc(leaf.x, leaf.y, leaf.size, 0, Math.PI * 2);
            ctx.fill();
            leaf.y += leaf.speed;
            leaf.x += Math.sin(leaf.y / 20);
            if (leaf.y > canvas.height) {
                leaf.y = -leaf.size;
                leaf.x = Math.random() * canvas.width;
            }
        });
    };

    // Logo
    const drawLogo = () => {
        ctx.font = 'bold 60px "Palatino Linotype", "Book Antiqua", Palatino, serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText('EduCalendar', canvas.width / 2, 100);
        ctx.shadowBlur = 0;
    };

    // Animation loop
    const animate = () => {
        drawBackground();
        drawTrees();
        
        // Animate Ostriches
        ostrichX1 += 1.5; // Slower ostrich
        ostrichX2 += 1;   // Slowest ostrich
        if (ostrichX1 > canvas.width + 200) {
            ostrichX1 = -250;
        }
        if (ostrichX2 > canvas.width + 200) {
            ostrichX2 = -500;
        }
        drawOstriches();

        drawLeaves();
        drawLogo();
        requestAnimationFrame(animate);
    };

    // Ensure all images are loaded before starting the animation
    let imagesLoaded = 0;
    const totalImages = 3;
    const onImageLoad = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            animate();
        }
    };

    treeImage.onload = onImageLoad;
    ostrichImage1.onload = onImageLoad;
    ostrichImage2.onload = onImageLoad;
});
