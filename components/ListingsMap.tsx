import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import MapView from "react-native-map-clustering"

interface ListingsMapProps {
  listings: any,
}

const INITIAL_REGION = {
  latitude: 52.52,
  longitude: 13.4,
  latitudeDelta: 9,
  longitudeDelta: 9,
}

const ListingsMap = memo(({ listings }: ListingsMapProps) => {
  const router = useRouter();

  const onMarkerSelected = (item: any) => {
    router.push(`/listing/${item.properties.id}`)
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker 
      onPress={onPress}
      key={`cluster-${id}`} 
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}>
        <View style={styles.marker}>
          <Text style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'mon-sb'
          }}>
            {points}
          </Text>
        </View>
      </Marker>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor='#fff'
        clusterTextColor='#000'
        clusterFontFamily='mon-sb'
        renderCluster={renderCluster}
      >
        {listings.features.map((item: any) => (
          <Marker
            onPress={() => onMarkerSelected(item)}
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                £ {item.properties.price}
              </Text>
            </View>
          </Marker>
        )
        )}
      </MapView>

    </View>
  )
})

export default ListingsMap

const styles = StyleSheet.create({
  marker: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
  locateBtn: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
})