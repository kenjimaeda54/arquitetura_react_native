import { useState } from "react";
import useHolidays from "../../client/useHolidays";
import { HolidaysList } from "./HolidaysList";
import { DataOrException, Loading } from "../../data_or_exceptions/dataOrException";


interface HolidaysModel {
  getHolidays: () => void;
  holidays: DataOrException<HolidaysList>;
  markedDates: MarkedDates[]
}





export default function useHolidaysModel(): HolidaysModel {
  const [holidays, setHolidays] = useState<DataOrException<HolidaysList>>(new DataOrException<HolidaysList>(undefined, undefined, Loading.none));
  const [markedDates, setMarkedDates] = useState<MarkedDates>({} as MarkedDates)
  const { fetchHolidays } = useHolidays();

  async function getHolidays() {
    const data = await fetchHolidays()
    setHolidays(data)
  }

  return {
    holidays,
    getHolidays,
  }


}