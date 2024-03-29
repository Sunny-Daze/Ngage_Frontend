import React from "react";
import "./AdminControlStore.css";
import AdminControlStoreProductCard from "../widgets/AdminControlStoreProductCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddProductModal from "../components/AddProductModal";
import axios from "axios";
import { domain, endPoints } from "../services/endPoints";

function AdminControlStore() {
  const [createModal, setCreateModal] = React.useState(false);
  const [storeProducts, setStoreProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      let token = localStorage.getItem("token");

      // console.warn(token);

      let response = await axios.post(
        domain + endPoints.fetchShopProducts,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        response.data.result.forEach((e) => {
          storeProducts.push({
            productId: e._id,
            productDesc: e.productDesc,
            productImage: e.productImage,
            productName: e.productName,
            userPoints: parseFloat(e.userPoints),
          });
        });
        setStoreProducts([...storeProducts]);
      }
    }

    if (storeProducts.length == 0) {
      fetchData();
    }
  }, []);

  function editProductFunction(prod) {
    let index = storeProducts.findIndex((e) => e.productId === prod._id);
    storeProducts[index] = {
      productId: prod._id,
      productDesc: prod.productDesc,
      productImage: prod.productImage,
      productName: prod.productName,
      userPoints: parseFloat(prod.userPoints),
    };
    setStoreProducts([...storeProducts]);
  }

  function deleteProductFunction(prod) {
    setStoreProducts([...storeProducts.filter((e) => e.productId != prod._id)]);
  }

  return (
    <div className="AdminControlStore">
      <AddProductModal open={createModal} close={setCreateModal} />
      <div className="AdminControlButton">
        <Button
          onClick={() => setCreateModal(true)}
          variant="contained"
          size="small"
          style={{ background: "#157F1F" }}
        >
          Add Product{" "}
          <AddIcon
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.1rem",
              marginLeft: "0.1rem",
            }}
          />
        </Button>
      </div>

      {storeProducts.map((e) => (
        <AdminControlStoreProductCard
          {...{ ...e, editProductFunction, deleteProductFunction }}
        />
      ))}
    </div>
  );
}

export default AdminControlStore;
