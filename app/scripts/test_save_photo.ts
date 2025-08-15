// Test script for saveRecipePhoto function
import { saveRecipePhoto } from "./save_photo.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

async function testSavePhoto() {
    try {
        console.log("🧪 Testing saveRecipePhoto function...\n");

        // Test 1: Read an existing image file and save it
        const testImagePath = join(Deno.cwd(), "scripts/uploads/Fluffy-Pancakes.jpg");
        console.log(`📁 Reading test image from: ${testImagePath}`);
        
        const imageBytes = await Deno.readFile(testImagePath);
        console.log(`📊 Image size: ${imageBytes.length} bytes`);

        // Test saving with Uint8Array
        console.log("\n🔍 Test 1: Saving image as Uint8Array...");
        const savedFileName1 = await saveRecipePhoto(imageBytes, "test-pancakes.jpg");
        console.log(`✅ Saved as: ${savedFileName1}`);

        // Test 2: Convert to base64 and save
        console.log("\n🔍 Test 2: Saving image as base64 string...");
        const base64String = `data:image/jpeg;base64,${btoa(String.fromCharCode(...imageBytes))}`;
        const savedFileName2 = await saveRecipePhoto(base64String, "test-pancakes-base64.jpg");
        console.log(`✅ Saved as: ${savedFileName2}`);

        // Test 3: Save without filename (should default to .jpg)
        console.log("\n🔍 Test 3: Saving without filename...");
        const savedFileName3 = await saveRecipePhoto(imageBytes);
        console.log(`✅ Saved as: ${savedFileName3}`);

        // Verify the saved files exist
        console.log("\n🔍 Verifying saved files...");
        const uploadDir = join(Deno.cwd(), "uploads");
        
        for (const fileName of [savedFileName1, savedFileName2, savedFileName3]) {
            const filePath = join(uploadDir, fileName);
            try {
                const stat = await Deno.stat(filePath);
                console.log(`✅ ${fileName} exists (${stat.size} bytes)`);
            } catch {
                console.log(`❌ ${fileName} not found`);
            }
        }

        console.log("\n🎉 All tests completed successfully!");

    } catch (error) {
        console.error("❌ Test failed:", error);
    }
}

// Run the test
if (import.meta.main) {
    await testSavePhoto();
}
