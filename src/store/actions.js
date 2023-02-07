
export default {
  addCart(context,payload){
    //1.查找之前数组是否有该商品
    let oldProduce=context.state.cartList.find(item=>item.iid===payload.iid)

    //2.判断oldProduce
    if(oldProduce){
      // oldProduce.count+=1
      context.commit('addCounter',oldProduce)
    }else{
      payload.count=1
      // context.state.cartList.push(payload)
      context.commit('addCart',payload)
    }
  }
}