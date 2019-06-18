module.exports = function Cart(oldCart){
    //cart có thể được update từ cart cũ trong session hoặc được tạo mới hẳn
    this.items = oldCart.items || [];
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item){
        /*var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;*/
        this.items.push(item);
        this.totalQty++;
        this.totalPrice += item.price;
    };

    /*this.reduce = function(item){
        /this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0){
            delete this.items[id];
        }/
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        var index = this.items.indexOf(item);
        delete this.items[index];
    };*/

    //so sánh như v vì viwed trong cart và item truyền vào khác nhau
    //nếu như có 2 món giống nhau trong this(cart) nhưng khác size, chúng có viewed khác nhau nên chỉ xét id và size
    /*findIndexOfRemovedProduct = function(product,thiscart){
        console.log('trong for');
        for (let item of thiscart.items){
            if(item._id === product._id && item.size === product.size)
            {
                console.log(item);
                return thiscart.items.indexOf(item);
            }
        }
    };*/

    this.remove = function(product){
        this.totalQty --;
        this.totalPrice -= product.price;
        console.log('debug trong remove');
        var index = 0;
        /*findIndexOfRemovedProduct(product,this).then(result =>{
            console.log(result);
            console.log(this);
            delete this.items[result];
        })*/
        for(let item in this.items){
            if(item._id === product._id && item.size === product.size)
            {
                console.log(item);
                index = this.items.indexOf(item);
                delete this.items[index];
            }
        }
        /*this.items.forEach(item=>{
            if(item._id === product._id && item.size === product.size)
            {
                console.log(item);
                index = this.items.indexOf(item);
                delete this.items[index];
            }
        })*/
    };

    /*this.generateArray = function () {
        /var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }/
        console.log("các món trong cart");
        console.log(this.items);
        return this.items;
    };*/
};