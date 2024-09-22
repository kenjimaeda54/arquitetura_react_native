import { Axios, AxiosError } from "axios";
import { api } from "../api/api";
import { DataOrException, Loading } from "../data_or_exceptions/dataOrException";
import { HolidaysList } from "../model/holidays/HolidaysList";


interface Holidays {
  fetchHolidays(): Promise<DataOrException<HolidaysList>>
}

export default function useHolidays(): Holidays {


  async function fetchHolidays(): Promise<DataOrException<HolidaysList>> {
    let data = new DataOrException<HolidaysList>(undefined, undefined, Loading.loading);
    try {
      const response = await api.get("/public-holidays/v3/list");
      if (response.status === 200) {
        data = new DataOrException<HolidaysList>(response.data, undefined, Loading.success);
      }
    } catch (error) {
      const exception = error as AxiosError
      data = new DataOrException<HolidaysList>(undefined, exception, Loading.error);
    }

    return data

  }

  return {
    fetchHolidays
  }


}