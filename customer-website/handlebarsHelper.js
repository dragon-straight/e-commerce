const hbs=require('handlebars');
module.exports = {
    productPage: function (id) {
        const url = '/single-product/' + id;
        return new hbs.SafeString(url);
    },
    manufacturerPage: function (id) {
        const url = /list/ + id;
        return new hbs.SafeString(url);
     },
    categoryPage: function (id) {
        const url = '/list/' + id;
        return new hbs.SafeString(url);
    },
    formatCurrency: function (num) {
        num = num.toString();
        for (let i = num.length - 3; i > 0; i -= 3) {
            num = num.slice(0, i) + "." + num.slice(i);
        };
        num = num + ' VNĐ';
        return new hbs.SafeString(num)
    },
};
