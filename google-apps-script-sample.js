/**
 * RADIATE Platform - Google Apps Script Integration
 * 
 * This script enables the RADIATE platform to fetch and update data
 * from Google Sheets via HTTP requests.
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Deploy as Web App (Deploy > New deployment)
 * 5. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 6. Copy the Web App URL to your .env file as NEXT_PUBLIC_APPS_SCRIPT_URL
 */

/**
 * Handle GET requests - Returns all data from the active sheet as JSON
 * 
 * @param {Object} e - Event parameter containing request details
 * @returns {TextOutput} JSON response with sheet data
 */
function doGet(e) {
  try {
    // Get the active sheet (you can modify this to handle specific sheets)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get all data from the sheet
    const data = sheet.getDataRange().getValues();
    
    if (data.length === 0) {
      return createJsonResponse([]);
    }
    
    // Convert to array of objects using first row as headers
    const headers = data[0];
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
    
    return createJsonResponse(rows);
    
  } catch (error) {
    return createJsonResponse({ 
      error: error.toString(),
      message: 'Failed to fetch data from Google Sheets'
    });
  }
}

/**
 * Handle POST requests - Supports various actions like append, update, delete
 * 
 * @param {Object} e - Event parameter containing POST data
 * @returns {TextOutput} JSON response with operation result
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const requestData = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Handle different actions
    switch (requestData.action) {
      case 'append':
        return handleAppend(sheet, requestData.data);
      
      case 'update':
        return handleUpdate(sheet, requestData.rowIndex, requestData.data);
      
      case 'delete':
        return handleDelete(sheet, requestData.rowIndex);
      
      default:
        return createJsonResponse({ 
          error: 'Invalid action',
          message: 'Supported actions: append, update, delete'
        });
    }
    
  } catch (error) {
    return createJsonResponse({ 
      error: error.toString(),
      message: 'Failed to process POST request'
    });
  }
}

/**
 * Append new rows to the sheet
 */
function handleAppend(sheet, data) {
  if (!data || !Array.isArray(data)) {
    return createJsonResponse({ 
      error: 'Invalid data format',
      message: 'Data must be an array of arrays'
    });
  }
  
  const lastRow = sheet.getLastRow();
  const numRows = data.length;
  const numCols = data[0].length;
  
  sheet.getRange(lastRow + 1, 1, numRows, numCols).setValues(data);
  
  return createJsonResponse({ 
    success: true,
    message: `Successfully appended ${numRows} row(s)`,
    rowsAdded: numRows
  });
}

/**
 * Update an existing row
 */
function handleUpdate(sheet, rowIndex, data) {
  if (!rowIndex || !data || !Array.isArray(data)) {
    return createJsonResponse({ 
      error: 'Invalid parameters',
      message: 'rowIndex and data array are required'
    });
  }
  
  sheet.getRange(rowIndex, 1, 1, data.length).setValues([data]);
  
  return createJsonResponse({ 
    success: true,
    message: `Successfully updated row ${rowIndex}`
  });
}

/**
 * Delete a row from the sheet
 */
function handleDelete(sheet, rowIndex) {
  if (!rowIndex || rowIndex <= 1) {
    return createJsonResponse({ 
      error: 'Invalid row index',
      message: 'rowIndex must be greater than 1 (cannot delete header row)'
    });
  }
  
  sheet.deleteRow(rowIndex);
  
  return createJsonResponse({ 
    success: true,
    message: `Successfully deleted row ${rowIndex}`
  });
}

/**
 * Helper function to create JSON response
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: Handle specific sheet by name
 * Add ?sheet=SheetName to the URL
 */
function doGetWithSheetName(e) {
  try {
    const sheetName = e.parameter.sheet || 'Sheet1';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      return createJsonResponse({ 
        error: 'Sheet not found',
        message: `No sheet named "${sheetName}" exists`
      });
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length === 0) {
      return createJsonResponse([]);
    }
    
    const headers = data[0];
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
    
    return createJsonResponse(rows);
    
  } catch (error) {
    return createJsonResponse({ 
      error: error.toString()
    });
  }
}

/**
 * Test function - You can run this in the Apps Script editor to test
 */
function testGet() {
  const result = doGet({});
  Logger.log(result.getContent());
}

/**
 * Test function for POST
 */
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        action: 'append',
        data: [
          ['Test1', 'Test2', 'Test3']
        ]
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
