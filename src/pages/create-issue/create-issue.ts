import { Component, NgModule, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { latLng, MapOptions, tileLayer, Map, marker, Marker, Icon } from 'leaflet';
import {IonTagsInputModule} from "ionic-tags-input";
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { NavController, NavParams, ViewController } from 'ionic-angular';

import { config } from '../../app/config';
import { IssueType } from '../../models/issue-type';
import  { NewIssue } from '../../models/new-issue';
import { IssuetypeProvider } from '../../providers/issuetype/issuetype';
import { IssueProvider } from '../../providers/issue/issue';
import { QimgProvider } from '../../providers/qimg/qimg';
/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})
export class CreateIssuePage {
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: Marker[];
  userLoc: Marker;
  issueTypes: IssueType[];
  tags: string[];
  pictureData: string;
  newIssue: NewIssue;

  @ViewChild(NgForm)
  form: NgForm;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: HttpClient,
    public issueTypeProvider: IssuetypeProvider,
    public issueProvider: IssueProvider,
    public qimgProvider: QimgProvider
  ) {
    this.newIssue = new NewIssue();
    this.userLoc = new Marker(latLng(this.navParams.data.userLoc._latlng));
    this.mapMarkers = [];
    this.tags = [];
    this.mapMarkers.push(this.userLoc);
    let tileLayerUrl = `${config.mapboxApiUrl + config.mapboxToken}`;
    const tileLayerOptions = { maxZoom: 22 };
    this.mapOptions = {
      zoomControl:false,
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 18,
      center: latLng(this.userLoc.getLatLng())
    };
    this.issueTypeProvider.getIssueTypeList().subscribe(
      issueTypes => {
        this.issueTypes = [];
        this.issueTypes = issueTypes;
        console.log(this.issueTypes); 
      }
    ); 
  }

  ionViewDidLoad() {
    console.log(this.navParams.data.userLoc._latlng);
    const url = `${config.apiUrl}/issueTypes`;
    console.log('ionViewDidLoad CreateIssuePage');
    this.http.get(url).subscribe(issueTypes=>{
      console.log(`Issues types loaded`,issueTypes);
    })
  }
  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });
  }

  onSubmit(event){
    event.preventDefault();
    console.log("Submitted");

    this.issueProvider.addIssue(this.newIssue).subscribe(issueResponse =>{
      console.log('issue sent to API');
    });
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
  
    this.camera.getPicture(options).then(pictureData => {
      this.pictureData = pictureData;
      this.qimgProvider.uploadImage(pictureData).subscribe(pictureResponse => {
        this.newIssue.imageUrl = pictureResponse.url;
      },err =>{
        console.warn(`Error uploading image : ${err}`);
      });
    }).catch(err => {
      console.warn(`Could not take picture because: ${err.message}`);
    });
  }

}
