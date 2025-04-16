import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const generateExcelFile = async (headers: string[], columnNames: string[] , data: any, fileName: string) => {

    const transformedData = data.map((report: any) => [
        ...columnNames.map((columnName: string) =>report[columnName])
    ]);

    const dataWithHeaders = [headers, ...transformedData];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);


    const headerStyle = {
        font: { bold: true },
        fill: { fgColor: { rgb: "00FF00" } },
    };


    const headerRange = XLSX.utils.decode_range(worksheet["!ref"] ?? "");
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        worksheet[cellAddress].s = headerStyle;
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");


    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(excelBlob, `${fileName}.xlsx`);
};

export default generateExcelFile;