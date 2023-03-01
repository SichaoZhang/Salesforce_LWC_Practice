import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Set Bear object fields
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';
const bearFields = [
	NAME_FIELD,
	LOCATION_LATITUDE_FIELD,
	LOCATION_LONGITUDE_FIELD
];
export default class BearLocation extends LightningElement {
  @api recordId;
  name;
  mapMarkers = [];
  @wire(getRecord, { recordId: '$recordId', fields: bearFields })
  loadBear({ error, data }) {
    if (error) {
      // TODO: handle error
    } else if (data) {
      // Get Bear data
      this.name =  getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      // Transform bear data into map markers
      this.mapMarkers = [{
        location: { Latitude, Longitude },
        title: this.name,
        description: `Coords: ${Latitude}, ${Longitude}`
      }];
    }
  }
  get cardTitle() {
    return (this.name) ? `${this.name}'s location` : 'Bear location';
  }

	// ・Lightning データサービスを使用してレコードを取得できる getRecord アダプターをインポートします。Apex を記述する必要はありません。
	// ・getFieldValue ヘルパー関数をインポートして、項目値を取得します。
	// ・bearFields 定数の Bear__c オブジェクトからハードコードされた項目名のリストを作成します。このアプローチでは参照整合性がサポートされていません。コンパイル時にオブジェクトと項目の存在を確認することはできません。つまり、Bear__c またはその項目は、コードで使用されていても削除される可能性があります。次のコンポーネントでは、参照整合性をサポートする別のアプローチを使用します。
	// ・@api でデコレートされた recordId プロパティは、自動的に現在のレコード ID を受け取ります。
	// ・loadBear 関数で @wire デコレーターを使用し、データとエラーを取得して関数に渡します。@wire はパラメーターが指定された getRecord アダプター関数をコールするよう設定されています。これらのパラメーターは、取得するレコード ID と レコード項目のリストです。@wire デコレーターのおかげで、コンポーネントが読み込まれる、またはレコード ID が変更されると、loadBear が自動的にコールされます。
	// ・このコンポーンネントの最初のバージョンでは、エラーの処理は行いません。今はスキップしておきます。
	// ・エラーがなければ、熊の名前を保存し、その熊の座標を使用して地図マーカーを作成します。
}