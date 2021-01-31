import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { validateEmail, validatePassword } from "../utils/validations";
import firebase from "../utils/firebase";

const initialState = { email: "", password: "", repeatPassword: "" };

const RegisterForm = ({ handleChangeForm }) => {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});

  const handleRegister = () => {
    let errors = {};
    for (let item in formData) {
      if (!formData[item]) errors[item] = true;
    }

    if (!validateEmail(formData.email)) errors.email = true;
    if (!validatePassword(formData)) {
      errors.repeatPassword = true;
      errors.password = true;
    }

    setFormError(errors);

    if (Object.keys(formError).length) return;

    firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .catch((err) => {
        console.log(err);
        setFormError({
          email: true,
          password: true,
          repeatPassword: true,
        });
      });
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Correo electronico"
        placeholderTextColor="#969696"
        nativeID="email"
        onChange={(e) =>
          setFormData({ ...formData, email: e.nativeEvent.text })
        }
      />
      <TextInput
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, password: e.nativeEvent.text })
        }
      />
      <TextInput
        style={[styles.input, formError.repeatPassword && styles.errorInput]}
        placeholder="Repita contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, repeatPassword: e.nativeEvent.text })
        }
      />

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.btnText}>Registrar</Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <TouchableOpacity onPress={handleChangeForm}>
          <Text style={styles.btnText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterForm;

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
