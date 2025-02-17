
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

// تفعيل زر "View All Products"
const viewAllButton = document.querySelector('.Explore .all');
viewAllButton.addEventListener('click', function () {
    alert('جارٍ تحميل جميع المنتجات...');
    // هنا يمكنك إضافة الكود لتحميل المزيد من المنتجات أو الانتقال إلى صفحة أخرى.
});
