import { useEffect } from "react"
import useHolidaysModel from "../../../data/model/holidays/useHolidaysModel"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { Loading } from "../../../data/data_or_exceptions/dataOrException"
import { Calendar } from "react-native-calendars"

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