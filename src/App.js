/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import {
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Moment from 'moment';
//import { AdMobBanner } from 'react-native-admob';
function getRequest(url) {
    return fetch(url, {
                    method: 'GET',
                    mode: 'CORS',
                    headers : new Headers({
                    	"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                    	"x-rapidapi-key": "z5oUcPQUOCmshjojU4yDDtsemDBqp1QVgbkjsnQLBWQhmsSRaV"
                    })
                }
            ).then( resp => resp.json() );
}
function getStats(token){
  	var addr = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=US';
    console.log(addr);
  	return getRequest(addr).then(resp => {
          return resp;
    })
}
const { width, height } = Dimensions.get('window');
const bottomMargin = 24;
const sHeight = width < height ? height : width;
const sWidth = width < height ? width : height;
const dMargin = 10;
const metrics = {
  searchBarHeight: 30,
  screenWidth: sWidth,
  screenHeight: sHeight,
  navBarHeight: sHeight * 0.09,
  tabBarHeight: sHeight * 0.073,
  defaultMargin: dMargin,
  defaultPadding: dMargin,
  listItemHeight: sHeight / 9,
  appleSize: sHeight / 15,
  contentHeight: sHeight - 110,
  listItemWidth: sWidth - (dMargin * 2),
  thumbRadius: 10,
  sliderMarkerSize: sWidth / 20,

  buttonWidth: sWidth * 0.8,
  buttonHeight: sHeight / 15,
  logoSize: sWidth / 3,
  footerHeight: sWidth / 7,
  androidMarginBottom: bottomMargin,

  tabBarIconSize: sWidth * 0.064,

  statusBarHeight: 20,

};
class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province : 'loading...'
        }
    }
    UNSAFE_componentWillMount() {
      getStats().then(resp => {
          this.setState({states : resp['data']['covid19Stats']});
      });
    }
    renderStates = () => {
        if (!this.state.states) {
            return;
        }
        const that = this;
        return this.state.states.map(function (state, index) {
            return (
                <TouchableHighlight
                    key={index}
                    onPress={() => {
                        var date = state.lastUpdate;
                        var formattedDate = Moment(date).format('MMMM Do YYYY, h:mm A');
                        that.setState({showStateSelected : true});
                        that.setState({
                          province : state.province,
                          country : state.country,
                          lastUpdate : formattedDate,
                          confirmed : state.confirmed,
                          deaths : state.deaths,
                          recovered : state.recovered
                        });
                    }}
                    style={{ backgroundColor : 'transparent', marginTop : 5 }}
                >
                    <View key={index} style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius : 10,
                        backgroundColor : '#FFFFFF'
                    }}>
                        <Text
                            style={{
                                width: metrics.screenWidth - 20,
                                color : '#092F50',
                                backgroundColor : 'transparent',
                                textAlign : 'center',
                                fontSize : 16
                            }}
                        >{state.province}</Text>
                    </View>
                </TouchableHighlight>
            )
        })
    }
    render() {
        var Tips =
            <View style={{
              position : 'absolute',
              top : 10,
              left : 10,
              bottom : 60,
              right : 10,
              backgroundColor : 'white',
            }}>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollViewTwo}>

                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'left',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >Emergency room</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'justify',
                          fontSize : 16,
                          marginTop : 10

                      }}
                  >If you are experiencing an emergency, stop reading and dial 911.</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'left',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >Know the symptoms</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'justify',
                          fontSize : 16,
                          marginTop : 10

                      }}
                  >The following symptoms may appear 2-14 days after exposure:  fever, cough, shortness of breath. If you develop emergency warning signs for COVID-19, get medical attention immediately. These include:  Difficulty breathing or shortness of breath; persistent pain or pressure in the chest; new confusion or inability to arouse; bluish lips or face (this is list not all inclusive. Please consult your medical provider for any other symptoms that are severe or concerning.)</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'left',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >Wash your hands frequently</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'justify',
                          fontSize : 16,
                          marginTop : 10

                      }}
                  >Wet your hands with clean, running water. Turn the tap off, and apply soap. Lather your hands by rubbing them together with soap. Lather the backs of your hands, between your fingers, and under your nails. Scrub your hands for at least 20 seconds.</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'left',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >Stay 6 feet away</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'justify',
                          fontSize : 16,
                          marginTop : 10

                      }}
                  >The CDC suggests you stay at least 6 feet away from anyone who appears sick to minimize the risk of getting the new coronavirus. The virus passes primarily through saliva and mucus, which can travel from someone's nose or mouth about 3-5 feet.</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'left',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >Stay 6 feet away</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'justify',
                          fontSize : 16,
                          marginTop : 10

                      }}
                  >The CDC suggests you stay at least 6 feet away from anyone who appears sick to minimize the risk of getting the new coronavirus.</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'left',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >If you feel sick</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'justify',
                          fontSize : 16,
                          marginTop : 10

                      }}
                  >If you have a cough, fever, or difficulty breathing, stay at home and call a health care provider unless it is an emergency. Do not go to work, school, or public places, and avoid public transportation. If your symptoms are severe or you feel like you need medical care, call before you go to a doctor's office, urgent care center or emergency room. If this is a medical emergency, dial 911 and tell the dispatcher your location, symptoms, and recent travel history.</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'left',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >Self quarantine</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-60,
                          paddingLeft : 30,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'justify',
                          fontSize : 16,
                          marginTop : 10

                      }}
                  >If you have been exposed to coronavirus or are at risk, consider self quarantine. Health experts reccoment self-quarantine lasts 14 days. Two weeks provides enough time to know whether or not you will become ill and be contagious to other people. Contact your local hospital to arrange a coronavirus test.</Text>


                </ScrollView>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({showTips : false});
                    }}
                    style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor : 'transparent',
                        position : 'absolute',
                        top : 15,
                        right : 15
                    }}>
                    <Image source={require('@assets/drawer_close.png')} style={{height : 40, width : 40}} />
                </TouchableHighlight>
            </View>


        var StateSelected =
            <View style={{
              position : 'absolute',
              top : 10,
              left : 10,
              bottom : 60,
              right : 10,
              backgroundColor : 'white',
            }}>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollViewTwo}>



                  <Text
                      style={{
                          width: metrics.screenWidth-20,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'center',
                          fontSize : 24,
                          marginTop : 25

                      }}
                  >{this.state.province}</Text>

                  <Text
                      style={{
                          width: metrics.screenWidth-20,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'center',
                          fontSize : 16,
                          marginTop : 5

                      }}
                  >last updated:  {this.state.lastUpdate}</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-20,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'center',
                          fontSize : 16,
                          marginTop : 5

                      }}
                  >confirmed cases:  {this.state.confirmed}</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-20,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'center',
                          fontSize : 16,
                          marginTop : 5

                      }}
                  >deaths:  {this.state.deaths}</Text>
                  <Text
                      style={{
                          width: metrics.screenWidth-20,
                          color : '#092F50',
                          backgroundColor : 'transparent',
                          textAlign : 'center',
                          fontSize : 16,
                          marginTop : 5

                      }}
                  >recovered:  {this.state.recovered}</Text>


                </ScrollView>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({showStateSelected : false});
                    }}
                    style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor : 'transparent',
                        position : 'absolute',
                        top : 15,
                        right : 15
                    }}>
                    <Image source={require('@assets/drawer_close.png')} style={{height : 40, width : 40}} />
                </TouchableHighlight>
            </View>
        var StateSelector =
            <View style={{
              position : 'absolute',
              top : 10,
              left : 10,
              bottom : 60,
              right : 10,
              backgroundColor : 'white',
            }}>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollViewTwo}>
                    {this.renderStates()}
                </ScrollView>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({showStateSelector : false});
                    }}
                    style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor : 'transparent',
                        position : 'absolute',
                        top : 15,
                        right : 15
                    }}>
                    <Image source={require('@assets/drawer_close.png')} style={{height : 40, width : 40}} />
                </TouchableHighlight>
            </View>
        return (
          <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <ImageBackground
                  accessibilityRole={'image'}
                  source={require('@assets/logo.png')}
                  style={styles.background}
                  imageStyle={styles.logo}>
                  <TouchableHighlight
                      onPress={() => {
                          Alert.alert('version 1.3');
                      }}
                  >
                    <Text style={styles.headerText}>CoronaVirus Stats & Info</Text>
                  </TouchableHighlight>
                </ImageBackground>
                <Text
                    style={{
                        width: metrics.screenWidth,
                        color : '#092F50',
                        backgroundColor : 'transparent',
                        textAlign : 'center',
                        fontSize : 12,
                        marginTop : 15
                    }}
                >The content on this app is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualitifed health provider with any questions you may have regarding a medical condition.
                </Text>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({showStateSelector : true});
                    }}
                    style={{
                        height: 60,
                        alignItems: 'center',
                        borderRadius : 10,
                        backgroundColor : '#FFFFFF',
                        marginTop : 15,
                        justifyContent : 'center'
                    }}
                    >
                        <Text
                            style={{
                                width: metrics.screenWidth,
                                color : '#092F50',
                                backgroundColor : 'transparent',
                                textAlign : 'center',
                                fontSize : 24

                            }}
                        >See stats by location</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({showTips : true});
                    }}
                    style={{
                        height: 60,
                        alignItems: 'center',
                        borderRadius : 10,
                        backgroundColor : '#FFFFFF',
                        marginTop : 15,
                        justifyContent : 'center'
                    }}
                    >
                        <Text
                            style={{
                                width: metrics.screenWidth,
                                color : '#092F50',
                                backgroundColor : 'transparent',
                                textAlign : 'center',
                                fontSize : 24

                            }}
                        >Tips & directives</Text>
                </TouchableHighlight>
              </ScrollView>
            </SafeAreaView>
            { this.state.showTips ? Tips : undefined }
            { this.state.showStateSelector ? StateSelector : undefined }
            { this.state.showStateSelected ? StateSelected : undefined }
          </>
        );
    }
}

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  scrollViewTwo: {
    backgroundColor: Colors.lighter,
    marginTop : 20,
    height : metrics.screenHeight - 20
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  headerText : {
    fontSize: 50,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
  },
});

export default MainApp;
