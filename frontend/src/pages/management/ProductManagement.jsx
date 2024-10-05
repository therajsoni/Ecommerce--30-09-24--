import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useSelector } from "react-redux";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../redux/api/ProductAPI";
import { useParams , useNavigate } from "react-router-dom";
import { Skeleton } from "../../components/Loader";
import { FaTrash } from "react-icons/fa";
import   {responseToast} from '../../utils/features.js';

const ProductManagement = () => {
  const { user } = useSelector((state) => state.userReducer);

  const params = useParams();

  const navigate = useNavigate();

  const { data, isLoading ,isError} = useProductDetailsQuery(params.id);

  const { name, price, stock, photo, category } = data?.product || {
    _id: "",
    name: "",
    price: 0,
    stock: 0,
    photo: "",
    category: "",
  };

  const [nameUpdate, setNameUpdate] = useState(name);
  const [priceUpdate, setPriceUpdate] = useState(price);
  const [stockUpdate, setStockUpdate] = useState(stock);
  const [photoUpdate, setPhotoUpdate] = useState(photo);
  const [categoryUpdate, setCategoryUpdate] = useState(category);

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();


  const [photoFile,setPhotoFile] = useState('')

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) {
      formData.set("name", nameUpdate);
    }

    if (priceUpdate !== undefined) {
      formData.set("price", priceUpdate.toString());
    }

    if (stockUpdate !== undefined){
      formData.set("stock", stockUpdate.toString());
    }

    if(categoryUpdate ){
      formData.set("category",categoryUpdate);
    }

    if (photoFile) {
      formData.set("photo",photoFile);
    }

    const res = await updateProduct({
      formData,
      userId : data.user._id,
      productId : data.productId
    })

   responseToast(res,navigate,"/admin/products");

  };

  const deleteHandler = async() => {
    const res = await updateProduct({
      userId : data.user._id,
      productId : data.productId
    })

   responseToast(res,navigate,"/admin/products");

  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setCategoryUpdate(data.product.category);
      setPhotoUpdate(data.product.photo);
      setPriceUpdate(data.product.price);
    }
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section style={{ padding: "2rem" }}>
              <strong>ID - {data?.product.id}</strong>
              <img src={`${`http://localhost:4000/photo`}`} alt="Product" />
              <p>{nameUpdate}</p>
              {stock > 0 ? (
                <span className="green">{stockUpdate} Available</span>
              ) : (
                <span className="red">Not Available</span>
              )}
              <h3>${priceUpdate}</h3>
            </section>
            <article>
            <button className="product-delete-btn" onClick={deleteHandler}><FaTrash/></button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    required
                    type="number"
                    placeholder="Price"
                    value={priceUpdate || ""}
                    onChange={(e) => setPriceUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    required
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate || ""}
                    onChange={(e) => setStockUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    required
                    type="text"
                    placeholder="category"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Photo</label>
                  <input
                    required
                    type="file"
                    onChange={(e) => changeImageHandler(e)}
                  />
                  {/* input when file load not give it value not placeholder  placeholder="Photo" value={photo}  */}
                </div>
                {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                <button type="Submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
