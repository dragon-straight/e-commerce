<thead>
<tr>
<th>ID</th>
<th>Thông tin khách hàng</th>
<th>Hình thức thanh toán</th>
<th>Thành tiền</th>
<th>Ngày tạo</th>
<th>Danh sách sản phẩm</th>
<th>Trạng thái</th>
</tr>
</thead>
<tbody>
{{#each orderList}}
<tr>
<td>{{_id}}</td>
<td>{{infoCustomer}}</td>
<td>{{payment}}</td>
<td>{{formatCurrency totalPrice}}</td>
<td>{{formatDate created}}</td>
<td>{{productList}}</td>
<td>{{status}}</td>
<td>
<a> <i class="fa fa-trash fa-lg" aria-hidden="=true"></i></a>
</td>
</tr>
{{/each}}
</tbody>