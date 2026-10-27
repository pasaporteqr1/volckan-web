import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export async function compressImageWebP(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.82
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas failure'));

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Blob failure'));
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function uploadImageWithFallback(
  file: File,
  folder = 'mercado-assets',
  maxWidth = 800,
  maxHeight = 1000,
  quality = 0.78
): Promise<{ url: string; isBase64: boolean }> {
  const compressedBlob = await compressImageWebP(file, maxWidth, maxHeight, quality);

  if (storage) {
    try {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_') + '.webp';
      const fileRef = ref(storage, `${folder}/${Date.now()}_${cleanName}`);
      await uploadBytes(fileRef, compressedBlob, { contentType: 'image/webp' });
      const downloadUrl = await getDownloadURL(fileRef);
      return { url: downloadUrl, isBase64: false };
    } catch (storageErr) {
      console.warn('[ImageUpload] Error en Firebase Storage, utilizando fallback Base64 WebP:', storageErr);
    }
  }

  // Fallback seguro a Base64 WebP
  const compactBlob = await compressImageWebP(file, 450, 600, 0.65);
  const dataUrl = await blobToDataURL(compactBlob);
  return { url: dataUrl, isBase64: true };
}

export async function uploadImageToStorage(file: File, folder = 'mercado-assets'): Promise<string> {
  const res = await uploadImageWithFallback(file, folder);
  return res.url;
}

export async function uploadCarnetPhoto(
  file: File,
  submissionId: string
): Promise<{ url: string; storagePath?: string; isBase64: boolean }> {
  // Comprimir imagen a resolución ideal para carnets CR80 (500x650 px a 80% calidad WebP)
  const compressedBlob = await compressImageWebP(file, 500, 650, 0.80);

  if (storage) {
    try {
      const storagePath = `carnet_photos/photo_${submissionId}.webp`;
      const fileRef = ref(storage, storagePath);
      await uploadBytes(fileRef, compressedBlob, { contentType: 'image/webp' });
      const downloadUrl = await getDownloadURL(fileRef);
      return { url: downloadUrl, storagePath, isBase64: false };
    } catch (storageErr) {
      console.warn('[ImageUpload] Error en Storage para foto de carnet, aplicando fallback Base64 WebP:', storageErr);
    }
  }

  // Fallback seguro a Base64 WebP de alta compresión
  const compactBlob = await compressImageWebP(file, 400, 500, 0.68);
  const dataUrl = await blobToDataURL(compactBlob);
  return { url: dataUrl, isBase64: true };
}

export async function shrinkBase64Image(
  base64Str: string,
  maxWidth = 400,
  maxHeight = 550,
  quality = 0.65
): Promise<string> {
  if (!base64Str || !base64Str.startsWith('data:')) return base64Str;

  // Si maxHeight viene como valor menor a 1 (ej. por pasar calidad como segundo argumento por error)
  const effectiveMaxHeight = (typeof maxHeight === 'number' && maxHeight > 10) ? maxHeight : 550;
  const effectiveQuality = (typeof quality === 'number' && quality > 0 && quality <= 1) ? quality : 0.70;

  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > effectiveMaxHeight) {
        if (width / height > maxWidth / effectiveMaxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * effectiveMaxHeight) / height);
          height = effectiveMaxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(base64Str);

      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/webp', effectiveQuality);
      resolve(compressed);
    };
    img.onerror = () => resolve(base64Str);
  });
}

