import Papa from 'papaparse';

// Instructions: Publish your Google Sheet as CSV and paste link here
const BANNERS_CSV = 'PASTE_BANNERS_CSV_LINK_HERE';
const PRODUCTS_CSV = 'PASTE_PRODUCTS_CSV_LINK_HERE';

export const fetchData = (type) => {
  return new Promise((resolve, reject) => {
    const url = type === 'banners' ? BANNERS_CSV : PRODUCTS_CSV;
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err)
    });
  });
};