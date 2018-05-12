import React from 'react';
import { compose, withProps } from 'recompose';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import {
  withGoogleMap,
  GoogleMap
} from "react-google-maps";

export class LocationSearchBox extends React.Component {
  placesChanged = () => {
    const res = this.searchBox.getPlaces()[0];
    res && this.props.onSelected({name: res.formatted_address, lat: res.geometry.location.lat(), lng: res.geometry.location.lng()});
  }
  render() {
    return (
    <StandaloneSearchBox
      ref={(searchbox) => { this.searchBox = searchbox; }}
      onPlacesChanged={this.placesChanged}
    >
      {this.props.children}
    </StandaloneSearchBox>
    )
  }
}

class Map extends React.Component {
  render() {
    const {children, ...other} = this.props;
    return (
      <GoogleMap
        defaultZoom={6}
        defaultCenter={{ lat: 51.919438, lng: 19.14513599999998 }}
        {...other}
      >
        {children}
      </GoogleMap>
    )
  }
}

export default compose(withProps({
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `440px` }} />,
  mapElement: <div style={{ height: `100%` }} />
}), withGoogleMap)(Map);