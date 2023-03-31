import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from './utilities.service';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit {

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
  constructor(private service:UtilitiesService) {

    this.getBlocks();
   }

  ngOnInit(): void {
  }
  async getBlocks()
  {
   await this.service.getBlocks('').toPromise().then(data=>
    {
      this.blocks=data.result;
    })
    this.blockscount=this.blocks.length;
    this.addedBlocksToNavbar();
  }

}
