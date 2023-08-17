import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges{
  @Input()
  order!:Order;

  @Input()
  readonly:boolean = false;

  @ViewChild('map',{static:true})
  mapRef!:ElementRef;
  private readonly DEFAULT_LATLING : LatLngTuple=[13.75,21.62];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKET_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  currentMarker!:Marker;
  map!:Map;

  constructor(private locationService:LocationService){}
  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap();

    if(this.readonly && this.addressLatLng){
      this.showLocation();
    }
  }

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement,{
      attributionControl:false
    }).setView(this.DEFAULT_LATLING,1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click',(e:LeafletMouseEvent)=>{
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next:(latlng)=>{
        this.map.setView(latlng,this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    });
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng;

    if(this.currentMarker){
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng,{
      draggable:true,
      icon:this.MARKET_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend',()=>{
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng:LatLng){

    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLang = latlng;
  }

  get addressLatLng(){
    return this.order.addressLatLang!;
  }

  showLocation(){
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);
    m.dragging.disable();
    m.touchZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }
}
