import Papa from 'papaparse';

// YOUR ACTUAL LINK
const MASTER_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQooWuaeqfhegHzX5m5xjnIlxUDif0oLWyVnj_NdtzviHxveWce-cU8naPn955tySVtjXJhIW7Sm5n_/pub?output=csv';

export const fetchData = (requestedType) => {
  return new Promise((resolve, reject) => {
    Papa.parse(MASTER_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const allData = results.data;
        
        console.log("🔥 RAW DATA FROM SHEET:", allData); // Check your Console (F12) to see this

        // Smart Filter: Matches 'product' AND 'products'
        const filtered = allData.filter(item => {
            if (!item.data_type) return false;
            
            const sheetType = item.data_type.toLowerCase().trim(); // what is in the sheet
            const reqType = requestedType.toLowerCase().trim();    // what code asked for
            
            // Allow singular/plural match (e.g. 'products' matches 'product')
            return sheetType === reqType || sheetType + 's' === reqType || sheetType === reqType + 's';
        });

        console.log(`✅ Requested: "${requestedType}", Found: ${filtered.length} items`);
        resolve(filtered);
      },
      error: (err) => {
        console.error("❌ CSV Error:", err);
        reject(err);
      }
    });
  });
};