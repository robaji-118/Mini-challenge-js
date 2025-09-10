// File: src/modules/store.js

import { products } from "../data/products.js";
import { addProductToCart } from "./cart.js";
import { showToast } from "./utils.js"; // IMPORT showToast di sini

const productsGrid = document.getElementById("products");

// Elemen dan variabel baru untuk modal produk
const productModal = document.getElementById("product-modal");
const productModalContent = document.getElementById("product-modal-content");
const productModalCloseBtn = document.getElementById("product-modal-close");
const addToCartFromModalBtn = document.getElementById("add-to-cart-from-modal");
let selectedProduct = null;
let selectedSize = "";

export const renderProducts = (filters = {}) => {
  if (!productsGrid) return;

  const { q = "", category = "", size = "" } = filters;
  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(q.toLowerCase());
    const matchesCategory = category === "" || product.category === category;
    const matchesSize =
      size === "" || (product.sizes && product.sizes.includes(size));
    return matchesQuery && matchesCategory && matchesSize;
  });

  productsGrid.innerHTML = "";
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML =
      '<p class="text-center">Produk tidak ditemukan.</p>';
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${
        product.name
      }" onerror="this.src='https://placehold.co/200x200?text=Gambar Tidak Ditemukan';" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Rp${product.price.toLocaleString("id-ID")}</p>
      </div>
      <button class="btn btn--primary btn-card add-to-cart-btn" data-id="${
        product.id
      }">Buy Now</button>
    `;
    productsGrid.appendChild(productCard);
  });
};

const renderProductModal = (product) => {
  if (!productModalContent) return;

  productModalContent.innerHTML = `
    <img class="product-image" src="${product.image}" alt="${product.name}" />
    <div class="product-modal-body-2">
      <h3 class="product-name">${product.name}</h3>
      <p>Rp${product.price.toLocaleString("id-ID")}</p>
      <div class="sizes-selection">
        ${product.sizes
          .map((s) => `<span class="size-option" data-size="${s}">${s}</span>`)
          .join("")}
      </div>
    </div>
  `;
};

export const setupStoreListeners = () => {
  if (productsGrid) {
    productsGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart-btn")) {
        const productId = e.target.dataset.id;
        selectedProduct = products.find((p) => p.id === productId);

        if (selectedProduct) {
          renderProductModal(selectedProduct);
          productModal.classList.add("visible");
          selectedSize = ""; // Reset ukuran yang dipilih
          addToCartFromModalBtn.disabled = true;
        }
      }
    });
  }

  // Listener untuk tombol Tambahkan dari dalam modal
  if (addToCartFromModalBtn) {
    addToCartFromModalBtn.addEventListener("click", () => {
      // Validasi: pastikan ukuran sudah dipilih
      if (selectedProduct && selectedSize) {
        addProductToCart({ ...selectedProduct, size: selectedSize });
        productModal.classList.remove("visible");
      } else {
        // Tambahkan notifikasi jika ukuran belum dipilih
        showToast("Pilih ukuran terlebih dahulu!", "error");
      }
    });
  }

  // Listener untuk pilihan ukuran di dalam modal
  if (productModalContent) {
    productModalContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("size-option")) {
        const sizeOptions =
          productModalContent.querySelectorAll(".size-option");
        sizeOptions.forEach((option) => option.classList.remove("selected"));
        e.target.classList.add("selected");
        selectedSize = e.target.dataset.size;
        addToCartFromModalBtn.disabled = false;
      }
    });
  }

  // Listener untuk menutup modal produk
  if (productModalCloseBtn) {
    productModalCloseBtn.addEventListener("click", () => {
      productModal.classList.remove("visible");
    });
  }

  // Menutup modal saat mengklik di luar area modal
  if (productModal) {
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) {
        productModal.classList.remove("visible");
      }
    });
  }
};