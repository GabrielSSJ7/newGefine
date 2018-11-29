import React from 'react';
import { View, StatusBar, Text, TouchableHighlight } from "react-native";
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default props => (
    <View
          style={{
            flex: 1,
            backgroundColor: "#50c4eb",
            justifyContent: "space-between",
            flexDirection: "row",
            elevation: 3
          }}
        >
          <StatusBar backgroundColor="#50c4eb" />
          <View style={{ justifyContent: "center", height: 50 }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                marginLeft: 15,
                fontSize: 20
              }}
            >
              {props.mesAtual}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              marginRight: 15,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableHighlight
              onPress={() => {
                props.ChangeDialogTCCVisible();
              }}
              underlayColor="#ddd"
              style={{ paddingHorizontal: 25 }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>?</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    Actions.login();
                  });
              }}
              underlayColor="#ddd"
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Sair</Text>
            </TouchableHighlight>
          </View>
        </View>
);