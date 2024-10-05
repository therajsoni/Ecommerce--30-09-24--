import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useSelector } from "react-redux";
import { responseToast } from "../../utils/features";
import { useNavigate, useParams } from "react-router-dom";
// Assuming the correct import path for the mutation hook
import { useNewProductMutation } from "../../redux/api/ProductAPI"; // Use the correct mutation hook

const NewProduct = () => {

  const { user } = useSelector(state => state.userReducer);
  const navigate = useNavigate();

  const params  = useParams();

  const {data} = useNewProductMutation(params.id);
  

  
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [photo, setPhoto] = useState();
  const [category, setCategory] = useState("");
  const [photoPrev, setPhotoPrev] = useState();

  // to access any name newProduct
  const [newProduct] =  useNewProductMutation() // Correct use of the mutation hook

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(reader.result);
        }
      };
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // reload na ho page e.preventDefault()
    if (!name || !price || !stock || !photo || !category) return;

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newProduct({
      id: user?._id,
      formData
    });

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
    <label>Price</label>
    <input
      required
      type="number"
      placeholder="Price"
      value={price || ''}  
      onChange={(e) => setPrice(e.target.value)} 
    />
  </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock || ''}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input 
              required 
              type="file"
              onChange={changeImageHandler} />
            </div>
            {photoPrev && <img src={photoPrev} alt="New Product" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
