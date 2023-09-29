import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { AfterViewInit } from '@angular/core';
import {order, SignUp} from "../../models/data-model";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-detail-profile',
  templateUrl: './user-detail-profile.component.html',
  styleUrls: ['./user-detail-profile.component.css']
})

export class UserDetailProfileComponent implements AfterViewInit{

  iconEdit = faEdit;
  showEditData: boolean = false;
  userName: string = "";
  userSurname: string = "";
  userNumberCellphone: string = "";
  userEmail: string = "";
  userPassword: string = "";
  userId: string = "";
  userPayment: string = "";
  //.....

  //....

  @ViewChild('addressInput') addressInput: ElementRef;
  @ViewChild('districtInput') districtInput: ElementRef;
  @ViewChild('provinceInput') provinceInput: ElementRef;
  @ViewChild('paymentMethodInput') paymentMethodInput: ElementRef;
  @ViewChild('linkedCardInput') linkedCardInput: ElementRef;

  constructor(private router: Router, private http: HttpClient, private product: ProductService,
              private userService: UserService) {
    this.addressInput = new ElementRef(null);
    this.districtInput = new ElementRef(null);
    this.provinceInput = new ElementRef(null);
    this.paymentMethodInput = new ElementRef(null);
    this.linkedCardInput = new ElementRef(null);
    //................

  }
  ngOnInit() {

    this.getOrderList()
    this.router.events.subscribe((val: any) => {
      if (localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName = userData.name;
        this.userSurname = userData.surname;
        this.userNumberCellphone = userData.numberCellphone;
        this.userEmail = userData.email;
        this.userPassword = userData.password;
        this.userId = userData.id;
        this.userPayment = userData.payment;
      }
    });

    const storedShippingData = localStorage.getItem('shippingData');
    if (storedShippingData) {
      const shippingData = JSON.parse(storedShippingData);
      this.savedAddress = shippingData.address;
      this.savedDistrict = shippingData.district;
      this.savedProvince = shippingData.province;
      this.savedPaymentMethod = shippingData.paymentMethod;
      this.savedLinkedCard = shippingData.linkedCard;
    }

  }

  ngAfterViewInit() {
    // Código para obtener y asignar los datos del localStorage
    const storedShippingData = localStorage.getItem('shippingData');
    if (storedShippingData) {
      const shippingData = JSON.parse(storedShippingData);
      if (this.addressInput && this.addressInput.nativeElement) {
        this.addressInput.nativeElement.value = shippingData.address;
      }
      if (this.districtInput && this.districtInput.nativeElement) {
        this.districtInput.nativeElement.value = shippingData.district;
      }
      if (this.provinceInput && this.provinceInput.nativeElement) {
        this.provinceInput.nativeElement.value = shippingData.province;
      }
      if (this.paymentMethodInput && this.paymentMethodInput.nativeElement) {
        this.paymentMethodInput.nativeElement.value = shippingData.paymentMethod;
      }
      if (this.linkedCardInput && this.linkedCardInput.nativeElement) {
        this.linkedCardInput.nativeElement.value = shippingData.linkedCard;
      }
    }
  }
  hidePassword(password: string): string {
    return password.replace(/./g, '*');
  }

  toggleEditData() {
    this.showEditData = !this.showEditData;
  }


  savedAddress: string = "";
  savedDistrict: string = "";
  savedProvince: string = "";
  savedPaymentMethod: string = "";
  savedLinkedCard: string = "";
  idShipping: string= "";
  saveShippingData() {
    const shippingData = {
      address: this.savedAddress,
      district: this.savedDistrict,
      province: this.savedProvince,
      paymentMethod: this.savedPaymentMethod,
      linkedCard: this.savedLinkedCard,
      id: this.idShipping
    };

    localStorage.setItem('shippingData', JSON.stringify(shippingData));

    this.http.put(`http://a06c-38-25-16-199.ngrok-free.app/shipping/${this.idShipping}`, shippingData)
      .subscribe(
        () => {
          console.log('Datos de envío guardados correctamente');
        },
        error => {
          console.error('Error al guardar los datos de envío', error);
        }
      );
    this.disableInputs = true;
    this.editMode = false;
  }

  disableInputs: boolean = true;
  editMode: boolean = false;
  disableInputsUser: boolean = true;
  editUserFields: boolean = false;

  edit(){
    this.editMode = true;
    this.disableInputs = false;
  }

  editUserData(){
    this.editUserFields = true;
    this.disableInputsUser = false;
  }

  validatePhoneNumber() {
    if (this.userNumberCellphone.length > 9) {
      this.userNumberCellphone = this.userNumberCellphone.slice(0, 9);
    }
  }

  deleteUserData(){
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar tu cuenta?");

    if (confirmDelete) {
      this.http.delete(`http://a06c-38-25-16-199.ngrok-free.app/users/${this.userId}`)
        .subscribe(
          () => {
            this.router.navigate(['/']);
            this.logout();
            console.log('Datos del usuario eliminados correctamente');
          },
          error => {
            console.error('Error al eliminar los datos del usuario', error);
          }
        );
    } else {
      console.log("Cancelado por el usuario");
    }

  }

  saveUserData() {
    const userData = {
      name: this.userName,
      surname: this.userSurname,
      email: this.userEmail,
      password: this.userPassword,
      pay: this.userPayment,
      id: this.userId
    };

    localStorage.setItem('user', JSON.stringify(userData));

    this.http.put(`http://a06c-38-25-16-199.ngrok-free.app/users/${this.userId}`, userData)
      .subscribe(
        () => {
          console.log('Datos del usuario actualizados correctamente');
        },
        error => {
          console.error('Error al actualizar los datos del usuario', error);
        }
      );

    this.disableInputsUser = true;
    this.editUserFields = false;
  }

  cancelOrder(orderId: number | undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }

  orderData: order[] | undefined;
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }


  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
