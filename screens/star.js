import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends Component(){
    constructor(props) {
        super(props);
        this.state = {
          details: {},
          imagePath: "",
          url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
            "Star_name"
          )}`
        };
    }

    getDetails = () => {
        const { url } = this.state;
        axios
          .get(url)
          .then(response => {
            this.setDetails(response.data.data);
          })
          .catch(error => {
            Alert.alert(error.message);
          });
    };
    
    componentDidMount() {
        this.getDetails();
    }

    render(){
        const { details, imagePath } = this.state;
        if (details.specifications) {
            return (
              <View style={styles.container}>
                <Card
                  title={details.Star_name}
                >
                  <View>
                    <Text
                      style={styles.cardItem}
                    >{`Distance from Earth : ${details.Distance}`}</Text>
                    <Text
                      style={styles.cardItem}
                    >{`Mass : ${details.Mass}`}</Text>
                    <Text
                      style={styles.cardItem}
                    >{`Radius : ${details.Radius}`}</Text>
                    <Text
                      style={styles.cardItem}
                    >{`Gravity : ${details.gravity}`}</Text>
                  </View>
                  <View style={[styles.cardItem, { flexDirection: "column" }]}>
                    <Text>{details.specifications ? `Specifications : ` : ""}</Text>
                      {details.specifications.map((item, index) => (
                    <Text key={index.toString()} style={{ marginLeft: 50 }}>
                      {item}
                    </Text>
                  ))}
                  </View>
                </Card>
              </View>
            );
          }
          return null;
    }
}