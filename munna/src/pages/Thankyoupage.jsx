import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostOrderMutation } from "../store/api/orderapi";

const Thankyoupage = () => {
  const [loading,setloading] = useState(true)
  const location = useLocation();

const [postorder] = usePostOrderMutation()
  useEffect(()=>{
    
    const checkoutform = async () => {
        try {
          const response = postorder(location.state.orderinfo)
         setloading(false)
        } catch (error) {}
      
      
    };
if(location.state.orderinfo){
    checkoutform()
 
}
  },[location.state.orderinfo])
    return(
      loading == true ? <></> :  <>
<div>
 
  {/*header start*/}
<Header />
  {/*header end*/}



<section className="pt-lg-5 pt-md-2 mt-5">
          <div className="col-lg-12 col-sm-12  mt-lg-2 mt-1 mb-2">
            {/* <div className='container-fluid bigdiv'> */}
            <div className="container-fluid">
              <div className="row Thankpage">
                <div className="col-lg-12 col-sm-12 col-md-12">
                <div className="TextTankyou">
               <div className="Imgverify"> <img src="./images/icon/Group1.png" alt="img-fluid" style={{width:'23%'}} className="boyimg"/></div>
                    <h2 className="Fontthank" style={{fontWeight:'600'}}> <a href="Thank you" style={{color:'purple'}}>Thank you</a> for your order <img src="./images/icon/Group2.png" alt="404" className="Checkimg2"/></h2>
                </div>
                <div>
                    <p className="text-center" style={{color:'#8F9091'}} >Your order has been placed and is being processed. You will Receive an Email
                        <p className="text-center" style={{color:'#8F9091'}} >from CORRBEE.</p>
                    </p>
                </div>
                <div className="backTohome" style={{paddingTop:'20px'}}>
                <NavLink to="/home" style={{lineHeight:'20px',color:'#8F9091',fontSize:'14px' }}>Continue Shopping</NavLink> 
                </div>
               


                </div>

                
              </div>
            </div>
            <div style={{ display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column",marginTop: "10px",}}>
                                
       <video style={{maxWidth: "100%",height: "auto", borderRadius: "30px",}}autoPlay muted // Modern browsers ke liye autoplay ke saath muted hona zaruri hai
loop playsInline // Mobile devices ke liye autoplay support karta hai
>
  <source src="/videos/romantic-video4.mp4" // Public folder ka video path
    type="video/mp4"/>
 Your browser does not support the video tag.
</video>

                                </div>
          </div>
        </section>

  {/* footer start */}
  <Footer />
  {/* footer end */}

 
</div>




        </>
    )
}
export default Thankyoupage;