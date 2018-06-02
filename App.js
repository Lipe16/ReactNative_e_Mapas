import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import MapView from 'react-native-maps';
import cafe from './imagens/cafe.png';
import joao from './imagens/joao.png';
import react from './imagens/react.png';

export default class App extends React.Component {

  state = {
    places: [
      {
        id: 1,
        title: 'Casa do café',
        description: 'Café quentinho...',
        latitude: -27.2106710,
        longitude: -49.6362700,
        imagem:cafe,
      },
      {
        id: 2,
        title: 'Loja do joão',
        description: 'Venha participar do melhor preço!',
        latitude: -27.2006710,
        longitude: -49.6362700,
        imagem:joao,
      },
      {
        id: 3,
        title: 'React-native',
        description: 'Facilitando a programação mobile',
        latitude: -27.2006710,
        longitude: -49.6262700,
        imagem:react,
      }
    ]
  };

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  };


  render() {

    const {latitude, longitude} = this.state.places[0];

    return (
      <View style={styles.container}>
          <MapView
            ref={map => this.mapView = map}
            initialRegion={{
                latitude:latitude,
                longitude:longitude,
                latitudeDelta: 0.0142,
                longitudeDelta: 0.0231,
            }}

            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            showsUserLocation={false}
            showsPointsOfInterest={false}
            showBuildings={false}
            onMapReady={this._mapReady}

            style={styles.mapView}
          >

          { this.state.places.map(place => (
            <MapView.Marker
              ref={mark => place.mark = mark}
              title={place.title}
              description={place.description}
              key={place.id}

              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            >
                  <Image style={styles.icon}
                    source={place.imagem}
                  />

            </MapView.Marker>
          ))}

          </MapView>


          <ScrollView
            style={styles.placesContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={e => {


              const place =  (e.nativeEvent.contentOffset.x > 0) ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width : 0;


              const { latitude, longitude, mark } = this.state.places[place];

              this.mapView.animateToCoordinate({latitude, longitude}, 1000);

              setTimeout(() => {
                  mark.showCallout();
              }, 1000);

             }} >



              {
                this.state.places.map(
                  place => (
                    <View key={place.id} style={styles.places} >
                      <Text>{place.title}</Text>
                      <Text>{place.description}</Text>
                      <Image style={styles.icon}
                        source={place.imagem}
                      />
                    </View>
                  )
                )
              }

          </ScrollView>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mapView: {
    position: 'absolute',
    top: 0,
    bottom:0,
    left: 0,
    right: 0,
  },
  container:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  placesContainer:{
    width:'100%',
    maxHeight: 120,
  },
  places:{
    width:width -20,

    maxHeight: 120,
    backgroundColor:'#FFF',
    marginHorizontal: 10,
    borderWidth:3,
  },
  icon:{
    width: 50,
    height: 50,
    borderWidth:2,
    borderRadius:25/2,
    overflow:'hidden',

  }
});
