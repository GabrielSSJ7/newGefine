import React from "react";
import { View, Text, ScrollView } from "react-native";

import { styles } from '../../css/styles';

export default props =>
  props.isDialogVisibleTCC ? (
    <ScrollView style={styles.masker} keyboardDismissMode={"on-drag"}>
      <View style={[styles.container, props.style]}>
        <Text style={styles.title}>Gefine</Text>

        <View style={{ padding: 20 }}>
          <Text>Integrantes do grupos:</Text>
          <Text>Maria Carol</Text>
          <Text>Maria Sthefane</Text>
          <Text>Laysla Dafne</Text>
          <Text>Amanda Miranda </Text>
          <Text>Taynara Cardoso</Text>
          <Text>Fernanda Araújo</Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderTopColor: "#aaa",
            borderTopWidth: 1,
            padding: 5
          }}
        >
          <Text
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#aaa",
              alignSelf: "flex-end",
              padding: 10,
              marginRight: 10
            }}
            onPress={() => props.ChangeDialogTCCVisible()}
          >
            OK
          </Text>
        </View>
      </View>
    </ScrollView>
  ) : null;
