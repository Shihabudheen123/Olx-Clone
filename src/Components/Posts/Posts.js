import React, { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/ContextProvider";
import { PostContext } from "../../store/postContext";
import { useHistory } from "react-router-dom";
import Shimmer from "../Shimmer";

// Function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Function to format price with commas
const formatPrice = (price) => {
  return Number(price).toLocaleString();
};

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("products")
          .get();
        const allProducts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [firebase]);

const isLoading = products.length === 0;
  return  (
    <div className="postParentDiv">
      {/* Quick Menu Section */}
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {isLoading ? (
            <Shimmer/>
          ):(
          products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => {
                setPostDetails(product);
                history.push("/view");
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {formatPrice(product.price)}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          )
          ))}
        </div>
      </div>

      {/* Fresh Recommendations Section */}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

          
          
          {isLoading ? (
            <Shimmer/>
          ):
          
          (shuffleArray(products).map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => {
                setPostDetails(product);
                history.push("/view");
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {formatPrice(product.price)}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
