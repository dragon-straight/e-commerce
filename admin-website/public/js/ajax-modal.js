$/*("#customerButton").click(() =>{
    //const customer = document.getElementById("customer").value;
    const customerModal = $("#customerModal");
    const CustomerInput = $("#customerInfo");
    $.ajax({
        url: '/orders/list',
        contentType: 'application/json',
        success: res =>{
            customerModal.find("#name").text(CustomerInput.find("#name").val());
            customerModal.find("#address").text(CustomerInput.find("#address").val());
            customerModal.find("#sdt").text(CustomerInput.find("#sdt").val());
            customerModal.find("#email").text(CustomerInput.find("#email").val());
            console.log("abc");
            customerModal.modal('show');
        }
    });
});*/

function get_ID_Order(index){
    const id = "#idOrder" + index;
   return $('#body-order').find(id);
};

$('button[id^="customerButton"]').on('click', function (e) {
    const customerModal = $("#customerModal");
    const idOrder = get_ID_Order($(this).val());
    const toURL = '/orders/list/customerInfo/' + idOrder.text();
    $.ajax({
        url: toURL,
        contentType: 'application/json',
        method: 'GET',
        dataType: 'json',
        success: res =>{
            customerModal.find("#name").text(res.infoCustomer.name);
            customerModal.find("#address").text(res.infoCustomer.address);
            customerModal.find("#email").text(res.infoCustomer.email);
            customerModal.find("#sdt").text(res.infoCustomer.sdt);
        }
    });
});

$('button[id^="productButton"]').on('click', function (e) {
   const productModal = $('#productModal');
   const isOrder = get_ID_Order($(this).val());
   const toURL = '/orders/list/productInfo/' + isOrder.text();

   $.ajax({
      url: toURL,
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: res =>{
          res.productList.forEach(product => {
             productModal.find('tbody').append('<tr> ' +
                 '<td>' + product._id + '</td> ' +
                 '<td>' + product.name + '</td> ' +
                 '<td>' + product.price + '</td> ' +
                 '<td>' + product.quantity + '</td> ' +
                 '</tr>');
          });
      }
   });
});


$('#customerModal').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal');
});

$('#productModal').on('hidden.bs.modal', function () {
    $(this).find('tbody').html('');
});
