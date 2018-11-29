import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { styles } from '../../css/styles';

export default props => (
    props.isVisible ? (
        <ScrollView style={styles.masker} keyboardDismissMode={"on-drag"}>
          <View style={[styles.container, props.style]}>
            <Text style={styles.title}>Gefine</Text>
    
            
            <Text style={{ textAlign: "center", padding: 10 }}>{props.erro}</Text>

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
                onPress={() => props.hideDialogMessage(false)}
              >
                OK
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : null
);