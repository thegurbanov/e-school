import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SaledApartmentsService} from "../services/saled-apartments.service";
import {ContractService} from "../../accounting/services/contract.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-saled-apartments',
  templateUrl: './saled-apartments.component.html',
  styleUrls: ['./saled-apartments.component.scss']
})
export class SaledApartmentsComponent implements OnInit {
  buildingForm!: FormGroup
  data: any = [];
  blocks: any;
  binaname: any;
  binaId: any;
  selectedClass: any = [];
  blockscount: number = 0;
  navs: any = [];
  selectedNav: any;
  selectedApartmentContractId!: string

  constructor(private formBuilder: FormBuilder,
              private service: SaledApartmentsService,
              private toastr: ToastrService,
              private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getBlocks();
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

  addedBlocksToNavbar() {
    for (let i = 0; i < this.blockscount; i++) {
      this.navs.push(
        new Object(
          {
            title: this.blocks[i].info,
            status: i == 0 ? true : false,
            id: i + 1,
            binaId: this.blocks[i].id
          }))
    }

    this.navs.push(
      {
        title: 'Reserv',
        status: false,
        id: this.blockscount + 1,
      },
      {
        title: 'Kommersiya obyektleri',
        status: false,
        id: this.blockscount + 2,
      },
      {
        title: 'Qaraj',
        status: false,
        id: this.blockscount + 3,
      },
    )
  }

  createForm() {
    this.buildingForm = this.formBuilder.group(
      {
        company: new FormControl("", [Validators.required]),
        info: new FormControl("", [Validators.required]),
        bloknum: new FormControl('', [Validators.required]),
        blocks: new FormArray([]),
        mertebeSay: new FormControl("", [Validators.required]),
        yasayishMertebeStart: new FormControl("", [Validators.required]),
        adress: new FormControl("", [Validators.required]),
        poct: new FormControl("", [Validators.required]),
      });
  }

  selectBina(id: any) {
    if (!id) return
    this.service.getSoldApartmentsByBinaId(id).subscribe(res => {
      this.data = res.result.blockList;
      this.binaname = res.result.bina.info
      this.binaId = res.result.bina.id
      this.selectedApartmentContractId = ''
    })
  }

  formBlocks(): FormArray {
    return this.buildingForm.get('blocks') as FormArray
  }

  structureBlocks(blockIndex: number): FormArray {
    return this.formBlocks().at(blockIndex).get("structures") as FormArray
  }

  newBlocks(i: any): FormGroup {
    return this.formBuilder.group({
      nomre: i + 1,
      evSay: '',
      structures: this.formBuilder.array([])
    })
  }

  newStructures(i: number): FormGroup {
    return this.formBuilder.group({
      nomre: i + 1,
      otaqSay: '',
      sahe: ''
    })
  }

  onChangeValue(event: any) {
    const numberOfTickets = event.target.value || 0;
    if (this.formBlocks().length < numberOfTickets) {
      for (let i = this.formBlocks().length; i < numberOfTickets; i++) {
        this.formBlocks().push(this.newBlocks(i));

      }
    } else {
      for (let i = this.formBlocks().length; i >= numberOfTickets; i--) {
        this.formBlocks().removeAt(i);
      }
    }
  }

  onInputValue(event: any, i: any) {
    const numberOfTickets = event.target.value || 0;
    const dat: any = this.structureBlocks(i);
    if (dat.length < numberOfTickets) {
      for (let i = dat.length; i < numberOfTickets; i++) {
        dat.push(this.newStructures(i));
      }
    } else {
      for (let i = dat.length; i >= numberOfTickets; i--) {
        dat.removeAt(i);
      }
    }
  }

  async getBlocks() {
    await this.service.getBlocks('').toPromise().then(data => {
      this.blocks = data.result;
      this.blockscount = this.blocks.length;
      this.addedBlocksToNavbar();
      this.selectedNav = this.navs[0]
      this.selectBina(this.selectedNav.binaId)
    })
  }

  openContractInfoModal(content: any, contractId: string) {
    this.selectedApartmentContractId = contractId
    this.modalService.open(content, {scrollable: true, size: "xl"});
  }

}

