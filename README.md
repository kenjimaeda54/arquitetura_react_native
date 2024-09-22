# Arquitetura em React Native


- Para lidar com um data generico fiz usando classe segue o modelo
  
```typescript

export enum Loading {
  none,

  loading, error, success
}

export class DataOrException<T> {
  data?: T;
  exception?: Error;
  loading: Loading;
  constructor(data: T | undefined, exception: Error | undefined, loading: Loading) {
    this.data = data;
    this.exception = exception;
    this.loading = loading;
  }
}


//depois usa no serviço
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


//deepois no model
interface HolidaysModel {
  getHolidays: () => void;
  holidays: DataOrException<HolidaysList>;
}



export default function useHolidaysModel(): HolidaysModel {
  const [holidays, setHolidays] = useState<DataOrException<HolidaysList>>(new DataOrException<HolidaysList>(undefined, undefined, Loading.none));
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

//por fim na UI
export default function HomeScreen() {
  const { getHolidays, holidays } = useHolidaysModel()

  useEffect(() => {
    getHolidays()
  }, [])

  if (holidays.loading === Loading.loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator color={'black'} />
      </View >

    )
  }

  if (holidays.loading === Loading.error) {
    return (
      <View style={style.container}>
        <Text style={style.text}>Error</Text>
      </View>
    )
  }


  if (holidays.loading === Loading.success) {
    let markedDay = {} as { [key: string]: { marked: boolean, selected: boolean, selectedColor: string } }

    for (let holiday of holidays.data!.holidays) {
      markedDay[holiday.date] = {
        marked: true,
        selected: true,
        selectedColor: 'red'
      }
    }



    return (
      <View style={style.container}>
        <Calendar
          initialDate={"2024-01-01"}
          markedDates={markedDay}
        />
      </View>
    )
  }

}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 13
  },
  text: {
    color: 'black',
    fontSize: 20
  }
})
```


- Uma ideia como usar interceptador com zustand para disparar imediamente a tela de login


```typescript

//store
interface LoginStore {
  isLogged: boolean
  updateIsLogged: (isLogged: boolean) => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  isLogged: false,
  updateIsLogged: (isLogged: boolean) => set((_) => ({
    isLogged: isLogged
  })),
}));

export const unsubscribeLogin = useLoginStore.subscribe(
  (state) => state.isLogged)

unsubscribeLogin()


//comparando no serviço
const api = axios.create({
  baseURL: "https://api.getfestivo.com",
});

api.interceptors.request.use(function (config) {
  config.params = {
    api_key: "tok_v3_vsJn3nwrOPWkAZoZj4v9aEmPuwZt6tsxpeFdmJg9Dcc44PvB",
    country: "BR",
    year: "2024"

  }
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  //poderia comparar com o status code para redirecionar para a tela de login
  if (error.response?.status === 400) {
    useLoginStore.setState({ isLogged: false })
  }
  return Promise.reject(error);
});
export { api }


//usando no principal

export default function App() {
  const isLogged = useLoginStore((state) => state.isLogged)



  return (
    isLogged ? <HomeScreen /> : <LoginScreen />
  )
}

```




