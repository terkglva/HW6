// public/imageCompressionWorker.js

self.addEventListener('message', async (e) => {
  const { file, maxWidth, maxHeight, quality } = e.data;

  try {
    // Create image bitmap from file
    const imageBitmap = await createImageBitmap(file);
    
    // Calculate new dimensions
    let width = imageBitmap.width;
    let height = imageBitmap.height;
    
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = width * ratio;
      height = height * ratio;
    }

    // Create canvas and draw resized image
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0, width, height);

    // Convert to blob
    const blob = await canvas.convertToBlob({
      type: 'image/jpeg',
      quality: quality || 0.8
    });

    // Send compressed blob back
    self.postMessage({ success: true, blob });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
});