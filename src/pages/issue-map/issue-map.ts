import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { latLng, MapOptions, Map, marker, Marker, tileLayer } from 'leaflet';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the IssueMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-map',
  templateUrl: 'issue-map.html',
})
export class IssueMapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueMapPage');
  }

}
