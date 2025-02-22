import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useGetWishlistProductQuery, usePostDeleteWishlistMutation } from "../store/api/wishlistapi";
import { useDispatch, useSelector } from "react-redux";
import { addwishlist } from "../store/state/wishlist";
import { useEffect } from "react";
import Footer from "../components/Footer";

const Wishlist = () => {
  const nvg = useNavigate();
  const { data: wishlistdata, isLoading, refetch } = useGetWishlistProductQuery();
  const [removetowishlistapi] = usePostDeleteWishlistMutation();
  const dispatch = useDispatch();
  const globalvariable = useSelector((state) => state);

  useEffect(() => {
    if (wishlistdata && wishlistdata.data) {
      dispatch(addwishlist(wishlistdata.data.length));
    }
  }, [wishlistdata, dispatch]);

  const transfer = (productid) => {
    nvg(`/productdetails/${productid}`);
  };

  const removewishlist = async (data) => {
    const wishlist_value = {
      product_id: data.product_id ? data.product_id._id : null,
      item_or_variant: data.product_id ? "item" : "variant",
      product_variant_id: data.product_variant_id ? data.product_variant_id._id : null,
    };

    const response = await removetowishlistapi(wishlist_value);
    if (response.data.status === "successfully") {
      dispatch(addwishlist(globalvariable.wishlist - 1));
      refetch();
    }
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      <Header />

      <div className="breadcrumb-main marginfromtop" style={{ backgroundColor: "#f9f9f9", marginTop: "130px" }}>

        <div className="container m-0">
          <div className="row">
            <div className="col">
              <div className="breadcrumb-contain">
                <div>
                  <ul>
                    <li>
                      <a href="/">home</a>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <a href="javascript:void(0)">Wishlist</a>
                    </li>
                    <marquee><h1 style={{ color: "purple" }}>corrbee international</h1></marquee>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-big-pt-space ratio_asos" style={{ background: "#f9f9f9", minHeight: "100vh" }}>
        <div className="collection-wrapper">
          <div className="custom-container">
            <div className="row">
              <div className="collection-content col">
                <div className="page-main-content">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="collection-product-wrapper">
                        <div className="product-top-filter">
                          <div className="row">
                            <div className="col-12">
                              <div className="product-filter-content"></div>
                            </div>
                          </div>
                        </div>
                        <div className="product-wrapper-grid product">
                          <div className="row removepadding" style={{ gap: "7px" }}>
                            {wishlistdata?.data?.[0] ? (
                              wishlistdata.data.map((item, index) =>
                                (item.product_id || item.product_variant_id) ? (
                                  <div className="col-xl-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <div className="bg-white" style={{ margin: "3px 4px", }}>
                                      <div className="product-imgbox">
                                        <div className="product-front">
                                          <button
                                            type="button"
                                            className="btn fixedhight"
                                            style={{ width: "100%", position: "relative" }}
                                          >
                                            <img
                                              src={`${process.env.REACT_APP_API_IMAGE_URL}${
                                                item.product_id ? item.product_id.product_image1 : item.product_variant_id.product_image1
                                              }`}
                                              onClick={() => {
                                                transfer(item.product_id ? item.product_id._id : item.product_variant_id.product_id);
                                              }}
                                              className="img-fluid"
                                              alt="product"
                                            />
                                            <span
                                              style={{
                                                position: "absolute",
                                                right: "12px",
                                                top: "8px",
                                                display: "inline-block",
                                                zIndex: 56,marginTop: "130px"
                                              }}
                                              onClick={() => {
                                                removewishlist(item);
                                              }}
                                            >
                                              <MdOutlineDeleteOutline size={25} color="#333" />
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                      <div className="product-detail detail-center detail-inverse">
                                        <div className="detail-title">
                                          <div className="detail-left">
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                              <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                  transfer(item.product_id ? item.product_id._id : item.product_variant_id.product_id);
                                                }}
                                              >
                                                <h6 className="price-title" style={{ fontSize: "12px", fontWeight: "600" }}>
                                                  {item.product_name}
                                                </h6>
                                              </button>
                                            </div>
                                          </div>
                                          <div className="detail-right" style={{ width: "100%" }}>
                                            <div className="price" style={{ width: "100%" }}>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  color: "#000",
                                                  fontSize: "12px",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                ₹{item.product_id ? item.product_id.selling_price : item.product_variant_id.selling_price}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  removewishlist(item)
                                )
                              )
                            ) : (
                              <div
                                style={{
                                  textAlign: "center",
                                  padding: "20px",
                                }}
                              >
                                <h2
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "20px",
                                    marginBottom: "15px",
                                  }}
                                >
                                  Your Wishlist is empty!!
                                </h2>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                  }}
                                >
                                  <video
                                  style={{maxWidth: "100%",height: "auto", borderRadius: "30px",}}autoPlay muted // Modern browsers ke liye autoplay ke saath muted hona zaruri hai
loop playsInline // Mobile devices ke liye autoplay support karta hai
>
  <source src="/videos/romantic-video.mp4" // Public folder ka video path
    type="video/mp4"/>
 Your browser does not support the video tag.
</video>

                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<Footer/>
      </section>
    </>
  );
};

export default Wishlist;
