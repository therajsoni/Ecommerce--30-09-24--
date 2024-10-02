import { useState} from "react"
import AdminSidebar from "../../components/AdminSidebar"



const NewProduct = () => {
  const [name,setName] = useState("");
  const [price,setPrice] = useState();
  const [stock,setStock] = useState();
  const [photo,setPhoto] = useState();

  const changeImageHandler = (e) => {
    
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if(typeof reader.result === "string"){
          setPhoto(reader.result)
        }
      }
    }

  }


  return (
    <div className="admin-container">
      <AdminSidebar/>
      <main className="product-management">
      <article>
        <form>
          <h2>New Product</h2>
          <div>
            <label>Name</label>
            <input required type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <label>Price</label>
            <input required type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
          </div>
          <div>
            <label>Stock</label>
            <input required type="number" placeholder="Stock" value={stock} onChange={(e)=>setStock(e.target.value)} />
          </div>
          <div>
            <label>Photo</label>
            <input required type="file"  onChange={(e)=>changeImageHandler(e)} />
            {/* input when file load not give it value not placeholder  placeholder="Photo" value={photo}  */}
          </div>
          {
            photo && <img src={photo} alt="New Image" />
          }
          <button type="Submit" >Create</button>
        </form>
      </article>
      </main>
    </div>
  )
}

export default NewProduct
