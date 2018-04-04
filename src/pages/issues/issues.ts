import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { latLng, MapOptions, tileLayer, Map, marker, Marker, Icon } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

import { config } from '../../app/config';
import { IssueProvider } from '../../providers/issue/issue';
import { Issue } from '../../models/issue';
import { SingleIssuePage } from '../single-issue/single-issue';
import { CreateIssuePage } from '../create-issue/create-issue';

/**
 * Generated class for the IssuesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html',
})
export class IssuesPage {
  public issues: Issue[];
  view: string = "map";
  mapOptions: MapOptions;
  map: Map;
  userLoc: Marker;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public issueProvider: IssueProvider,
    private geolocation: Geolocation
  ) {
    let tileLayerUrl = `${config.mapboxApiUrl + config.mapboxToken}`;
    const tileLayerOptions = { maxZoom: 18 };
    this.mapOptions = {
      zoomControl:false,
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 8,
      center: latLng(46.7, 6.7)
    };
  }

  ionViewDidLoad() {

    
    this.loadIssues();

    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      let userIcon = new Icon({
        iconUrl: 'assets/leaflet/images/current-location.png',
        iconSize: [32,32],
        iconAnchor: [16,16]
      });
      this.userLoc = new Marker([coords.latitude, coords.longitude],{icon:userIcon});
      this.userLoc.addTo(this.map);
      this.map.flyTo([coords.latitude, coords.longitude], 14);
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });

  }

  loadIssues(){
    this.issueProvider.getIssueList().subscribe(issues => {
      console.log('Issues loaded');
      this.issues = issues;
      this.issues.forEach(issue =>{
        console.log(issue);
        this.createMarker(issue).addTo(this.map);
      })
    });
  }
  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });


  }
  createMarker(issue: Issue){
    return marker([issue.location.coordinates[1],issue.location.coordinates[0]]).on('click',()=>{
      this.goToSingleIssue(issue.id);
    });
  }

  goToSingleIssue(id: String) {
    this.navCtrl.push(SingleIssuePage, { issueId: id });
  }

  openModalCreateIssue(){
      let modal = this.modalCtrl.create(CreateIssuePage,{userLoc:this.userLoc});
      modal.present();
      modal.onDidDismiss(() => this.loadIssues());
  }
  
  filterIssues(ev: any){
    let val = ev.target.value;
    

    if (val && val.trim() !== '') {
      let previousIssues = this.issues;
    this.issueProvider.searchIssues({searchParams: val}).subscribe(issues => {
      this.issues = [];
      this.issues = issues;
    });
}
    
  }

  searchIssues(){
    var query = new Object;
    query = {
      "state": {
        "$in": [ "new" ]
      }
    };
    
    this.issueProvider.searchIssues(query).subscribe(issues => {
      console.log('Issues requested');
      console.log(issues);
    });
  }

}
