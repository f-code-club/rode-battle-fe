export interface ImageMeta {
  base64: string;
  width: number;
  height: number;
  sizeBytes: number;
  formattedSize: string;
  name: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function processImageFile(file: File): Promise<ImageMeta> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please upload an image file (PNG, JPG, or WebP)'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const base64 = reader.result as string;
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image preview'));
      img.onload = () => {
        resolve({
          base64,
          width: img.naturalWidth,
          height: img.naturalHeight,
          sizeBytes: file.size,
          formattedSize: formatFileSize(file.size),
          name: file.name,
        });
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
  });
}
