(function(){"use strict";var t={6912:function(t,r,e){var a=e(6369),o=function(){var t=this,r=t._self._c;return r("div",{attrs:{id:"app"}},[r("NavBar"),r("router-view")],1)},s=[],n=function(){var t=this,r=t._self._c;return r("div",{attrs:{id:"nav-bar"}},[r("router-link",{attrs:{to:"/products",id:"products-link"}},[r("h1",[t._v("BAIS3200Demo")])]),r("router-link",{attrs:{to:"/cart",id:"cart-link"}},[r("button",[t._v("Shopping Cart")])])],1)},i=[],c={name:"NavBar"},u=c,d=e(1001),p=(0,d.Z)(u,n,i,!1,null,"b13e7732",null),l=p.exports,m={name:"App",components:{NavBar:l}},v=m,f=(0,d.Z)(v,o,s,!1,null,null,null),h=f.exports,_=e(2631),g=function(){var t=this,r=t._self._c;return r("div",{attrs:{id:"page-wrap"}},[r("div",{staticClass:"grid-wrap"},t._l(t.products,(function(e){return r("div",{key:e.id,staticClass:"product-item"},[r("img",{attrs:{src:e.imageUrl}}),r("h3",{staticClass:"product-name"},[t._v(t._s(e.name))]),r("p",{staticClass:"product-price"},[t._v("$"+t._s(e.price))]),r("router-link",{attrs:{to:"products/"+e.id}},[r("button",[t._v("View Details")])])],1)})),0)])},b=[],P=e(4161),w={name:"ProductsPage",data(){return{products:[]}},async created(){const t=await P.Z.get("/api/products"),r=t.data;this.products=r}},C=w,y=(0,d.Z)(C,g,b,!1,null,"f94b9c18",null),Z=y.exports,I=function(){var t=this,r=t._self._c;return r("div",{attrs:{id:"page-wrap"}},[r("h1",[t._v("Shopping Cart")]),r("ProductsList",{attrs:{products:t.cartItems},on:{"remove-from-cart":function(r){return t.removeFromCart(r)}}}),r("h3",{attrs:{id:"total-price"}},[t._v("Total: $"+t._s(t.totalPrice))]),r("button",{attrs:{id:"checkout-button"}},[t._v("Proceed to Checkout")])],1)},k=[],O=function(){var t=this,r=t._self._c;return t.products.length>0?r("div",t._l(t.products,(function(e){return r("ProductsListItem",{key:e.id,attrs:{product:e},on:{"remove-from-cart":function(r){return t.$emit("remove-from-cart",r)}}})})),1):r("p",[t._v("You haven't added anything to your cart yet!")])},x=[],$=function(){var t=this,r=t._self._c;return r("div",{staticClass:"product-container"},[r("img",{staticClass:"product-image",attrs:{src:t.product.imageUrl}}),r("div",{staticClass:"details-wrap"},[r("h3",[t._v(t._s(t.product.name))]),r("p",[t._v("$"+t._s(t.product.price))])]),r("button",{staticClass:"remove-button",on:{click:function(r){return t.$emit("remove-from-cart",t.product.id)}}},[t._v("Remove From Cart")])])},N=[],T={name:"ProductsListItem",props:["product"]},F=T,S=(0,d.Z)(F,$,N,!1,null,"6cb22d65",null),j=S.exports,D={name:"ProductsList",props:["products"],components:{ProductsListItem:j}},L=D,A=(0,d.Z)(L,O,x,!1,null,null,null),M=A.exports,B={name:"CartPage",components:{ProductsList:M},data(){return{cartItems:[]}},computed:{totalPrice(){return this.cartItems.reduce(((t,r)=>t+Number(r.price)),0)}},methods:{async removeFromCart(t){const r=await P.Z["delete"](`/api/users/12345/cart/${t}`);this.cartItems=r.data}},async created(){const t=await P.Z.get("/api/users/12345/cart"),r=t.data;this.cartItems=r}},U=B,R=(0,d.Z)(U,I,k,!1,null,"38b150f1",null),E=R.exports,G=function(){var t=this,r=t._self._c;return t.product?r("div",{attrs:{id:"page-wrap"}},[r("div",{attrs:{id:"image-wrap"}},[r("img",{attrs:{src:t.product.imageUrl}})]),r("div",{attrs:{id:"product-details"}},[r("h1",[t._v(" "+t._s(t.product.name)+" ")]),r("h3",{attrs:{id:"price"}},[t._v(" "+t._s(t.product.price)+" ")]),r("p",[t._v(" Average Rating: "+t._s(t.product.averageRating)+" ")]),t.itemsInCart||t.showSuccesssMessage?t._e():r("button",{attrs:{id:"add-to-cart"},on:{click:t.addToCart}},[t._v(" Add To Cart ")]),!t.itemsInCart&&t.showSuccesssMessage?r("button",{staticClass:"green-button",attrs:{id:"add-to-cart"}},[t._v(" Successfully added to cart! ")]):t._e(),t.itemsInCart?r("button",{staticClass:"grey-button",attrs:{id:"add-to-cart"}},[t._v(" Item is already in cart ")]):t._e(),r("h4",[t._v(" Description ")]),r("p",[t._v(" "+t._s(t.product.description)+" ")])])]):r("NotFoundPage")},V=[],Y=(e(7658),function(){var t=this,r=t._self._c;return r("h1",[t._v("404 PAGE NOT FOUND")])}),q=[],z={name:"NotFoundPage"},H=z,J=(0,d.Z)(H,Y,q,!1,null,"506d7f08",null),K=J.exports,Q={name:"ProductsDetailPage",components:{NotFoundPage:K},data(){return{product:{},showSuccesssMessage:!1,cartItems:[]}},computed:{itemsInCart(){return this.cartItems.some((t=>t.id===this.product.id))}},async created(){const t=await P.Z.get(`/api/products/${this.$route.params.id}`),r=t.data;this.product=r;const{data:e}=await P.Z.get("/api/users/12345/cart");this.cartItems=e},methods:{async addToCart(){await P.Z.post("/api/users/12345/cart",{productId:this.$route.params.id}),this.showSuccesssMessage=!0,setTimeout((()=>{this.$router.push("/products")}),1500)}}},W=Q,X=(0,d.Z)(W,G,V,!1,null,"1e8db770",null),tt=X.exports;a.ZP.use(_.ZP);const rt=[{path:"/products",name:"Products Page",component:Z},{path:"/products/:id",name:"Product Details Page",component:tt},{path:"/cart",name:"Cart Page",component:E},{path:"*",component:K}],et=new _.ZP({mode:"history",base:"/",routes:rt});var at=et;a.ZP.config.productionTip=!1,new a.ZP({router:at,render:t=>t(h)}).$mount("#app")}},r={};function e(a){var o=r[a];if(void 0!==o)return o.exports;var s=r[a]={exports:{}};return t[a](s,s.exports,e),s.exports}e.m=t,function(){var t=[];e.O=function(r,a,o,s){if(!a){var n=1/0;for(d=0;d<t.length;d++){a=t[d][0],o=t[d][1],s=t[d][2];for(var i=!0,c=0;c<a.length;c++)(!1&s||n>=s)&&Object.keys(e.O).every((function(t){return e.O[t](a[c])}))?a.splice(c--,1):(i=!1,s<n&&(n=s));if(i){t.splice(d--,1);var u=o();void 0!==u&&(r=u)}}return r}s=s||0;for(var d=t.length;d>0&&t[d-1][2]>s;d--)t[d]=t[d-1];t[d]=[a,o,s]}}(),function(){e.n=function(t){var r=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(r,{a:r}),r}}(),function(){e.d=function(t,r){for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)}}(),function(){var t={143:0};e.O.j=function(r){return 0===t[r]};var r=function(r,a){var o,s,n=a[0],i=a[1],c=a[2],u=0;if(n.some((function(r){return 0!==t[r]}))){for(o in i)e.o(i,o)&&(e.m[o]=i[o]);if(c)var d=c(e)}for(r&&r(a);u<n.length;u++)s=n[u],e.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return e.O(d)},a=self["webpackChunkbais3200demo"]=self["webpackChunkbais3200demo"]||[];a.forEach(r.bind(null,0)),a.push=r.bind(null,a.push.bind(a))}();var a=e.O(void 0,[998],(function(){return e(6912)}));a=e.O(a)})();
//# sourceMappingURL=app.4ee9f77b.js.map