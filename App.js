
// require("dotenv")()

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar as StatusBarRN,
  Button,
} from "react-native";
import Auth from "./src/components/Auth";
import ListBirthday from "./src/components/ListBirthday";
import firebase from "./src/utils/firebase";

export default function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((resp) => {
      setUser(resp);
    });
  }, []);

  // mientras carga...
  if (user === undefined) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {user ? <ListBirthday user={user} /> : <Auth />}
    </SafeAreaView>
  );
}

const Logout = () => {
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <SafeAreaView>
      <Text>Estas Logeado</Text>
      <Button onPress={handleLogout} title="Cerrar sesion" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBarRN.currentHeight : 0,
    backgroundColor: "#15212b",
    height: "100%",
  },
});
