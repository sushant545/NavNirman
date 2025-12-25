import Papa from 'papaparse';

// 1. OLD MASTER SHEET (For Products, Catalog, etc.)
const MASTER_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQooWuaeqfhegHzX5m5xjnIlxUDif0oLWyVnj_NdtzviHxveWce-cU8naPn955tySVtjXJhIW7Sm5n_/pub?output=csv';

// 2. NEW PROJECT SHEET (For Project Details)
const PROJECT_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTu5_ZXwcML3Z7OasFLzwgYY8axhNQo_AZx6l0DWbevVDv2qL4T43j5nXRrvOmbTHAIpmBTF3-0AkH2/pub?output=csv';

export const fetchData = (requestedType) => {
  return new Promise((resolve, reject) => {
    
    // Determine which URL to fetch based on what data is requested
    const type = requestedType.toLowerCase().trim();
    const isProjectRequest = type === 'project' || type === 'projects';
    
    const targetUrl = isProjectRequest ? PROJECT_CSV_URL : MASTER_CSV_URL;

    console.log(`📡 Fetching "${type}" from ${isProjectRequest ? 'NEW PROJECT SHEET' : 'MASTER SHEET'}...`);

    Papa.parse(targetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const allData = results.data;
        
        // CASE A: Project Sheet (Return Everything + Fix Image Name)
        if (isProjectRequest) {
             // ✨ MAGIC FIX: Map 'hero_image' from sheet to 'image_url' for the code
             const normalizedData = allData.map(item => ({
                 ...item,
                 // If the sheet has 'hero_image', use it as 'image_url'
                 image_url: item.hero_image || item.image_url 
             }));

             console.log(`✅ Loaded ${normalizedData.length} projects from detailed sheet.`);
             resolve(normalizedData);
        } 
        // CASE B: Master Sheet (Filter by data_type)
        else {
             const filtered = allData.filter(item => {
                if (!item.data_type) return false;
                const sheetType = item.data_type.toLowerCase().trim();
                // Allow singular/plural match (e.g. 'products' matches 'product')
                return sheetType === type || sheetType + 's' === type || sheetType === type + 's';
             });
             console.log(`✅ Requested: "${requestedType}", Found: ${filtered.length} items from Master.`);
             resolve(filtered);
        }
      },
      error: (err) => {
        console.error("❌ CSV Error:", err);
        reject(err);
      }
    });
  });
};