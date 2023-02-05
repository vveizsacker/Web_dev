

const products = [
	{id:"airtag",name:"AirTag",price:29,img : "airtag.jfif"},
	{id:"airpodsmax",name:"AirPods Max",price:399,img : "airpods-max.jfif"},
	{id:"airpods",name:"AirPods",price:299,img : "airpods.jfif"},
	{id:"phoneleathercase",name:"iPhone leather case",price:299,img : "phone1.jfif"},
	{id:"phonecase",name:"iPhone case",price:299,img : "phone2.jfif"},
	{id:"phone",name:"iPhone",price:299,img : "phone3.jfif"},
	{id:"watch1",name:"Smart Watch m1",price:299,img : "watch1.jfif"},
	{id:"watch2",name:"Smart Watch m2",price:299,img : "watch2.jfif"},
	{id:"watch3",name:"Smart Watch m3",price:299,img : "watch3.jfif"},
	{id:"watch4",name:"Smart Watch m4",price:299,img : "watch4.jfif"},

]

product_card = document.getElementById('product-template');
product_list = document.getElementById('product-list');


updateCart = () =>{
	items = JSON.parse(localStorage.getItem('cart'))

	document.getElementById('count').innerText = items.length;
	
	checkout_btn = document.getElementById('checkout-btn');

	if(items.length<=0){
		document.getElementById('empty').style.display = "initial";
		checkout_btn.style.display = "none";
	}
	else 
	{
		document.getElementById('empty').style.display = "none";
		checkout_btn.style.display = "initial";
	}

	template = document.getElementById('cart-item-template');
	list = document.getElementById('cart-list');
	list.innerHTML = "";

	items.forEach(item =>{
		const clone = document.importNode(template.content,true);
		
		product = products.find(product =>product.id == item.id);
		clone.querySelector('.price').innerHTML = "$"+product.price;
		clone.querySelector('.name').innerHTML = product.name;
		amount = clone.querySelector('.amount');
		amount.value = item.count;

		amount.onkeyup = event =>{
			item.count = amount.value
			saveCart(items)	
			updateCart()
		};
		amount.onchange = event =>{
			item.count = amount.value
			saveCart(items)	
			updateCart()
		}

		clone.querySelector('#img').src = "imgs/"+product.img;

		clone.querySelector('#delete').addEventListener('click',()=>{

			cart = JSON.parse(localStorage.getItem('cart'));
			
			for (let index = cart.length-1; index >= 0; index--) {
				if(cart[index].id == item.id)
					cart.splice(index,1);
			}
			saveCart(cart)
			updateCart()
		});

		list.append(clone);
	});
}

saveCart = (items) =>{
	localStorage.setItem('cart',JSON.stringify(items));
}

cart = localStorage.getItem('cart');

if(!cart) {
	localStorage.setItem('cart',JSON.stringify([]));
	updateCart(JSON.parse(cart));
}
else 
updateCart(JSON.parse(cart));

products.forEach(product =>{
	const clone = document.importNode(product_card.content,true);
	
	clone.querySelector('.price').innerHTML = "$"+product.price;
	clone.querySelector('.name').innerHTML = product.name;
	clone.querySelector('.product-img').src = "imgs/"+product.img;
	
	clone.querySelector('button').addEventListener('click',()=>{
		let cart = JSON.parse(localStorage.getItem('cart'));
		item = cart.find(item => item.id==product.id) 
		if(!item)cart.push({id:product.id,count:1});
		else alert("Product already in cart")
		localStorage.setItem('cart',JSON.stringify(cart));
		updateCart()
	});

	product_list.append(clone);
});
