# Portfolio Data Persistence Guide

## Problem
When you deploy your portfolio to hosting platforms like Netlify, Vercel, or GitHub Pages, the localStorage data gets reset and your admin panel changes are lost.

## Solution
I've implemented a centralized data system that allows you to persist changes across deployments.

## How It Works

### 1. Centralized Data File
All portfolio data is now stored in `src/data/portfolioData.js`. This file contains:
- Projects
- Certificates  
- Blogs
- Blog Categories
- Analytics

### 2. Admin Panel Changes
When you make changes in the admin panel, they are stored in localStorage for immediate use.

### 3. Export Functionality
After making changes in the admin panel, you can:
1. Click the "Export Data" button in the admin panel
2. This downloads a JSON file with all your current data
3. Replace the data in `src/data/portfolioData.js` with the exported data
4. Deploy the updated code

## Step-by-Step Process

### Making Changes
1. Go to your admin panel (usually at `/admin`)
2. Make your changes (add/edit/delete projects, certificates, etc.)
3. Click the "Export Data" button in the admin panel header
4. A file called `portfolio-data.json` will be downloaded

### Updating the Data File

#### Option 1: Using the Update Script (Recommended)
1. Place the downloaded `portfolio-data.json` file in your project root
2. Run the update script:
   ```bash
   node update-portfolio-data.js portfolio-data.json
   ```
3. The script will automatically update `src/data/portfolioData.js`

#### Option 2: Manual Update
1. Open the downloaded `portfolio-data.json` file
2. Copy the content
3. Open `src/data/portfolioData.js`
4. Replace the `portfolioData` object with the new data
5. Save the file

### Example Update
```javascript
// In src/data/portfolioData.js
export const portfolioData = {
  projects: [
    // Your updated projects here
  ],
  certificates: [
    // Your updated certificates here
  ],
  // ... rest of your data
};
```

### Deploying Changes
1. Commit your changes to git
2. Push to your repository
3. Your hosting platform will automatically deploy the updated data

## Benefits
- ✅ Changes persist across deployments
- ✅ No database required
- ✅ Simple file-based system
- ✅ Version control friendly
- ✅ Easy to backup and restore

## Tips
- Always export your data before making major changes
- Keep backups of your `portfolioData.js` file
- Test changes locally before deploying
- The admin panel still works with localStorage for immediate feedback

## Troubleshooting
- If changes don't appear, check that you've updated the correct file
- Make sure the JSON structure matches the expected format
- Clear your browser cache if changes don't show up immediately 