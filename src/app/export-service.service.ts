import { Injectable } from '@angular/core';
import { WorkBook, WorkSheet, WritingOptions, read, writeFileXLSX as writeFile, utils, version, set_cptable } from 'xlsx';
//import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
//set_cptable(cpexcel);

type AOA = any[][];

@Injectable({
  providedIn: 'root'
})
export class ExportServiceService {

  constructor() { }

  data: AOA = [ [1, 2], [3, 4] ];
	wopts: WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
	ver: string = version;

  export(): void {
		/* generate worksheet */
		const ws: WorkSheet = utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb: WorkBook = utils.book_new();
		utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		writeFile(wb, this.fileName);
	}
  
}
