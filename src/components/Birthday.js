import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Birthday = ({ birthday, DeleteBirthday }) => {
  const isOld = birthday.days > 0;
  const isToday = birthday.days === 0;

  const infoDay = () => {
    if (isToday) return <Text style={{ color: "#fff" }}> Es Hoy! </Text>;
    else {
      const days = -birthday.days;

      return (
        <View style={styles.days}>
          <Text>{days}</Text>
          <Text> {days === 1 ? "Dia" : "Dias"}</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => DeleteBirthday(birthday)}
      style={[
        styles.card,
        isOld ? styles.old : isToday ? styles.today : styles.current,
      ]}
    >
      <Text style={styles.user}>
        {birthday.name} {birthday.lastName}
      </Text>

      {isOld ? <Text style={{ color: "#fff" }}>Pasado</Text> : infoDay()}
    </TouchableOpacity>
  );
};

export default Birthday;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  old: {
    backgroundColor: "#820000",
  },
  current: {
    backgroundColor: "#1aa1f2",
  },
  today: {
    backgroundColor: "#559204",
  },
  user: {
    color: "#fff",
    fontSize: 16,
  },
  days: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
