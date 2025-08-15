// Simple example showing how to use saveRecipePhoto with form data
import { saveRecipePhoto } from "./save_photo.ts";

// Example: Simulating receiving image data from a web form
async function exampleFormDataUsage() {
    console.log("📝 Example: Using saveRecipePhoto with form data\n");

    try {
        // Simulate reading an image file (as you would from form data)
        const imageFile = await Deno.readFile("scripts/uploads/Fluffy-Pancakes.jpg");
        
        // Example 1: Save with original filename
        console.log("💾 Saving with original filename...");
        const savedFile1 = await saveRecipePhoto(imageFile, "user-uploaded-recipe.jpg");
        console.log(`✅ Saved as: ${savedFile1}\n`);

        // Example 2: Save without filename (auto-generates .jpg extension)
        console.log("💾 Saving without filename...");
        const savedFile2 = await saveRecipePhoto(imageFile);
        console.log(`✅ Saved as: ${savedFile2}\n`);

        // Example 3: Save base64 image (common in web forms)
        console.log("💾 Saving base64 encoded image...");
        const base64Image = `data:image/jpeg;base64,${btoa(String.fromCharCode(...imageFile))}`;
        const savedFile3 = await saveRecipePhoto(base64Image, "base64-recipe.jpg");
        console.log(`✅ Saved as: ${savedFile3}\n`);

        console.log("🎯 Usage examples completed!");
        console.log("📁 All files saved to: ./uploads/");

    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// Run the example
if (import.meta.main) {
    await exampleFormDataUsage();
}
