import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'Cajero';

  /*
  * 10 de 500 
  * 15 de 200
  * 20 de 100
  * 50 de 50
  */

  pesos = [10,15,20,50]
  pesos2= []
  submitted = false
  
  myForm = new FormGroup({
    cantidad: new FormControl(''),
  })

  submit(){
    
  if (this.myForm.value.cantidad % 1 != 0) {
      this.showFail("Sin punto decimal")

      return
      
  } else {

    if(this.myForm.value.cantidad == 0 || this.myForm.value.cantidad < 0){
      this.showFail("No se entregará dinero")
    }
    var cantidad = this.checaCantidad(this.myForm.value.cantidad)
    this.myForm.reset()
      
  }
    
  }

  checaCantidad(cantidad: number){

    var r = 0 
    var quinientos = 0
    var docientos = 0
    var cien = 0 
    var cincuenta = 0

        if(this.pesos[0]>0){
        console.log("quinientos")
        quinientos = Math.trunc(cantidad / 500) //1
        r = cantidad % 500
        }
        if(r == 0 && this.pesos[0]==0) {
        r = cantidad
        docientos =Math.trunc( r / 200 )
        r = r%200
        
        cien = Math.trunc( r /100 )
        r =r%100
        
        cincuenta = Math.trunc( r / 50 )
        r = r%50
        }else if (r > 0 && this.pesos[0]==0){
        docientos =Math.trunc( r / 200 )
        r = r%200
        
        cien = Math.trunc( r /100 )
        r =r%100
        
        cincuenta = Math.trunc( r / 50 )
        r = r%50
        }else if( r > 0 && this.pesos[0]>0 && quinientos==0){
        docientos =Math.trunc( r / 200 )
        r = r%200
        
        cien = Math.trunc( r /100 )
        r =r%100
        
        cincuenta = Math.trunc( r / 50 )
        r = r%50
        }else if(r > 0 && this.pesos[0]>0 && quinientos>0){
          docientos =Math.trunc( r / 200 )
        r = r%200
        
        cien = Math.trunc( r /100 )
        r =r%100
        
        cincuenta = Math.trunc( r / 50 )
        r = r%50
        }

        
        


    if(quinientos <= this.pesos[0] && this.pesos[0]>0){
      this.pesos[0]-=quinientos
    }

    if(docientos <= this.pesos[1]){
      this.pesos[1]-=docientos
    }

    if(cien <= this.pesos[2]){
      this.pesos[2] -= cien
    }

    if (cincuenta <= this.pesos[3]){
      this.pesos[3] -= cincuenta
    }
    
    
    if(r < 50 && r>0) {
      this.showFail("Sólo tenemos denominaciones de 500, 200, 100 y 50 \nfaltarian: \n" +r)
    }

    console.log(cantidad)

    console.log("pesos en cajero")
    console.log(this.pesos)

    console.log("retiro")
    var dinero = [quinientos, docientos, cien, cincuenta]
    this.showSucces(
      "Billetes de 500: "+ dinero[0]+"\n"+ "Billetes de 200: "+ dinero[1]+"\n"+ "Billetes de 100: "+dinero[2]+"\n"+"Billetes de 50: "+dinero[3]

    )
    


  }

  checarCantidad2(cantidad:number){


  }

  showFail(message: any){
    Swal.fire({
      icon: 'error',
      title: message
      
    });
  }




  showSucces(message: any){
    Swal.fire({
      icon: 'success',
      title: message,
    });
  }

    




}
