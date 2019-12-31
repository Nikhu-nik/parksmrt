import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor() {

  }

  content: string;

  messages = [{
    sender: 'Jhon',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Peter',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Hudson',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Adam',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Bill',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Simon',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Mosh',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Pattinson',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Robert',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Jhonson',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Frankly',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Bruce',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  },
  {
    sender: 'Hogward',
    discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, vitae consequuntur? Repellat ad culpa aliquid odit est modi aperiam quidem autem voluptates in quisquam explicabo esse officiis, excepturi beatae sapiente.',
  }
  ];

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.content = 'All';
  }



}
