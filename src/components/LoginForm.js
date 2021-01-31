import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { validateEmail } from "../utils/validations";
import firebase from "../utils/firebase";

const initialState = {
  email: "edgarolivar16@gmail.com",
  password: "123456",
};

export default function LoginForm({ handleChangeForm }) {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    let errors = {};
    for (let item in formData) {
      if (!formData[item]) errors[item] = true;
    }

    if (!validateEmail(formData.email)) errors.email = true;

    setFormError(errors);

    if (Object.keys(formError).length) return;
    setLoading(true)
    console.log("Iniciando...")
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(()=>{
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setFormError({
          email: true,
          password: true,
        });
        setLoading(false)
      });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <TextInput
            style={[styles.input, formError.email && styles.errorInput]}
            placeholder="Correo electronico"
            placeholderTextColor="#969696"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.nativeEvent.text })
            }
          />

          <TextInput
            style={[styles.input, formError.password && styles.errorInput]}
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            secureTextEntry={true}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.nativeEvent.text })
            }
          />

          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <View style={styles.login}>
            <TouchableOpacity onPress={handleChangeForm}>
              <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    height: 50,
    color: "#fff",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#1e3040",
  },
  login: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "#940c0c",
    borderWidth: 2,
  },
});
