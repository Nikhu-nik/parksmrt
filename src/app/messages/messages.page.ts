import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  content:string;

  constructor() { 
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.content="All";
  }

 messages= [{
  "sender": "abdul",
  "discription": "hi how are you",
  }]
  

}
