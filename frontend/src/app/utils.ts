import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

/**
 * Converte uma Data no formato ISO8601 para o formato esperado do DataPicker
 * @param {string} date Data no Formato ISO8601
 * @returns {NgbDateStruct}
 */
export function convertISO8601ToDataStruct(date: string) : NgbDateStruct {
  const nativeDate = new Date(date);
  return <NgbDateStruct> {
    year: nativeDate.getFullYear(),
    month: nativeDate.getMonth()+1,
    day: nativeDate.getDate(),
  };
}

/**
 * Converte uma Data do tipo NgbDateStruct para o formato ISO8601
 * @param {NgbDateStruct} date
 * @param [onlyDate=false]
 * @returns {string}
 */
export function convertDataStructToISO8601(date: NgbDateStruct, onlyDate: boolean = false) : string {
  const nativeDate = new Date(date.year, date.month-1, date.day);
  let dateString =  nativeDate.toISOString().toString();

  if (onlyDate) {
    dateString = dateString.substr(0, 10);
  }

  return dateString;
}

