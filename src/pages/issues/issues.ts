import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { latLng, MapOptions, tileLayer, Map, marker, Marker, Icon } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

import { config } from '../../app/config';
import { IssueProvider } from '../../providers/issue/issue';
import { Issue } from '../../models/issue';
import { SingleIssuePage } from '../single-issue/single-issue';

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
      center: latLng(46.7, 7.5)
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuesPage');
    this.issueProvider.getIssueList().subscribe(issues => {
      console.log('Issues loaded');
      this.issues = issues;
      this.issues.forEach(issue =>{
        console.log(issue);
        this.createMarker(issue).addTo(this.map);
      })
    });
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      this.userLoc = new Marker([coords.latitude, coords.longitude]);
      this.userLoc.addTo(this.map);
      this.map.flyTo([coords.latitude, coords.longitude], 14);
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
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
    return marker([issue.location.coordinates[1],issue.location.coordinates[0]]).bindTooltip(issue.description).on('click',()=>{
      this.navCtrl.push(SingleIssuePage, {issueId:issue.id });
    });
  }

  goToSingleIssue(id: String) {
    this.navCtrl.push(SingleIssuePage, { issueId: id });
  }

}
