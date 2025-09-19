import { Colors } from "@/constants/Colors";
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
import { IconSymbol } from "../ui/IconSymbol";

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const daysShort = ["D", "L", "M", "Mi", "J", "V", "S"];
const screenWidth = Dimensions.get("window").width;
const DAYS_IN_WEEK = 7;
const TOTAL_DAYS = 42;
const YEAR_ITEM_WIDTH = 70;
const MONTH_ITEM_WIDTH = 80;

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

  // Centralizar fecha de hoy al abrir
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [day, setDay] = useState(initialDate.getDate());

  const flatListYearRef = useRef<FlatList>(null);
  const flatListMonthRef = useRef<FlatList>(null);

  const years = useMemo(() => {
    const arr = [];
    for (let y = 1900; y <= currentYear + 50; y++) {
      arr.push(y);
    }
    return arr;
  }, [currentYear]);

  useEffect(() => {
    if (visible) {
      // centre year y month siempre que el modal se abre
      const idxYear = years.indexOf(initialDate.getFullYear());
      flatListYearRef.current?.scrollToIndex({
        index: idxYear,
        animated: false,
        viewPosition: 0.5,
      });
      flatListMonthRef.current?.scrollToIndex({
        index: initialDate.getMonth(),
        animated: false,
        viewPosition: 0.5,
      });
      setYear(initialDate.getFullYear());
      setMonth(initialDate.getMonth());
      setDay(initialDate.getDate());
    }
  }, [visible, initialDate, years]);

  useEffect(() => {
    if (!visible) return;
    setTimeout(() => {
      if (flatListYearRef.current) {
        const indexYear = years.indexOf(year);
        flatListYearRef.current.scrollToIndex({
          index: indexYear,
          viewPosition: -2.21,
          animated: true,
        });
      }
      if (flatListMonthRef.current) {
        flatListMonthRef.current.scrollToIndex({
          index: month,
          viewPosition: -0.75,
          animated: true,
        });
      }
    }, 10);
  }, [visible, year, month, years]);

  // Navegación con flechas años
  const moveYear = (delta: number) => {
    const idx = years.indexOf(year);
    let newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= years.length) return;
    setYear(years[newIdx]);
    flatListYearRef.current?.scrollToIndex({
      index: newIdx,
      animated: true,
      viewPosition: 0.5,
    });
  };

  // Selecciona año y centra scroll
  const selectYear = (selectedYear: number) => {
    setYear(selectedYear);
    const idx = years.indexOf(selectedYear);
    flatListYearRef.current?.scrollToIndex({
      index: idx,
      animated: true,
      viewPosition: 0.5,
    });
  };

  // Navegación con flechas meses
  const moveMonth = (delta: number) => {
    let newMonth = month + delta;
    if (newMonth < 0) newMonth = months.length - 1;
    else if (newMonth >= months.length) newMonth = 0;
    setMonth(newMonth);
    flatListMonthRef.current?.scrollToIndex({
      index: newMonth,
      animated: true,
      viewPosition: -2.21,
    });
  };

  // Selecciona mes y centra scroll
  const selectMonth = (idx: number) => {
    setMonth(idx);
    flatListMonthRef.current?.scrollToIndex({
      index: idx,
      animated: true,
      viewPosition: -0.75,
    });
  };

  // Días del mes actual
  const daysInMonth = useMemo(
    () => new Date(year, month + 1, 0).getDate(),
    [year, month]
  );
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

  // Scroll error fix
  const handleYearScrollError = (info: {
    index: number;
    averageItemLength: number;
  }) => {
    flatListYearRef.current?.scrollToOffset({
      offset: info.index * YEAR_ITEM_WIDTH,
      animated: true,
    });
    setTimeout(() => {
      flatListYearRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0.5,
      });
    }, 30);
  };
  const handleMonthScrollError = (info: {
    index: number;
    averageItemLength: number;
  }) => {
    flatListMonthRef.current?.scrollToOffset({
      offset: info.index * MONTH_ITEM_WIDTH,
      animated: true,
    });
    setTimeout(() => {
      flatListMonthRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0.5,
      });
    }, 30);
  };

  const weekRows = [];
  for (let i = 0; i < daysMatrix.length; i += 7) {
    weekRows.push(daysMatrix.slice(i, i + 7));
  }

  const daySize = (screenWidth - 75) / DAYS_IN_WEEK;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Scroll horizontal AÑOS con flechas */}
          <View style={styles.scrollRow}>
            <TouchableOpacity
              style={styles.arrowScroll}
              onPress={() => moveYear(-1)}
              disabled={years.indexOf(year) === 0}
            >
              <IconSymbol
                style={styles.arrowScrollText}
                name="chevron.left"
                color={Colors.default.active}
              />
            </TouchableOpacity>
            <FlatList
              ref={flatListYearRef}
              data={years}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.yearsList}
              contentContainerStyle={{
                paddingHorizontal: (screenWidth - YEAR_ITEM_WIDTH) / 2,
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.yearItem,
                    item === year && styles.selectedYear,
                  ]}
                  onPress={() => selectYear(item)}
                >
                  <Text
                    style={
                      item === year ? styles.selectedYearText : styles.yearText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              getItemLayout={(_, index) => ({
                length: YEAR_ITEM_WIDTH,
                offset: YEAR_ITEM_WIDTH * index,
                index,
              })}
              onScrollToIndexFailed={handleYearScrollError}
            />
            <TouchableOpacity
              style={styles.arrowScroll}
              onPress={() => moveYear(1)}
              disabled={years.indexOf(year) === years.length - 1}
            >
              <IconSymbol
                style={styles.arrowScrollText}
                name="chevron.right"
                color={Colors.default.active}
              />
            </TouchableOpacity>
          </View>

          {/* Scroll horizontal MESES con flechas */}
          <View style={styles.scrollRow}>
            <TouchableOpacity
              style={styles.arrowScroll}
              onPress={() => moveMonth(-1)}
            >
              <IconSymbol
                style={styles.arrowScrollText}
                name="chevron.left"
                color={Colors.default.active}
              />
            </TouchableOpacity>
            <FlatList
              ref={flatListMonthRef}
              data={months}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.monthsList}
              contentContainerStyle={{
                paddingHorizontal: (screenWidth - YEAR_ITEM_WIDTH) / 2,
              }}
              snapToInterval={MONTH_ITEM_WIDTH}
              decelerationRate="fast"
              scrollEventThrottle={16}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.monthItem,
                    index === month && styles.selectedMonth,
                  ]}
                  onPress={() => selectMonth(index)}
                >
                  <Text
                    style={
                      index === month
                        ? styles.selectedMonthText
                        : styles.monthText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              getItemLayout={(_, index) => ({
                length: MONTH_ITEM_WIDTH,
                offset: MONTH_ITEM_WIDTH * index,
                index,
              })}
              onScrollToIndexFailed={handleMonthScrollError}
            />

            <TouchableOpacity
              style={styles.arrowScroll}
              onPress={() => moveMonth(1)}
            >
              <IconSymbol
                style={styles.arrowScrollText}
                name="chevron.right"
                color={Colors.default.active}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDays}>
            {daysShort.map((d) => (
              <Text key={d} style={styles.weekDayText}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {weekRows.map((week, rowIndex) => (
              <View key={rowIndex} style={styles.weekRow}>
                {week.map((d, i) => (
                  <TouchableOpacity
                    key={i}
                    disabled={!d}
                    style={[
                      styles.dayCell,
                      {
                        backgroundColor:
                          d === day ? Colors.default.active : "transparent",
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
                        {
                          opacity: d ? 1 : 0,
                          color: d === day ? "white" : Colors.default.text,
                        },
                      ]}
                    >
                      {d ?? ""}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  modalContainer: {
    width: "90%",
    padding: 18,
    elevation: 10,
    borderRadius: 28,
    alignItems: "center",
    backgroundColor: Colors.default.background,
  },
  scrollRow: {
    width: "100%",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowScroll: {
    width: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowScrollText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.default.active,
  },
  yearsList: {
    flexGrow: 0,
    maxHeight: 50,
  },
  yearItem: {
    width: YEAR_ITEM_WIDTH,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
  },
  selectedYear: {
    borderColor: Colors.default.active,
    backgroundColor: Colors.default.background,
  },
  yearText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.default.text,
  },
  selectedYearText: {
    fontWeight: "bold",
    color: Colors.default.active,
  },
  monthsList: {
    flexGrow: 0,
    maxHeight: 50,
  },
  monthItem: {
    width: MONTH_ITEM_WIDTH,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
  },
  selectedMonth: {
    borderColor: Colors.default.active,
    backgroundColor: Colors.default.background,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.default.text,
  },
  selectedMonthText: {
    fontWeight: "bold",
    color: Colors.default.active,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekDayText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 10,
    color: Colors.default.mutedText,
  },
  daysGrid: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  dayCell: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 16,
    minWidth: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonsRow: {
    width: "95%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelText: {
    color: Colors.default.accent,
    fontSize: 18,
    marginRight: 12,
    fontWeight: "500",
  },
  acceptButton: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 28,
    backgroundColor: Colors.default.accent,
  },
  acceptText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default CustomDatePicker;
