import React, { forwardRef } from 'react';
import { Platform, type ViewStyle } from 'react-native';
import { GoogleMaps, AppleMaps } from 'expo-maps';

export type MapCameraPosition = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type MapMarkerData = {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  snippet?: string;
  color?: string;
  draggable?: boolean;
  zIndex?: number;
};

export type MapAnnotationData = {
  id: string;
  latitude: number;
  longitude: number;
  backgroundColor?: string;
  text?: string;
  textColor?: string;
  title?: string;
};

export type MapCircleData = {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  color?: string;
  lineColor?: string;
  lineWidth?: number;
};

export type AppMapViewHandle = {
  setCameraPosition: (config: MapCameraPosition & { duration?: number }) => void;
};

export interface AppMapViewProps {
  style?: ViewStyle;
  cameraPosition?: MapCameraPosition;
  markers?: MapMarkerData[];
  annotations?: MapAnnotationData[];
  circles?: MapCircleData[];
  isMyLocationEnabled?: boolean;
  onMapClick?: (coords: { latitude: number; longitude: number }) => void;
  onMarkerClick?: (marker: MapMarkerData) => void;
  onCameraMove?: (event: { latitude: number; longitude: number; zoom: number }) => void;
}

const iosRender = (
  props: AppMapViewProps,
  ref: React.Ref<unknown> | null,
) => {
  const {
    style, cameraPosition, markers = [], annotations = [],
    isMyLocationEnabled, onMapClick, onMarkerClick, onCameraMove,
  } = props;

  const cameraPos = cameraPosition
    ? {
        coordinates: { latitude: cameraPosition.latitude, longitude: cameraPosition.longitude },
        zoom: cameraPosition.zoom,
      }
    : undefined;

  return (
    <AppleMaps.View
      ref={ref as any}
      style={style as any}
      cameraPosition={cameraPos}
      markers={markers.map((m) => ({
        id: m.id,
        coordinates: { latitude: m.latitude, longitude: m.longitude },
        title: m.title,
        tintColor: m.color,
        draggable: m.draggable,
      }))}
      annotations={annotations.map((a) => ({
        id: a.id,
        coordinates: { latitude: a.latitude, longitude: a.longitude },
        backgroundColor: a.backgroundColor,
        text: a.text,
        textColor: a.textColor,
        title: a.title,
      }))}
      properties={{ isMyLocationEnabled }}
      onMapClick={(e) => onMapClick?.({ latitude: e.coordinates.latitude ?? 0, longitude: e.coordinates.longitude ?? 0 })}
      onMarkerClick={(e) => {
        const m = markers.find((x) => x.id === e.id);
        if (m) onMarkerClick?.(m);
      }}
      onCameraMove={(e) => onCameraMove?.({ latitude: e.coordinates.latitude ?? 0, longitude: e.coordinates.longitude ?? 0, zoom: e.zoom ?? 10 })}
    />
  );
};

const androidRender = (
  props: AppMapViewProps,
  ref: React.Ref<unknown> | null,
) => {
  const {
    style, cameraPosition, markers = [], circles = [],
    isMyLocationEnabled, onMapClick, onMarkerClick, onCameraMove,
  } = props;

  const cameraPos = cameraPosition
    ? {
        coordinates: { latitude: cameraPosition.latitude, longitude: cameraPosition.longitude },
        zoom: cameraPosition.zoom,
      }
    : undefined;

  return (
    <GoogleMaps.View
      ref={ref as any}
      style={style as any}
      cameraPosition={cameraPos}
      markers={markers.map((m) => ({
        id: m.id,
        coordinates: { latitude: m.latitude, longitude: m.longitude },
        title: m.title,
        draggable: m.draggable,
        zIndex: m.zIndex,
      }))}
      circles={circles.map((c) => ({
        id: c.id,
        center: { latitude: c.latitude, longitude: c.longitude },
        radius: c.radius,
        color: c.color,
        lineColor: c.lineColor,
        lineWidth: c.lineWidth,
      }))}
      properties={{ isMyLocationEnabled }}
      onMapClick={(e) => onMapClick?.({ latitude: e.coordinates.latitude ?? 0, longitude: e.coordinates.longitude ?? 0 })}
      onMarkerClick={(e) => {
        const m = markers.find((x) => x.id === e.id);
        if (m) onMarkerClick?.(m);
      }}
      onCameraMove={(e) => onCameraMove?.({ latitude: e.coordinates.latitude ?? 0, longitude: e.coordinates.longitude ?? 0, zoom: e.zoom ?? 10 })}
    />
  );
};

export const AppMapView: React.FC<AppMapViewProps & { ref?: React.Ref<unknown> }>
  = Platform.OS === 'ios'
    ? forwardRef(iosRender)
    : forwardRef(androidRender);
