import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';

export default class HelloWebComponent extends LightningElement {
    bears = null;
    subscription = null;
    
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        // Subscribe to BearListUpdate__c message
        this.subscription = subscribe(
            this.messageContext,
            BEAR_LIST_UPDATE_MESSAGE,
            (message) => {
                this.bears = message.bears;
            });
      }
      disconnectedCallback() {
        // Unsubscribe from BearListUpdate__c message
        unsubscribe(this.subscription);
        this.subscription = null;
      }

    greeting = 'Trailblazer';

    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }

    // currentDate = new Date().toDateString();
    currentDate = new Date();

    get capitalizedGreeting() {
	    return `Hello ${this.greeting.toUpperCase()}!`;
    }
}