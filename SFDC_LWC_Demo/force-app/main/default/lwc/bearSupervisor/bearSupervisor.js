import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Import Bear object fields　
import SUPERVISOR_FIELD from '@salesforce/schema/Bear__c.Supervisor__c';

//監督者(スーパーバイザー)データを保持。
const bearFields = [SUPERVISOR_FIELD];

export default class BearSupervisor extends LightningElement {
	@api recordId; // Bear Id
	@wire(getRecord, { recordId: '$recordId', fields: bearFields })
  bear;
	get supervisorId() {
		return getFieldValue(this.bear.data, SUPERVISOR_FIELD);
	}

	// ・熊の位置コンポーネントで行ったようにハードコードされた文字列を使用する代わりに、スキーマインポートを使用して Bear__c.Supervisor__c 項目をインポートします。このアプローチの大きな利点は、参照整合性が確保されることです。
	// ・@wire デコレーターと getRecord アダプターを使用して、熊レコードを取得します。
	// ・supervisorId 式を公開します。この式では、getFieldValue 関数を使用して Supervisor Field (監視者項目) の値を取得します。
}