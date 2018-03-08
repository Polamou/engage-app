import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';

import { config } from '../../app/config';
import { IssueProvider } from '../../providers/issue/issue';
import { Issue } from '../../models/issue';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public issueProvider: IssueProvider
  ) {
    let tileLayerUrl = `https://api.mapbox.com/styles/v1/timdlp/cjeic2jmt79od2sn7our4odb0/tiles/256/{z}/{x}/{y}?access_token=${config.mapboxToken}`;
    const tileLayerOptions = { maxZoom: 18 };
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuesPage');
    this.issueProvider.getIssuesList().subscribe(issues => {
      console.log('Issues loaded');
      this.issues = issues;
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
      this.map.invalidateSize();
    });

  }

}
