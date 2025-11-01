export interface SheetConfig {
  spreadsheetId: string;
  range: string;
}

export async function fetchSheetData(config: SheetConfig): Promise<any[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
  const { spreadsheetId, range } = config;

  if (!apiKey) {
    console.warn('Google Sheets API key not configured');
    return [];
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    if (rows.length === 0) {
      return [];
    }

    const headers = rows[0];
    const dataRows = rows.slice(1);

    return dataRows.map((row: any[]) => {
      const obj: any = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}

export async function appendSheetData(
  config: SheetConfig,
  values: any[][]
): Promise<boolean> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
  const { spreadsheetId, range } = config;

  if (!apiKey) {
    console.warn('Google Sheets API key not configured');
    return false;
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to append sheet data: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error appending sheet data:', error);
    return false;
  }
}

export const SHEET_CONFIGS = {
  clinicalCases: {
    spreadsheetId: process.env.NEXT_PUBLIC_CLINICAL_CASES_SHEET_ID || '',
    range: 'Cases!A1:Z1000',
  },
  myths: {
    spreadsheetId: process.env.NEXT_PUBLIC_MYTHS_SHEET_ID || '',
    range: 'Myths!A1:Z1000',
  },
  organDoses: {
    spreadsheetId: process.env.NEXT_PUBLIC_ORGAN_DOSES_SHEET_ID || '',
    range: 'Organs!A1:Z1000',
  },
  cancerData: {
    spreadsheetId: process.env.NEXT_PUBLIC_CANCER_DATA_SHEET_ID || '',
    range: 'Data!A1:Z1000',
  },
  patientJourney: {
    spreadsheetId: process.env.NEXT_PUBLIC_PATIENT_JOURNEY_SHEET_ID || '',
    range: 'Journey!A1:Z1000',
  },
  sideEffects: {
    spreadsheetId: process.env.NEXT_PUBLIC_SIDE_EFFECTS_SHEET_ID || '',
    range: 'SideEffects!A1:Z1000',
  },
  therapyModalities: {
    spreadsheetId: process.env.NEXT_PUBLIC_THERAPY_MODALITIES_SHEET_ID || '',
    range: 'Modalities!A1:Z1000',
  },
  bedCalculations: {
    spreadsheetId: process.env.NEXT_PUBLIC_BED_CALCULATIONS_SHEET_ID || '',
    range: 'Calculations!A1:Z1000',
  },
};
