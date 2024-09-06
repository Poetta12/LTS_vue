import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { basename } from 'path';

// Dossier source des images à compresser
const sourceDir = 'images/*.{jpg,png}';
// Dossier de destination pour les images compressées
const outputDir = 'compressed-images';

(async () => {
    const files = await imagemin([sourceDir], {
        destination: outputDir,
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] })
        ]
    });

    console.log('Images compressées :', files.map(file => basename(file.sourcePath)));
})();
