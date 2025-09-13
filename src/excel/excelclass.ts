import ExcelJS from "exceljs";

export class ExcelExporter {
    workbook: ExcelJS.Workbook;

    constructor() {
        this.workbook = new ExcelJS.Workbook();
    }

    async generateWorkbook({ sheetName, columns, data }: any) {
        const sheet = this.workbook.addWorksheet(sheetName);
        sheet.columns = columns;
        sheet.addRows(data);
    }

    async writeToBuffer() {
        return await this.workbook.xlsx.writeBuffer();
    }
}
