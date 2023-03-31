import {Component, OnInit} from '@angular/core';
import {BinaService} from "../services/bina.service";
import {BinaDto} from "../../../model/construction/bina.dto";
import {BinaViewDto} from "../../../model/construction/binaView.dto";
import {CommunalService} from "../services/communal.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-communal-view',
  templateUrl: './communal-view.component.html',
  styleUrls: ['./communal-view.component.scss']
})
export class CommunalViewComponent implements OnInit {

  buildingList: BinaDto[] = []
  navs: any[] = []
  selectedNav: any = {}
  selectedBuilding!: BinaViewDto
  year: number = new Date().getFullYear()
  selectedApartmentContractId!: string

  constructor(private buildingService: BinaService,
              private communalService: CommunalService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllBuildings()
  }

  getCommunalViewByBuildingIdAndYear(buildingId:string, year:number) {
    this.communalService.getCommunalByBuildingIdAndYear(buildingId, year).toPromise().then(success =>{
      if (success?.code === "200"){
        this.selectedBuilding = success?.result
      }
    })
  }

  getAllBuildings() {
    this.buildingService.getAllBina().toPromise().then(success => {
      if (success?.code === "200") {
        this.buildingList = success?.result
        this.createNavs()
        if (this.buildingList?.length > 0) {
          this.selectBuilding(this.navs[0].binaId)
        }
      }
    })
  }

  createNavs() {
    for (let i = 0; i < this.buildingList.length; i++) {
      this.navs.push(
        {
          title: this.buildingList[i].info,
          status: i == 0,
          id: i + 1,
          binaId: this.buildingList[i].id
        })
    }

    this.navs.push(
      {
        title: 'Reserv',
        status: false,
        id: this.buildingList.length + 1,
      },
      {
        title: 'Kommersiya obyektleri',
        status: false,
        id: this.buildingList.length + 2,
      },
      {
        title: 'Qaraj',
        status: false,
        id: this.buildingList.length + 3,
      },
    )

    this.selectedNav = this.navs[0]
  }

  changeTab(nav: any) {
    this.navs.filter((x: any) => {
      x.status = false;
      if (x.id == nav.id) {
        x.status = true;
        this.selectedNav = x;
      }
    });
  }

  selectBuilding(buildingId: string) {
    this.getCommunalViewByBuildingIdAndYear(buildingId, this.year)
  }

  setAmountColorClassByStatus(status: number | undefined) {
    if (status === -1){
      return 'text-danger'
    }

    if (status === 0) {
      return 'text-success'
    }

    if (status === 1) {
      return 'text-warning'
    }

    return ''
  }

  openContractInfoModal(content: any, contractId?: string) {
    this.selectedApartmentContractId = contractId || ''
    this.modalService.open(content, {scrollable: true, size: "xl"});
  }

}
