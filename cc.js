let dropdown=document.querySelectorAll("select");
let btn=document.querySelector("#btn");
let amount=document.querySelector("input");
let fromCurr=document.querySelector(".from select");  
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

//CREATION OF SELECT LIST AND FLAG UPDATION

for (let select of dropdown){
    for(currcode in countryList ){        //ye loop countryList obj ke sare pairs ko ek ek krke traverse krega
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from"&&currcode==="USD"){           //"selected" ko use kiya jata hai selected ko dikhane ke liye ki hum by deafult ise show krwana chahte hain
            newOption.selected="selected";
        }else if(select.name==="to"&&currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);   //adding option in option list of select

        select.addEventListener("click",(evt)=>{
           updateflag(evt.target);     //target hume dikhata hai ki hume mila kya hai ...i.e, hume element/option return krke de rha hai jo ki hume mil rha hai kisi bhi option ko click krne kr  
        })
    }
}
let updateflag=(element)=>{      //evt.target hume option la kar denge jisko bhi humne choose kiya hoga select se
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");  //simply tageting image
    img.src=newsrc;  
}

//EXCHANGING CURRENCY

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();   //form ke andr koi bhi button ho wo by default submit ki trh work krta hai or jb use click krte hain to page refresh ho jata hai to use refreshness ko rokne ke liye kiya iska use
    exchangeValue();
})


async function exchangeValue(){
 let amtVal=amount.value;            //input ke andr jo bhi likhte hain wo us input ki value bn jata hai 
 if(amtVal===""||amtVal<0){
    amtVal=1
    amount.value="1";               //string me isliye likha kyuki html me element ke andr jab "Value" atrribute denge to uski value string me hi likhi aaye
 }
 //console.log(fromCurr.value,toCurr.value);      //jb bhi select ke kisi bhi option ko hum select krte hain to wahi option ki value select ki value ho jati hai 

msg.innerText="Getting Exchange Rate....";
let url=`https://v6.exchangerate-api.com/v6/1489e870fe8b731a59efde97/latest/${fromCurr.value}`;

let response=await fetch(url);
// console.log(response);
let result=await response.json();
// console.log(result);
let exchangeRate=result.conversion_rates[toCurr.value];      //"result" ek object jo ki hume json se mila hai or uska ek key hai "conversion_rates" jiske andr sare conversion hai and ye bhi ek object hai jiske andr key:value me hi sari cuurency ke conversion likhe hain to uske likhe hume "tocurr.vale" ki madad se country code niklana pd rha hai
let total=(amtVal*exchangeRate).toFixed(2);                  //toFixed() -> Returns a string representing a number in fixed-point notation.
msg.innerText=`${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`
}

//ICON WORKING

let icon=document.querySelector("i");
icon.addEventListener("click",()=>{
    swap();
})
function swap(){
    let temp=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=temp;
    updateflag(fromCurr);
    updateflag(toCurr);
    exchangeValue();
}



































/*const country={   accesing key and values of an abject
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
} 
for(currcode in country){
    console.log(currcode,country[currcode]);
}*/
