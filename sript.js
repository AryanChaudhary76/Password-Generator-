const inputslider=document.querySelector("[range-slider]");
const lengthnum=document.querySelector("[pass-length]");
const passdisplay=document.querySelector("[password-displayy]");
const copybutton=document.querySelector("[copy-button]");
const copymessage=document.querySelector("[copy-message]");
const uccheck=document.querySelector("#uppercase");
const lccheck=document.querySelector("#lowercase");
const numscheck=document.querySelector("#numbers");
const symscheck=document.querySelector("#Symbols");
const strengthindi=document.querySelector("[strength-indicator]");
const generatebutton=document.querySelector("[Generate-pass]");
const allCheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password='';
let passwordlength=10;
let checkcount=0;
setindicator('#ccc');
//.setpassworldlength.//
handleSlider();
function handleSlider(){
    inputslider.value=passwordlength;
    lengthnum.innerText=passwordlength;
 
    const max=inputslider.max;
    const min=inputslider.min;
    inputslider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"% 100%"


 
}
function setindicator(color){ 
    strengthindi.style.backgroundColor=color;
    strengthindi.style.boxShadow=`0 0 12px 1px ${color}`;
    //shadow
}
function getRandominteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomnumber(){
    return getRandominteger(0,10);
}
function generateLowercase(){
    return  String.fromCharCode(getRandominteger(97,123));
}
function generateUppercase(){
    return  String.fromCharCode(getRandominteger(65,91));
}
function generateSymbol(){
    let randnum=getRandominteger(0,symbols.length);
    return symbols.charAt(randnum);
     
}
function calculateStrength(){
    let hasupper=false;
    let haslower=false;
    let hasnumber=false;
    let hassymbols=false; 
    if(uccheck.checked) hasupper=true;
    if(lccheck.checked) haslower=true;
    if(numscheck.checked) hasnumber=true;
    if(symscheck.checked) hassymbols=true;
    if(hasupper && haslower && (hasnumber||hassymbols) && passwordlength>=8){
        setindicator('#0f0');
    }
    else if((hasupper || haslower) && (hasnumber||hassymbols) && passwordlength>=6){
        setindicator('#ff0');
    }
    else{
        setindicator('#f00');
    }

}
async function copypass() {
    try {
        await navigator.clipboard.writeText(passdisplay.value);
        copymessage.innerText='copied';
    } catch (error) {
        copymessage.innerText='failed';
        
    }
    copymessage.classList.add('active')
    setTimeout(function(){
        copymessage.classList.remove('active')


    },2000);
     
    
}
inputslider.addEventListener('input',function(event){
    passwordlength=event.target.value;
    handleSlider();

});
copybutton.addEventListener('click',function(){
    if(passdisplay.value){
        copypass();
    }

})



function shufflepassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
} 
function handleCheckBoxChange() {
      checkcount=0;
    allCheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkcount++;
    });

    //special condition
    if(passwordlength < checkcount ) {
        passwordlength = checkcount;
        handleSlider();
    }
}

allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
console.log('done')

generatebutton.addEventListener('click',()=> {
    if(checkcount<=0) return;

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleSlider();  
    }
    //generate new pass
    password='';
    let functionarr=[];
    if(uccheck.checked){
        functionarr.push(generateUppercase);
    }
    if(lccheck.checked){
        functionarr.push(generateLowercase);
    }
    if(numscheck.checked){
        functionarr.push(generateRandomnumber);
    }
    if(symscheck.checked){
        functionarr.push(generateSymbol);
    }
    //mandatory
    for(let i=0;i<functionarr.length;i++){
        password+=functionarr[i]();
    }
    console.log('mandatory done')
    //remaining places
    for(let i=0;i<passwordlength-functionarr.length;i++){
        let randomindex=getRandominteger(0,functionarr.length);
        console.log('randomindex'+randomindex)
        password+=functionarr[randomindex]();

    }
    console.log('remaining done')
    //shufflepassword
    password=shufflepassword(Array.from(password));
    console.log('shuffling done')

     //show password in display bar
    passdisplay.value=password;
    console.log('ui display done')
    calculateStrength();



    
});
  


