import { useState} from "react"
import AdminSidebar from "../../components/AdminSidebar"
import photoShoes from "../../assets/download.jpg"

const ProductManagement = () => {
  const [name,setName] = useState("Puma Shoes");
  const [price,setPrice] = useState(2000);
  const [stock,setStock] = useState(10);
  const [photo,setPhoto] = useState(photoShoes);

  const [nameUpdate,setNameUpdate] = useState(name);
  const [priceUpdate,setPriceUpdate] = useState(price);
  const [stockUpdate,setStockUpdate] = useState(stock);
  const [photoUpdate,setPhotoUpdate] = useState(photo);

  const changeImageHandler = (e) => {
    
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if(typeof reader.result === "string"){
          setPhotoUpdate(reader.result)
        }
      }
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  } 

  return (
    <div className="admin-container">
      <AdminSidebar/>
      <main className="product-management">
      <section  style={{padding:"2rem"}} >
        <strong>
ID
        </strong>
 <img src={photoUpdate} alt="Product" />
 <p>{nameUpdate}</p>
 {
    stock > 0 ? (
        <span className="green">{stockUpdate} Available</span>
    ) : <span className="red">Not  Available</span>
 }
 <h3>${priceUpdate}</h3>

      </section>  
      <article>
        <form onSubmit={submitHandler}>
          <h2>Manage</h2>
          <div>
            <label>Name</label>
            <input required type="text" placeholder="Name" value={nameUpdate} onChange={(e)=>setNameUpdate(e.target.value)} />
          </div>
          <div>
            <label>Price</label>
            <input required type="number" placeholder="Price" value={priceUpdate} onChange={(e)=>setPriceUpdate(e.target.value)} />
          </div>
          <div>
            <label>Stock</label>
            <input required type="number" placeholder="Stock" value={stockUpdate} onChange={(e)=>setStockUpdate(e.target.value)} />
          </div>
          <div>
            <label>Photo</label>
            <input required type="file"  onChange={(e)=>changeImageHandler(e)} />
            {/* input when file load not give it value not placeholder  placeholder="Photo" value={photo}  */}
          </div>
          {
            photoUpdate && <img src={photoUpdate} alt="New Image" />
          }
          <button type="Submit" >Update</button>
        </form>
      </article>
      </main>
    </div>
  )
}

export default ProductManagement
