import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import ActionBar from "./ActionBar";
import AddBirthday from "./AddBirthday";
import firebase from "../utils/firebase";
import moment from "moment";
import Birthday from "./Birthday";
const db = firebase.firestore();

const ListBirthday = ({ user }) => {
  const [showList, setShowList] = useState(false);
  const [birthdays, setBirthdays] = useState([]);
  const [oldsBirthdays, setOldsBirthdays] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setBirthdays([]);
    db.collection(`${user.uid}/birthday/dates`)
      .orderBy("dateBirth", "asc")
      .get()
      .then((resp) => {
        const items = [];
        resp.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        formatData(items);
        // console.log(items);
      });
    setReload(false);
  }, [reload]);

  const formatData = (items = []) => {
    // setBirthdays(items);
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const tmpArray = [];
    const oldTmpArray = [];

    items.forEach((i) => {
      const dateBorth = new Date(i.dateBirth.seconds * 1000);
      const dateBirthday = moment(dateBorth);
      const currentYear = moment().get("year");

      dateBirthday.set({
        year: currentYear,
      });

      const diffDate = currentDate.diff(dateBirthday, "days");
      const itemTmp = i;

      itemTmp.dateBirth = dateBirthday;
      itemTmp.days = diffDate;

      if (diffDate <= 0) {
        tmpArray.push(itemTmp);
      } else {
        oldTmpArray.push(itemTmp);
      }
    });
    setBirthdays(tmpArray);
    setOldsBirthdays(oldTmpArray);
  };

  const DeleteBirthday = (birthday) => {
    Alert.alert(
      "Eliminar Cumpleaños",
      `¿Estas seguro de eliminar el cumpleaños?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            db.collection(`${user.uid}/birthday/dates`)
              .doc(birthday.id)
              .delete()
              .then(()=> {
                setReload(true)
              })
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scroll}>
          {birthdays.map((b, i) => (
            <Birthday key={i} birthday={b} DeleteBirthday={DeleteBirthday} />
          ))}
          {oldsBirthdays.map((b, i) => (
            <Birthday key={i} birthday={b} DeleteBirthday={DeleteBirthday} />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReload={setReload}
        />
      )}

      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
};

export default ListBirthday;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  scroll: {
    marginBottom: 90,
    width: "100%",
  },
});
