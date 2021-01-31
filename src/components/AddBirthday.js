import moment from "moment";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  LogBox,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from "../utils/firebase";

const db = firebase.firestore();
// db.settings({experimentalForceLongPolling: true})

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const initialState = {
  dateBirth: "",
  name: "",
  lastName: "",
};

const AddBirthday = ({ user, setShowList, setReload }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});

  const handleHidePicker = () => {
    setShowPicker(false);
  };
  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const handleConfirmPicker = (date) => {
    const dateBirth = new Date(date);

    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({ ...formData, dateBirth });
    handleHidePicker();
  };

  const handleChange = (e, type) =>
    setFormData({ ...formData, [type]: e.nativeEvent.text });

  const handleSubmit = () => {
    let errors = {};
    for (let item in formData) {
      if (!formData[item]) errors[item] = true;
    }

    setFormError(errors);
    if (Object.keys(formError).length) return;

    const data = formData;
    data.dateBirth.setYear(0);

    db.collection(`${user.uid}/birthday/dates`)
      .add(data)
      .then(() => {
        console.log("fecha guardada");
        setReload(true)
        setShowList(true);
      })
      .catch((e) => {
        console.log(e.toString());
        setFormError({
          name: true,
          lastName: true,
          dateBirth: true,
        });
      });
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.textInput, formError.name && styles.emptyField]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={(e) => handleChange(e, "name")}
        />
        <TextInput
          style={[styles.textInput, formError.lastName && styles.emptyField]}
          placeholder="Apellido"
          placeholderTextColor="#969696"
          onChange={(e) => handleChange(e, "lastName")}
        />
        <View
          style={[
            styles.textInput,
            styles.date,
            formError.dateBirth && styles.emptyField,
          ]}
        >
          <Text
            onPress={handleShowPicker}
            style={{
              fontSize: 18,
              color: formData.dateBirth ? "#fff" : "#969696",
            }}
          >
            {formData.dateBirth
              ? moment(formData.dateBirth).format("LL")
              : "Fecha de nacimiento"}
          </Text>
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.addButton}>Crear cumpleaños </Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleConfirmPicker}
        onCancel={handleHidePicker}
      />
    </>
  );
};

export default AddBirthday;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    color: "#fff",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#1e3040",
    borderRadius: 50,
  },
  date: {
    justifyContent: "center",
  },
  addButton: {
    fontSize: 18,
    color: "#fff",
  },
  emptyField: {
    borderColor: "#940c0c",
  },
});
