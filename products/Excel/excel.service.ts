import * as XLSX from 'xlsx';
export class ExcelService {
  async readExcelFile(filePath: string):  Promise<any[]> {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(worksheet);
  }
}