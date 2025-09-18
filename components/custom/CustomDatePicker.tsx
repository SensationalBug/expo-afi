import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const months = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];
const daysShort = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const screenWidth = Dimensions.get("window").width;
const DAYS_IN_WEEK = 7;
const TOTAL_DAYS = 42;

const CustomDatePicker = ({
  visible,
  onClose,
  onConfirm,
  initialDate = new Date(),
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
}) => {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [day, setDay] = useState(initialDate.getDate());

  const flatListYearRef = useRef<FlatList>(null);
  const flatListMonthRef = useRef<FlatList>(null);

  const changeMonth = (delta: number) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setMonth(newMonth);
    setYear(newYear);
    const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
    if (day > daysInNewMonth) setDay(daysInNewMonth);
  };

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [
    year,
    month,
  ]);
  if (day > daysInMonth) setDay(daysInMonth);

  const daysMatrix = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInThisMonth = new Date(year, month + 1, 0).getDate();
    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInThisMonth; d++) arr.push(d);
    while (arr.length < TOTAL_DAYS) arr.push(null);
    return arr;
  }, [year, month]);

  const daySize = (screenWidth - 48) / DAYS_IN_WEEK;

  const years = useMemo(() => {
    const arr = [];
    for (let y = 1900; y <= currentYear + 50; y++) {
      arr.push(y);
    }
    return arr;
  }, [currentYear]);

  useEffect(() => {
    if (flatListYearRef.current) {
      const index = years.indexOf(year);
      if (index >= 0) {
        flatListYearRef.current.scrollToIndex({
          index,
          animated: false,
          viewPosition: 0.5,
        });
      }
    }
  }, [year, years]);

  useEffect(() => {
    if (flatListMonthRef.current) {
      flatListMonthRef.current.scrollToIndex({
        index: month,
        animated: false,
        viewPosition: 0.5,
      });
    }
  }, [month]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Scroll horizontal años */}
          <FlatList
            ref={flatListYearRef}
            data={years}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.yearsList}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.yearItem, item === year && styles.selectedYear]}
                onPress={() => setYear(item)}
              >
                <Text
                  style={item === year ? styles.selectedYearText : styles.yearText}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Scroll horizontal meses */}
          <FlatList
            ref={flatListMonthRef}
            data={months}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.monthsList}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.monthItem, index === month && styles.selectedMonth]}
                onPress={() => setMonth(index)}
              >
                <Text
                  style={index === month ? styles.selectedMonthText : styles.monthText}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.weekDays}>
            {daysShort.map((w) => (
              <Text key={w} style={styles.weekDayText}>
                {w}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {daysMatrix.map((d, i) => (
              <TouchableOpacity
                key={i}
                disabled={!d}
                style={[
                  styles.dayCell,
                  {
                    backgroundColor: d === day ? "#2979FF" : "transparent",
                    width: daySize,
                    height: daySize,
                  },
                ]}
                onPress={() => d && setDay(d)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: d === day ? "white" : "#282B32", opacity: d ? 1 : 0 },
                  ]}
                >
                  {d ?? ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onConfirm(new Date(year, month, day));
                onClose();
              }}
              style={styles.acceptButton}
            >
              <Text style={styles.acceptText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 28,
    padding: 18,
    alignItems: "center",
    elevation: 7,
  },
  yearsList: {
    maxHeight: 50,
    marginBottom: 10,
  },
  yearItem: {
    width: 70,
    marginHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedYear: {
    borderColor: "#007AFF",
    backgroundColor: "#E0F0FF",
  },
  yearText: {
    fontSize: 16,
    color: "#303F60",
    fontWeight: "500",
  },
  selectedYearText: {
    color: "#007AFF",
    fontWeight: "700",
  },
  monthsList: {
    maxHeight: 50,
    marginBottom: 10,
  },
  monthItem: {
    width: 80,
    padding: 10,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedMonth: {
    backgroundColor: "#E3F2FD",
    borderColor: "#42A5F5",
  },
  monthText: {
    fontSize: 16,
    color: "#303F60",
    fontWeight: "500",
  },
  selectedMonthText: {
    color: "#1A237E",
    fontWeight: "700",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  weekDayText: {
    fontSize: 16,
    color: "#8B8B8B",
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 24,
    justifyContent: "center",
  },
  dayCell: {
    margin: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    minWidth: 24,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 6,
    alignItems: "center",
  },
  cancelText: {
    color: "#2979FF",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 12,
  },
  acceptButton: {
    backgroundColor: "#2979FF",
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 8,
  },
  acceptText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default CustomDatePicker;
