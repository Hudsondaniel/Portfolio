const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "content", "projects");

// Read all MDX files in the projects directory
const files = fs
	.readdirSync(contentDir)
	.filter((file) => file.endsWith(".mdx"));

files.forEach((file) => {
	const filePath = path.join(contentDir, file);
	let content = fs.readFileSync(filePath, "utf8");

	// Fix the published field formatting
	content = content.replace(/published:\s*true\s*\r?\n/g, "published: true\n");

	// Fix any other formatting issues
	content = content.replace(/\r\n/g, "\n");

	// Write the fixed content back to the file
	fs.writeFileSync(filePath, content);
});

console.log("Fixed MDX files formatting issues");
