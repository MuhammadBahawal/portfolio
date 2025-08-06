#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to update portfolio data
function updatePortfolioData(jsonFilePath) {
  try {
    // Read the exported JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    // Create the new portfolio data content
    const portfolioDataContent = `// Portfolio Data - This file can be updated to persist changes across deployments
export const portfolioData = ${JSON.stringify(jsonData, null, 2)};
`;

    // Write to the portfolio data file
    const portfolioDataPath = path.join(__dirname, 'src', 'data', 'portfolioData.js');
    fs.writeFileSync(portfolioDataPath, portfolioDataContent);
    
    console.log('✅ Portfolio data updated successfully!');
    console.log(`📁 Updated file: ${portfolioDataPath}`);
    console.log('\n📊 Summary:');
    console.log(`   Projects: ${jsonData.projects?.length || 0}`);
    console.log(`   Certificates: ${jsonData.certificates?.length || 0}`);
    console.log(`   Blogs: ${jsonData.blogs?.length || 0}`);
    console.log(`   Blog Categories: ${jsonData.blogCategories?.length || 0}`);
    
  } catch (error) {
    console.error('❌ Error updating portfolio data:', error.message);
    console.log('\n💡 Usage: node update-portfolio-data.js <path-to-exported-json>');
    console.log('   Example: node update-portfolio-data.js portfolio-data.json');
  }
}

// Get the JSON file path from command line arguments
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.log('❌ Please provide the path to the exported JSON file');
  console.log('\n💡 Usage: node update-portfolio-data.js <path-to-exported-json>');
  console.log('   Example: node update-portfolio-data.js portfolio-data.json');
  process.exit(1);
}

// Check if the file exists
if (!fs.existsSync(jsonFilePath)) {
  console.error(`❌ File not found: ${jsonFilePath}`);
  process.exit(1);
}

// Update the portfolio data
updatePortfolioData(jsonFilePath); 