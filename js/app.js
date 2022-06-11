
//variable
const form=document.querySelector('#request-quote')
const html= new HTMLUI()



//eventlisteners


eventListeners()
function eventListeners(){
  document.addEventListener('DOMContentLoaded', function (){
  
    // displays the options tags
    
    html.displayYears()
})

//submit form when we click on a submit button
  
  form.addEventListener('submit',function(e){
    e.preventDefault()
    const make=document.getElementById('make').value
    const year=document.getElementById('year').value
    const level=document.querySelector('input[name="level"]:checked').value
    
    //check if the value of fies are correctd
    if(make === "" || year === "" || level === ""){
      html.displayErrors("لطفا اطلاعات به درستی وارد شود")
    }else{

      let showResult=document.querySelector('#result div')
      if (showResult !== null) {
        showResult.remove()
        
      }
      const insurance=new Insurance(make, year, level)
      const price= insurance.calculatePrice(insurance)
      html.showResult(price, insurance)
    }
    


  
  })

}








//object

//everything here is related to the insurance

function Insurance(make, year, level){
  this.make=make
  this.year=year
  this.level=level

}
Insurance.prototype.calculatePrice=function(info){

  //get the model of cars
  let price;
  let base=2000000
  const make=info.make

 switch (make) {
   case '1':
     price= base*1.15
     
     break;
     case '2':
     price= base*1.30
     
     break;
     case '3':
     price= base*1.80
     
     break;

 }



 //get the year
 const year=info.year
 
 const differece= this.differeceYear(year)
 
 
 //3% cheaper for each year
   price =price -(((differece*3)/100)*price)
//get the price based on levels

  const level=info.level
  price=this.calculateLeve(level,price)
  return price


}

Insurance.prototype.differeceYear= function(year){


 let
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

    //get max years
    let now = new Date().toLocaleDateString('fa-IR');
    let nowYear= now.slice(0,4)
    max=fixNumbers(nowYear)
    year= max-year
    return year
  
}

Insurance.prototype.calculateLeve=function(level, price){

  if(level == 'basic'){
    price=price*1.30
  }else{
    price=price*1.50
  }
  return price
}



//eveything is related to the html

function HTMLUI(){}

//display years

HTMLUI.prototype.displayYears=function(){

    let
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

    //get max years
    let now = new Date().toLocaleDateString('fa-IR');
    let nowYear= now.slice(0,4)
    max=fixNumbers(nowYear)
    
    //get min years
    let min= max -20

    //access to the select year
    selectYear=document.querySelector('#year')

    //create for loop for making options

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');

        option.value=i
        option.innerText=i
        //append option to the selectyear
        selectYear.appendChild(option)
        
    }

  
}

//check the vlue of fields in form

HTMLUI.prototype.displayErrors=function(err){

  const div= document.createElement('div')
  div.classList='error'
  div.innerText=err

  form.insertBefore(div, document.querySelector('.form-group'))
  setTimeout(() => {
    document.querySelector('.error').remove()
    
  }, 3000);

}

//showing the results

HTMLUI.prototype.showResult=function(price, info){

  //access to the resutl in html
  const result=document.querySelector('#result')

  //making a div for showing results
  const div= document.createElement('div')

  
  // convert the value of cars to their name in persian

  let make=info.make
  switch (make) {
    case '1':
      make='پراید'
      
      break;
      case '2':
        make='اوپتیما'
        
        break;
      case '3':
        make='پورشه'
      
      break;
     
  }
  
  // convert the value of level to their name in persian

    let level=info.level

    if(level == 'basic'){
      level="ساده"
    }else{
      level="کامل"
    }
  
  
    
  


  //writting the price
  div.innerHTML=`
  <p class="header">خلاصه فاکتور</p>
  <p>مدل خودرو:${make}</p>
  <p>سال ساخت خودرو:${info.year}</p>
  <p>نوع بیمه:${level}</p>
  <p class="total">قیمت نهایی: ${price}</p>
  `
  
  //putting a spinner
const spinner= document.querySelector('#loading img')

spinner.style.display="block"

setTimeout(() => {

  spinner.style.display="none"

  //appendig div to the result
  result.appendChild(div)
  
  
}, 2000);
  
  
}

