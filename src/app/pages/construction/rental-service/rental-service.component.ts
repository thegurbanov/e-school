import { Component, OnInit } from '@angular/core';
import { ApartmentsForSaleService } from '../services/apartments-for-sale.service';
import { RentalService } from './rental.service';

@Component({
  selector: 'app-rental-service',
  templateUrl: './rental-service.component.html',
  styleUrls: ['./rental-service.component.scss']
})
export class RentalServiceComponent implements OnInit {

  blocks:any=[];
  blockscount:number=0;
  navs: any = [



  ];
  selectedNav = this.navs[0];
  selectedClass: any = [];
  changeTab(nav: any) {
    this.navs.filter((x: any) => {
      x.status = false;
      if (x.id == nav.id) {
        x.status = true;
        this.selectedNav = x;
      }
    });
  }


  addedBlocksToNavbar()
  {
    for(let i=0;i<this.blockscount;i++)
    {
      this.navs.push(
        new Object(
        {
            title: this.blocks[i].info,
            status: i==0 ? true:false,
            id: i+1,

        }))
    }
    this.navs.push(
      {
        title: 'Reserv',
        status: false,
        id: this.blockscount+1,
      },
      {
        title: 'Kommersiya obyektleri',
        status: false,
        id: this.blockscount+2,
      },
      {
        title: 'Qaraj',
        status: false,
        id: this.blockscount+3,
      },
    )
  }
  constructor(private service:RentalService) {
    this.getBlocks();
   }

  ngOnInit(): void {


  }
  async getBlocks()
  {
   await this.service.getBlocks('').toPromise().then(data=>
    {
      this.blocks=data.result;
      console.log(this.blocks);
    })
    this.blockscount=this.blocks.length;
    this.addedBlocksToNavbar();
  }


}
