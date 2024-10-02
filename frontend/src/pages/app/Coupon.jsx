import React, { useEffect, useState } from 'react'
import AdminSidebar from "../../components/AdminSidebar"

const allletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = `!@#$%^&*()_-+`;


const Coupon = () => {

  const [size,setSize] = useState(8);
  const [prefix,setPrefix] = useState("");
  const [includeNumbers,setIncludeNumbers] = useState(false);
  const [includeCharacters,setIncludeCharacters] = useState(false);
  const [includeSymbols,setIncludeSymbols] = useState(false);
  const [isCopied,setIsCopied] = useState(false);

  const[coupon,setCoupon] = useState("");

  const copyText = async(coupon) => {
  await window.navigator.clipboard.writeText(coupon);
  setIsCopied(true);
  }

  const submitHandler = (e) => {
e.preventDefault();
if(!includeNumbers && !includeCharacters && !includeSymbols)return alert("Please Select One At least");
let result = prefix || "";
const loopLength = size - result.length
for(let i = 0;i<loopLength;i++){
  let entireString = "";
  if(includeCharacters)entireString += allletters;
  if(includeNumbers)entireString += allNumbers;
  if(includeSymbols)entireString += allSymbols;

  const randomNumber  = ~~(Math.random() * entireString.length);
  result += entireString[randomNumber]
}

setCoupon(result);

  }

  useEffect(()=>{
    setIsCopied(false)
  },[coupon])


  return (
    <div  className="admin-container">
    <AdminSidebar/>
    <main className='dashboard-app-container'>
     <h1>Coupon</h1>
     <section>
      <form onSubmit={submitHandler} className='coupon-form'>
      <input type='text' placeholder='Text to include' value={prefix} onChange={(e)=>setPrefix(e.target.value)} maxLength={size} />
      
      <input type='number' placeholder='Coupon Length' value={size} onChange={(e)=>setSize(Number(e.target.value))} min={8} max={25} />

      <fieldset>
        <legend>Include</legend>

        <input type='checkbox' value={includeNumbers} onChange={()=>setIncludeNumbers(prev => !prev)}/>
        <span>Numbers</span>    
  
        <input type='checkbox' value={includeCharacters} onChange={()=>setIncludeCharacters(prev => !prev)}/>
        <span>Character</span>     

        <input type='checkbox' value={includeSymbols} onChange={()=>setIncludeSymbols(prev => !prev)}/>
        <span>Symbols</span>     


      </fieldset>

      <button type='submit'>Generate</button>

      </form>
      {
        coupon && <code>{coupon} <span onClick={()=>copyText(coupon)} > {isCopied ? "Copied" : "Copy"}</span></code>
      }
     </section>
        </main>
    </div>
  )
}

export default Coupon
