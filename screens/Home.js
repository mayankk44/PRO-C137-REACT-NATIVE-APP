import React,{Component} from "react";
import { Text,View,FlatList,StyleSheet,Alert,SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class Home extends Component {
    //Creating constructor
    constructor(props){
        super(props);
        this.state = {
            listData: [],
            url: "http://localhost:5000/"
        }
    }

    //Creates a function get stars
    getStars = () => {
        //Creates a constant to make the code short,optional
        const { url } = this.state;
        //Gets data of all stars
        axios.get(url).then(response => {
            return this.setState({
                //Why two data?
                //First data is the argument
                //Second is the variable 
                listData : response.data.data
            })
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    componentDidMount() {
        this.getStars();
    }

    renderItem = ({ item, index }) => (
        <ListItem
          key={index}
          title={`Stars : ${item.name}`}
          subtitle={`Distance from earth : ${item.Distance}`}
          titleStyle={styles.title}
          containerStyle={styles.listContainer}
          bottomDivider
          chevron
          //onPress={() =>
            //this.props.navigation.navigate("Details", { Star_name: item.name })
          //}
        />
    );

    keyExtractor = (item, index) => index.toString();

    render(){
        if (listData.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                <Text>Loading</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>Stars list</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edc988"
    },
    upperContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#132743"
    },
    lowerContainer: {
      flex: 0.9
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyContainerText: {
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#d7385e"
    },
    listContainer: {
      backgroundColor: "#eeecda"
    }
});