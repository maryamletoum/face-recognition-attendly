
import * as XLSX from 'xlsx';

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
}

/**
 * Generate and download an Excel file from data
 * @param data The array of data to export
 * @param columns The columns configuration
 * @param filename The name of the file to download (without extension)
 */
export const exportToExcel = (
  data: any[],
  columns: ExportColumn[],
  filename: string
): void => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Transform data based on columns definition
  const formattedData = data.map(item => {
    const row: Record<string, any> = {};
    columns.forEach(column => {
      row[column.header] = item[column.key];
    });
    return row;
  });
  
  // Create worksheet from the formatted data
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  
  // Set column widths
  const columnWidths = columns.map(col => ({ wch: col.width || 15 }));
  worksheet['!cols'] = columnWidths;
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  // Generate and download the Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
