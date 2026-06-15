

// Deno's standard library for path manipulation and file system operations
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.224.0/fs/ensure_dir.ts";


const UPLOAD_DIR = "./uploads";


export async function saveRecipePhoto(imageBytes: string | Uint8Array, fileName?: string): Promise<string> {
    // function to save a recipe photo
    // input imageBytes: image bytes from form data
    // input fileName: optional original filename


    await ensureDir(UPLOAD_DIR);
    
    // Generate a unique filename with proper extension
    const fileExtension = fileName ? fileName.split('.').pop() || 'jpg' : 'jpg';
    const uniqueFileName = `${crypto.randomUUID()}.${fileExtension}`;
    const filePath = join(Deno.cwd(), UPLOAD_DIR, uniqueFileName);
    
    // Convert string bytes to Uint8Array if needed
    let bytes: Uint8Array;
    if (typeof imageBytes === 'string') {
        // If it's a base64 string, decode it
        if (imageBytes.startsWith('data:image/')) {
            const base64Data = imageBytes.split(',')[1];
            bytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        } else {
            // If it's a regular string, convert to bytes
            bytes = new TextEncoder().encode(imageBytes);
        }
    } else {
        bytes = imageBytes;
    }
    
    await Deno.writeFile(filePath, bytes);

    return uniqueFileName;
}


