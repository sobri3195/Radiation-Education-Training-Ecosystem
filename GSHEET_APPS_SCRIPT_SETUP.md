# Google Apps Script Integration Guide

This guide explains how to integrate Google Sheets data using Google Apps Script with the RADIATE platform.

## Overview

The platform now supports two methods for fetching Google Sheets data:
1. **Direct Google Sheets API** - Using API keys and spreadsheet IDs
2. **Google Apps Script** - Using deployed web apps (more flexible, can handle custom logic)

## Setting Up Google Apps Script

### 1. Create Your Apps Script

1. Open your Google Sheet
2. Go to **Extensions > Apps Script**
3. Replace the default code with the following:

```javascript
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Convert to JSON array of objects
    const headers = data[0];
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(rows))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'append' && data.data) {
      sheet.getRange(sheet.getLastRow() + 1, 1, data.data.length, data.data[0].length)
        .setValues(data.data);
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: 'Data appended successfully' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2. Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ and select **Web app**
3. Fill in the deployment settings:
   - **Description**: "RADIATE Data API" (or any name you prefer)
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web App URL** - you'll need this!

### 3. Configure Your Environment

Add the Apps Script URL to your `.env` file:

```bash
# .env or .env.local
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual script deployment URL.

## Using the Integration

### Fetch Data from Apps Script

```typescript
import { fetchFromAppsScript, APPS_SCRIPT_URLS } from '@/lib/googleSheets';

// Fetch data
const data = await fetchFromAppsScript(APPS_SCRIPT_URLS.main);
console.log(data);
```

### Post Data to Apps Script

```typescript
import { postToAppsScript, APPS_SCRIPT_URLS } from '@/lib/googleSheets';

// Append data
const result = await postToAppsScript(APPS_SCRIPT_URLS.main, {
  action: 'append',
  data: [
    ['Column1', 'Column2', 'Column3'],
    ['Value1', 'Value2', 'Value3']
  ]
});
```

### Using the AppsScriptData Component

```tsx
import AppsScriptData from '@/components/AppsScriptData';

export default function MyPage() {
  return (
    <AppsScriptData
      title="My Data"
      description="Real-time data from Google Sheets"
      scriptUrl="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
    />
  );
}
```

## Admin Panel Usage

Navigate to **Admin Panel > Data Management > Google Sheets Data** to:

1. **View Data** - See real-time data from your Google Sheets
2. **Upload CSV** - Upload CSV files directly to your Google Sheets
3. **Export Data** - Download data as CSV files
4. **Settings** - View and verify your Apps Script configuration

## Troubleshooting

### Common Issues

1. **TypeError: setHeaders is not a function**
   - This error occurs if you try to use `.setHeaders()` on ContentService
   - Solution: Remove `.setHeaders()` - it's not a valid method

2. **CORS Errors**
   - Apps Script should handle CORS automatically
   - Make sure your deployment is set to "Anyone" for access

3. **No Data Showing**
   - Check that your Google Sheet has data in the first sheet
   - Verify the Apps Script URL is correct in your `.env` file
   - Check browser console for error messages

4. **Authorization Errors**
   - Re-deploy the Apps Script
   - Make sure "Execute as" is set to "Me"
   - Try accessing the URL directly in your browser first

### Testing Your Apps Script

Test directly in browser:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

You should see JSON data returned.

## Advanced Usage

### Multiple Sheets

You can modify the Apps Script to handle multiple sheets:

```javascript
function doGet(e) {
  const sheetName = e.parameter.sheet || 'Sheet1';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // ... rest of the code
}
```

Then call it with:
```typescript
const data = await fetchFromAppsScript(
  APPS_SCRIPT_URLS.main + '?sheet=Sheet2'
);
```

### Custom Actions

Add custom actions to your `doPost` function:

```javascript
if (data.action === 'update') {
  // Handle update logic
} else if (data.action === 'delete') {
  // Handle delete logic
}
```

## Security Considerations

1. **Public Access**: Apps Script with "Anyone" access is public
2. **Rate Limits**: Google has rate limits for Apps Script executions
3. **Data Validation**: Always validate data before writing to sheets
4. **Sensitive Data**: Don't expose sensitive information through public Apps Script

## Next Steps

- Set up multiple Apps Script endpoints for different sheets
- Add authentication if needed
- Implement data caching for better performance
- Add error handling and retry logic

## Support

For more information, visit:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Guide](https://developers.google.com/sheets/api)
