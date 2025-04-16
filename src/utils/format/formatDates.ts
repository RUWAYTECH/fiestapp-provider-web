import { format, endOfMonth, subMonths, startOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';

export function formatDateddMMyyyyHHmmss (date: string) {
	return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
}

export function formatDateddMMyyyy(value: string) {
	return format(new Date(value), 'dd/MM/yyyy');
}

export default {formatDateddMMyyyyHHmmss, formatDateddMMyyyy };

export function formatDateYYYYMMDD(value: any) {
	const formatMessage = value ? format(new Date(value), 'yyyy-MM-dd') : ''
	return formatMessage
}
export const getNameMonth = (date: string)=>{
	return format(new Date(date), 'MMMM', { locale: es }).toUpperCase();
}

export const getNameMonthAndYear = (date: string)=>{
    const dateTime = new Date(date);
    const year: number = dateTime.getFullYear();
    const month = format(dateTime, 'MMMM', { locale: es });
	return  month.charAt(0).toUpperCase() + month.slice(1)+'-'+year;
}

export const getEndOfMonth= ()=> {
	const currentDate = new Date();
	return endOfMonth(subMonths(currentDate, 1));
}

export const getStartOfMonth = ()=>{
	const currentDate = new Date();
	return startOfMonth(subMonths(currentDate, 1));
}

export const getStartMonth = (date: any) => {
    const currentDate = date ? new Date(date) : new Date();
    const startOfMonthDate = startOfMonth(subMonths(currentDate, 1));
    startOfMonthDate.setHours(0, 0, 0, 0); // Establecer la hora a la primera hora del día
    return startOfMonthDate.toISOString(); // Devuelve la fecha con la primera hora del día
}

export const getEndMonth = (date: any) => {
    const currentDate = date ? new Date(date) : new Date();
    const endOfMonthDate = endOfMonth(subMonths(currentDate, 1));
    endOfMonthDate.setHours(23, 59, 59, 999); // Establecer la hora a la última hora del día
    return endOfMonthDate.toISOString(); // Devuelve la fecha con la última hora del día
}
export const getYearAndMonth = (date: any) => {
    const startOfMonthDate = dayjs(date).startOf('month').startOf('day').toISOString();
    const endOfMonthDate = dayjs(date).endOf('month').endOf('day').toISOString();
    return {
        start: startOfMonthDate,
        end: endOfMonthDate
    };
}