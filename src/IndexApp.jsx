import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function IndexApp(){

    const URL = import.meta.env.VITE_BASE_URL,
          PATH= import.meta.env.VITE_API_PATH,
         [products, setProducts] = useState([]),
         [tempProduct, setTempProduct] = useState(null);

    useEffect(()=>{
     axios.get(`${URL}/v2/api/${PATH}/admin/products/all`)
        .then((res)=>{
          if(res.data.products){
            const productsArray = Object.values(res.data.products);
            setProducts(productsArray);
          }
        }
        )
        .catch((err)=>{
            console.log(err)
        })
        }
    ,[])

     const check = useCallback(()=>{
       axios.post(`${URL}/v2/api/user/check`)
         .then((res)=>{
           alert(`驗證成功`)
         })
         .catch((err)=>{
           alert(`驗證失敗`)
         })
     },[])

    return (
        <>
        <div className="container">
           <div className="row mt-5">
             <div className="col-md-6">
               <h2>產品列表</h2>
               <button className="btn" onClick={check}>驗證</button>
               <table className="table">
                 <thead>
                   <tr>
                     <th>產品名稱</th>
                     <th>原價</th>
                     <th>售價</th>
                     <th>是否啟用</th>
                     <th>查看細節</th>
                   </tr>
                 </thead>
                 <tbody>
                 {products.map(product=>{
                     const {id , category , origin_price , price , is_enabled } = product
                     return (
                       <tr key={id}>
                       <td>{category}</td>
                       <td>{origin_price}</td>
                       <td>{price}</td>
                       <td>
                         {is_enabled ? "是" : "否"}
                       </td>
                        <td>
                         <button className="btn btn-primary" onClick={()=>{
                           setTempProduct(product)
                         }}>查看細節</button>
                       </td> 
                     </tr>
                     )
                   })}
                 </tbody>
               </table>
             </div>
              <div className="col-md-6">
               <h2>單一產品細節</h2>
               {tempProduct ? (()=>{
                 const {imageUrl , imagesUrl , id ,title , category , description , content , origin_price , price} = tempProduct
                return (
                 <div className="card mb-3">
                 <img src={imageUrl} className="card-img-top primary-image" alt="主圖" />
                 <div className="card-body">
                   <h5 className="card-title">
                     {title}
                     <span className="badge bg-primary ms-2">{category}</span>
                   </h5>
                   <p className="card-text">商品描述：{description}</p>
                   <p className="card-text">商品內容：{content}</p>
                   <div className="d-flex">
                     <p className="card-text text-secondary"><del>{origin_price}</del></p>
                     元 / {price} 元
                   </div>
                   <h5 className="mt-3">更多圖片：</h5>
                   <div className="d-flex flex-wrap">
                     {imagesUrl.map((a,index)=>{
                       return(
                         <img src={a} key={index} className='card-img-top primary-image' alt="副圖" />
                       )
                     })}
                   </div>
                 </div>
               </div>)
               })(): (
                 <p className="text-secondary">請選擇一個商品查看</p>
               )}
             </div>
           </div>
         </div>
        </>
    )
};

export default IndexApp;