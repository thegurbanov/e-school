
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';

import { RoleManagementService } from '../../hr/role-management/role-management.service';

import { ChatUser, ChatMessage } from './chat.model';
import { ChatService } from './chat.service';
import { chatData, chatMessagesData } from './data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

/***
 * Chat Component
 */
export class ChatComponent implements OnInit {

  // bread crumb items
  example: any;
user:any;
  groupId: any;
  groupMessages:any;
  users: any = [];
  showChatBox: any = false;
  allgroups: any = [];
  breadCrumbItems!: Array<{}>;
  chatData!: ChatUser[];
  options = { autoHide: false, scrollbarMinSize: 100 };
  chatMessagesData!: ChatMessage[];
  groupname: string='';
  usermessage!: string;
  formData!: FormGroup;
  groupCreateForm!: FormGroup;
  chatSubmit?: boolean;
  submitted = false;
  profile: string = 'assets/images/users/avatar-1.jpg';
  @ViewChild('modalShow') modalShow !: TemplateRef<any>;
  constructor(public formBuilder: FormBuilder,
    private RoleService: RoleManagementService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private service: ChatService,
    private authService:AuthenticationService
  ) {
    this.groupCreateForm = this.formBuilder.group({
      info: new FormControl('', Validators.required)
    });
    this.getAllGroups();

this.user=this.authService.currentUser();
console.log(this.user);

  }

  ngOnInit(): void {
    //BreadCrumb
    this.breadCrumbItems = [
      { label: 'Apps' },
      { label: 'Chat', active: true }
    ];

    // Validation
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    // Chat Data Get Function
    this._fetchData();

  }
  get f(): { [key: string]: AbstractControl } {
    return this.groupCreateForm.controls;
  }

  // Chat Data Fetch
  private _fetchData() {
    this.chatData = chatData;
    this.chatMessagesData = chatMessagesData;

  }
  openGroupModal(permisson: any) {
    this.modalService.open(permisson, { windowClass: 'my-class' });
    this.onReset();
  }
  addMembersToGroupModal(id: any, permisson: any) {

    this.groupId = id;
    this.modalService.open(permisson, { windowClass: 'my-class' });
    this.getAllUsers();
    this.onReset();
  }
  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }
  async addChatMemberToGroup(user: any) {
    var data =
    {
      chatGroup:
      {
        id: this.groupId
      },
      username: user
    }
    console.log(data);
    await this.service.addChatMemberToGroup(data).toPromise().then(data => {
      console.log(data);
    })


  }
  async add() {
    this.submitted = true;
    var data = {
      info: this.groupCreateForm.controls['info'].value,
    };
    console.log(data);
    if (!this.groupCreateForm.invalid) {
      let response = await this.service.addChatToGroup(data).toPromise();
      if (response) {

        this.modalService.dismissAll();
        this.toastr.success("Yeni qrup yaradıldı");
        this.onReset();
        this.getAllGroups();
      }
    }
  }


  /***
  * OnClick User Chat show
  */
  async getMessagesByGroup(id:any,name:any) {
    this.groupId=id;

await this.service.getMessagesByGroupId(id).toPromise().then(data=>
  {
    this.groupMessages=data;
    console.log(this.groupMessages);
  })
  this.chatMessagesData=[];
  this.groupname = name;
   for (let index = 0; index < this.groupMessages.length; index++) {
    this.usermessage  = this.groupMessages[index].message;
const currentDate =new Date(this.groupMessages[index].dateTime);
this.chatMessagesData.push({
  align: this.groupMessages[index].owner ? 'left':'right',
  name: this.groupMessages[index].userFrom.username,
  message: this.usermessage,
  time:currentDate.getHours() + ':' + currentDate.getMinutes(),

});

   }
this.chatMessagesData.reverse();

  }

  onListScroll() { }
  async getAllGroups() {
    await this.service.getAllGroups().toPromise().then(data => {
      this.allgroups = data;
console.log(this.allgroups);
    })
  }
  async getAllUsers() {
    await this.service.getAllUsers().toPromise().then(data => {
      this.users = data.result;
      console.log(this.users)
    })
  }
  /**
   * Save the message in chat
   */
  async SendMessage() {
    const message = this.formData.get('message')!.value;
    let data=
    {
      message:message
    }
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
await this.service.sendMessage(this.groupId,data).toPromise().then(data=>{
  console.log(data);
})

      this.chatMessagesData.push({
        align: 'left',
        name: this.user.fullName,
        profile: 'assets/images/users/avatar-4.jpg',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes(),
      });
      this.onListScroll();

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null,
      });
    }
  }
  onReset(): void {
    this.submitted = false;
    this.groupCreateForm.reset();
  }
}
