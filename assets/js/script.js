// // Selecting the element where new categories will be added  
// const addCategoryLink = document.querySelector('.add-Catigory a');  

// // Handling the click event for the "Add Category" link  
// addCategoryLink.addEventListener('click', async (event) => {  
//     event.preventDefault(); // Prevent the default link behavior  

//     // Gather category data  
//     const newCategory = {  
//         name: "Sports", // Example category name  
//         description: "Any items related to Sports", // Example description  
//     };  

//     try {  
//         const response = await fetch('http://127.0.0.1:8000/api/category', {  
//             method: 'POST',  
//             headers: {  
//                 'Content-Type': 'application/json',  
//             },  
//             body: JSON.stringify(newCategory),  
//         });  

//         // Handle the response from the server  
//         if (response.ok) {  
//             const data = await response.json();  
//             alert("Category created successfully: " + data.name);  
//             // Optionally, you could update the UI to show the new category  
//             // For this example, you may want to append it to the list  
//             const categoryList = document.querySelector('#gategory ul');  
//             const newCategoryItem = document.createElement('li');  
//             newCategoryItem.innerHTML = `  
//                 <a href="#">  
//                     <img src="./assets/images/new-category.png" alt="">  
//                     <p>${data.name}</p>  
//                 </a>`;  
//             categoryList.appendChild(newCategoryItem);  
//         } else {  
//             const errorData = await response.json();  
//             alert("Error: " + errorData.message);  
//         }  
//     } catch (error) {  
//         console.error('Error creating the category:', error);  
//         alert("An error occurred. Please try again.");  
//     }  
// });



// تفعيل زر "Scroll to Top"
document.querySelector('.up').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// تفعيل زر "Add to Cart"
const addToCartButtons = document.querySelectorAll('.cart button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.parentElement.querySelector('p').innerText;
        alert(`تم إضافة "${productName}" إلى سلة التسوق!`);
        // هنا يمكنك إضافة الكود لإرسال المنتج إلى سلة التسوق الفعلية (API أو localStorage).
    });
});

// تفعيل البحث
const searchForm = document.querySelector('.inputs form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchQuery = this.querySelector('input[type="search"]').value;
    if (searchQuery.trim() !== '') {
        alert(`جارٍ البحث عن: "${searchQuery}"`);
        // هنا يمكنك إضافة الكود لإرسال طلب البحث إلى API أو تصفية المنتجات.
    } else {
        alert('يرجى إدخال نص للبحث.');
    }
});

// تفعيل أزرار التنقل في قسم "Explore Our Products"
const exploreButtons = document.querySelectorAll('.Explore .btns button');
const exploreCarts = document.querySelector('.Explore .carts');
let scrollPosition = 0;

exploreButtons.forEach(button => {
    button.addEventListener('click', function () {
        const scrollWidth = exploreCarts.scrollWidth / 4; // يتم التمرير بمقدار عرض 4 منتجات
        if (this.querySelector('i').classList.contains('fa-arrow-left')) {
            scrollPosition = Math.max(scrollPosition - scrollWidth, 0);
        } else {
            scrollPosition = Math.min(scrollPosition + scrollWidth, exploreCarts.scrollWidth - exploreCarts.clientWidth);
        }
        exploreCarts.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
});

// تفعيل زر "View All Products"
const viewAllButton = document.querySelector('.Explore .all');
viewAllButton.addEventListener('click', function () {
    alert('جارٍ تحميل جميع المنتجات...');
    // هنا يمكنك إضافة الكود لتحميل المزيد من المنتجات أو الانتقال إلى صفحة أخرى.
});