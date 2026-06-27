/* ═══════════════════════════════════════════════════════════════════
   MIANJU — script.js
   ── Currency: AUD
   ── Payments: Stripe PaymentElement (real charges, PCI-compliant)
   ── All cart, gift, parallax, and reveal logic fixed
   ═══════════════════════════════════════════════════════════════════ */

const STRIPE_PUBLISHABLE_KEY = "pk_live_51R6gpCG1ORKNdh6uUEYGgRFJgimz5np7BBeXStRNCEf8Zgilbtj763YJX12xQ4j78rcmUSHWCDoU608fn7bP6SYF00ECRwZGot";
const PAYMENT_INTENT_ENDPOINT = "https://mianju-website.vercel.app/create-payment-intent";

/* ──────────────────────────────────────────────────────────────────
   SIZE DEFINITIONS
   ────────────────────────────────────────────────────────────────── */

const SML      = ["S", "M", "L"];
const ONE_SIZE = ["One Size"];

/* ──────────────────────────────────────────────────────────────────
   PRODUCT CATALOGUE
   Grouped: Occasion → Soft Occasion → Everyday → Bottoms → Foundations
   ────────────────────────────────────────────────────────────────── */

const products = [

  // ── OCCASION ──────────────────────────────────────────────────

  {
    id: "atelier-dress", name: "Atelier Dress", category: "Dress", price: 41, originalPrice: 55,
    image: "assets/atelier-dress.jpg", position: "center top",
    description: "A tailored silhouette refined to its purest form. Clean lines, considered drape, and an ease that reads as effortless precision.",
    sizes: ONE_SIZE,
    colours: ["Pink", "Black"],
  },
  {
    id: "malena-dress", name: "Malena Dress", category: "Dress", price: 33, originalPrice: 45,
    image: "assets/malena-dress.jpg", position: "center top",
    description: "Softness held in structure. The Malèna moves with the body while maintaining a quiet, deliberate composure.",
    sizes: SML,
  },
  {
    id: "perla-dress", name: "Perla Dress", category: "Dress", price: 26, originalPrice: 35,
    image: "assets/perla-dress.jpg", position: "center top",
    description: "A luminous occasion piece. Understated at a glance, considered at every seam.",
    sizes: ONE_SIZE,
  },
  {
    id: "lumiere-dress", name: "Lumiere Dress", category: "Dress", price: 45, originalPrice: 60,
    image: "assets/lumiere-dress.jpg", position: "center top",
    description: "Structured femininity at its most distilled. The Lumière holds its shape without effort — presence without performance.",
    sizes: ONE_SIZE,
  },

  // ── SOFT OCCASION ─────────────────────────────────────────────

  {
    id: "magnolia-dress", name: "Magnolia Dress", category: "Dress", price: 30, originalPrice: 40,
    image: "assets/magnolia-dress.jpg", position: "center top",
    description: "Blooms quietly. A dress that earns its name through delicacy of form and a silhouette that lingers.",
    sizes: ONE_SIZE,
    colours: ["White", "Pink"],
  },
  {
    id: "camellia-set", name: "Camellia Set", category: "Set", price: 26, originalPrice: 35,
    image: "assets/camellia set.jpg", position: "center top",
    description: "Two pieces, one intention. Worn together or apart, the Camellia Set offers a controlled softness suited to any occasion.",
    sizes: ONE_SIZE,
  },
  {
    id: "seraphina-dress", name: "Seraphina Dress", category: "Dress", price: 18, originalPrice: 25,
    image: "assets/seraphina-dress.jpg", position: "center top",
    description: "An entry piece that refuses to feel like one. The Seraphina carries MIANJU's restraint in a form made for daily wear.",
    sizes: ONE_SIZE,
  },
  {
    id: "soiree-dress", name: "Soiree Dress", category: "Dress", price: 26, originalPrice: 35,
    image: "assets/soiree-dress.jpg", position: "center top",
    description: "Quiet confidence, dressed for evening. A silhouette built for the room — and entirely at ease within it.",
    sizes: ONE_SIZE,
  },

  // ── EVERYDAY ──────────────────────────────────────────────────

  {
    id: "solace-dress", name: "Solace Dress", category: "Dress", price: 18, originalPrice: 25,
    image: "assets/solace dress.jpg", position: "center top",
    description: "A dress designed around ease. Unassuming in its construction, unmistakable in its effect.",
    sizes: ONE_SIZE,
  },
  {
    id: "aveline-top", name: "Aveline Top", category: "Top", price: 15, originalPrice: 20,
    image: "assets/aveline top.jpg", position: "center top",
    description: "Off-shoulder ease in a single piece. The Aveline exposes a collarbone and keeps everything else composed.",
    sizes: ONE_SIZE,
    sizeNote: "One size. Fits AU 6–10.",
  },
  {
    id: "echelon-top", name: "Echelon Top", category: "Top", price: 11, originalPrice: 15,
    image: "assets/echelon-top.jpg", position: "center top",
    description: "A precise, clean top that anchors the MIANJU wardrobe. Understated by design, intentional by nature.",
    sizes: SML,
  },
  {
    id: "poise-top", name: "Poise Top", category: "Top", price: 15, originalPrice: 20,
    image: "assets/poise-top.jpg", position: "center top",
    description: "A structured top that lends composure to any silhouette — tailored enough for occasion, quiet enough for every day.",
    sizes: ONE_SIZE,
  },

  // ── BOTTOMS ───────────────────────────────────────────────────

  {
    id: "elan-trouser", name: "Elan Trouser", category: "Trouser", price: 18, originalPrice: 25,
    image: "assets/elan-trouser.jpg", position: "center top",
    description: "High-waisted with a straight fall. The Élan trouser brings quiet authority to any combination.",
    sizes: SML,
    sizeNote: "Straight leg, high waist.",
  },
  {
    id: "opaline-skirt", name: "Opaline Skirt", category: "Skirt", price: 18, originalPrice: 25,
    image: "assets/opaline-skirt.jpg", position: "center top",
    description: "A mid-length skirt with a luminous quality. Structured enough to stand alone, soft enough to move with you.",
    sizes: SML,
    colours: ["Black", "White"],
  },
  {
    id: "odette-skirt", name: "Odette Skirt", category: "Skirt", price: 15, originalPrice: 20,
    image: "assets/odette-skirt.jpg", position: "center top",
    description: "Floor-grazing and high-waisted, the Odette is the longest statement in the collection. Size up for added length.",
    sizes: ONE_SIZE,
    sizeNote: "One size. Size up for a longer fall.",
    colours: ["Pink", "White"],
  },

  // ── FOUNDATIONS ───────────────────────────────────────────────

  {
    id: "moonveil-shorts", name: "Moonveil Shorts", category: "Shorts", price: 5, originalPrice: 7,
    image: "assets/moonveil-shorts.jpg", position: "center top",
    description: "Designed to disappear beneath dresses and sheer garments, Moonveil offers coverage without disrupting the silhouette.",
    sizes: ONE_SIZE,
    sizeNote: "One size. Fits AU 6–12.",
  },
  {
    id: "velour-shorts", name: "Velour Shorts", category: "Shorts", price: 7, originalPrice: 10,
    image: "assets/velour-shorts.jpg", position: "center top",
    description: "Texture as intention. The Noir Velour Shorts bring depth and a considered softness to the lower half.",
    sizes: SML,
    colours: ["Black", "White"],
  },

];

/* ──────────────────────────────────────────────────────────────────
   COMPLIMENTARY GIFTS
   ────────────────────────────────────────────────────────────────── */

const complimentaryGifts = [
  { id: "camellia-ribbon-collar",  name: "Camellia Ribbon Collar",  image: "assets/gift-camellia-ribbon-collar.png" },
  { id: "papillon-choker",         name: "Papillon Choker",          image: "assets/gift-papillon-choker.png" },
  { id: "papillon-pearl-collar",   name: "Papillon Pearl Collar",    image: "assets/gift-papillon-pearl-collar.png" },
  { id: "rosette-pearl-collar",    name: "Rosette Pearl Collar",     image: "assets/gift-rosette-pearl-collar.png" },
];

/* ──────────────────────────────────────────────────────────────────
   TYPOGRAPHY — special character replacements
   ────────────────────────────────────────────────────────────────── */

const copy = {
  Malena:  "Mal\u00e8na",
  Lumiere: "Lumi\u00e8re",
  Soiree:  "Soir\u00e9e",
  Echelon: "\u00c9chelon",
  Elan:    "\u00c9lan",
  Etoile:  "\u00c9toile",
  Vendome: "Vend\u00f4me",
};

const formatName = (name) =>
  Object.entries(copy).reduce(
    (value, [plain, styled]) => value.replace(plain, styled),
    name
  );

/* ──────────────────────────────────────────────────────────────────
   CURRENCY — Australian Dollars
   ────────────────────────────────────────────────────────────────── */

const money = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

/* ──────────────────────────────────────────────────────────────────
   DOM SELECTORS
   ────────────────────────────────────────────────────────────────── */

const sel = {
  header:          document.querySelector("[data-header]"),
  productGrid:     document.querySelector("[data-products]"),
  cartPanel:       document.querySelector("[data-cart-panel]"),
  cartItems:       document.querySelector("[data-cart-items]"),
  cartEmpty:       document.querySelector("[data-cart-empty]"),
  cartCount:       document.querySelector("[data-cart-count]"),
  giftPanel:       document.querySelector("[data-gift-panel]"),
  giftOptions:     document.querySelector("[data-gift-options]"),
  giftNote:        document.querySelector("[data-gift-note]"),
  subtotal:        document.querySelector("[data-subtotal]"),
  shipping:        document.querySelector("[data-shipping]"),
  total:           document.querySelector("[data-total]"),
  checkoutOpen:    document.querySelector("[data-checkout-open]"),
  checkoutItems:   document.querySelector("[data-checkout-items]"),
  checkoutTotal:   document.querySelector("[data-checkout-total]"),
  placeOrder:      document.querySelector("[data-place-order]"),
  orderLabel:      document.querySelector("[data-order-label]"),
  spinner:         document.querySelector("[data-spinner]"),
  stripeError:     document.getElementById("stripe-error"),
  confirmCopy:     document.querySelector("[data-confirmation-copy]"),
  nameInput:       document.querySelector("input[name='name']"),
  emailInput:      document.querySelector("input[name='email']"),
};

/* ──────────────────────────────────────────────────────────────────
   CART STATE
   ────────────────────────────────────────────────────────────────── */

let cart = JSON.parse(localStorage.getItem("mianju-cart") || "[]");
let selectedGift = localStorage.getItem("mianju-gift") || complimentaryGifts[0].id;

const saveCart = () => localStorage.setItem("mianju-cart", JSON.stringify(cart));
const saveGift = () => localStorage.setItem("mianju-gift", selectedGift);

const getSubtotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const getShipping = () => (getSubtotal() === 0 ? 0 : 7.90);
const getTotal    = () => getSubtotal() + getShipping();
const currentGift = () => complimentaryGifts.find((g) => g.id === selectedGift);

/* ──────────────────────────────────────────────────────────────────
   RENDER PRODUCTS
   ────────────────────────────────────────────────────────────────── */

const COLOUR_HEX = { White: "#f5f3ef", Black: "#111111", Pink: "#e8b4b8" };

const GROUP_LABELS = {
  "atelier-dress":   "Occasion",
  "malena-dress":    "Occasion",
  "perla-dress":     "Occasion",
  "lumiere-dress":   "Occasion",
  "magnolia-dress":  "Soft Occasion",
  "camellia-set":    "Soft Occasion",
  "seraphina-dress": "Soft Occasion",
  "soiree-dress":    "Soft Occasion",
  "solace-dress":    "Everyday",
  "aveline-top":     "Everyday",
  "echelon-top":     "Everyday",
  "poise-top":       "Everyday",
  "elan-trouser":    "Bottoms",
  "opaline-skirt":   "Bottoms",
  "odette-skirt":    "Bottoms",
  "moonveil-shorts": "Foundations",
  "velour-shorts":   "Foundations",
};

const renderProducts = () => {
  let lastGroup = null;
  sel.productGrid.innerHTML = products
    .map((product, index) => {
      const hasSizes  = product.sizes.length > 0;
      const isOneSize = hasSizes && product.sizes[0] === "One Size";

      const sizeControls = !hasSizes
        ? `<span class="size-tbd">Sizing coming soon</span>`
        : isOneSize
          ? `<span class="size-one">One Size</span>
             <input type="radio" name="size-${product.id}" value="One Size" checked style="display:none">`
          : product.sizes.map((size, i) => `
              <label class="size-label">
                <input type="radio" name="size-${product.id}" value="${size}" ${i === 0 ? "checked" : ""}>
                <span>${size}</span>
              </label>`).join("");

      const sizeRow = `
        <div class="size-row">
          ${sizeControls}
          ${product.sizeNote
            ? `<button type="button" class="size-info-btn" data-size-info="${product.id}" aria-label="Size guide for ${formatName(product.name)}">i</button>`
            : ""}
        </div>`;

      const colourRow = product.colours && product.colours.length
        ? `<div class="colour-row">
             ${product.colours.map((c, i) => `
               <label class="colour-label" title="${c}">
                 <input type="radio" name="colour-${product.id}" value="${c}" ${i === 0 ? "checked" : ""}>
                 <span class="colour-swatch" style="background:${COLOUR_HEX[c] || "#ccc"}" aria-label="${c}"></span>
               </label>`).join("")}
           </div>`
        : "";

      const priceHTML = product.originalPrice
        ? `<div class="product-price-wrap">
             <strong class="product-price">${money.format(product.price)}</strong>
             <s class="product-price-original">${money.format(product.originalPrice)}</s>
           </div>`
        : `<strong class="product-price">${money.format(product.price)}</strong>`;

      const group = GROUP_LABELS[product.id];
      let groupHeader = "";
      if (group && group !== lastGroup) {
        groupHeader = `<div class="collection-group-heading" data-group="${group}"><span>${group}</span></div>`;
        lastGroup = group;
      }

      return `${groupHeader}
        <article class="product reveal" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
          <figure class="product-image" style="--image: url('${product.image}'); --position: ${product.position};">
            <span class="product-index">${String(index + 1).padStart(2, "0")}</span>
          </figure>
          <div class="product-body">
            <div class="product-meta">
              <p class="product-category">${product.category}</p>
              <h3 class="product-name">${formatName(product.name)}</h3>
              <p class="product-description">${product.description || ""}</p>
            </div>
            <div class="product-fabric">
              <button type="button" class="fabric-toggle" aria-expanded="false">
                <span>Fabric &amp; Care</span>
                <svg class="fabric-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </button>
              <div class="fabric-body" hidden>
                <p class="fabric-material">100% Polyester</p>
                <ul class="fabric-care">
                  <li>Hand wash cold (30°C)</li>
                  <li>Do not bleach</li>
                  <li>Do not tumble dry</li>
                  <li>Line dry in shade</li>
                  <li>Cool iron if needed</li>
                  <li>Dry cleanable</li>
                </ul>
              </div>
            </div>
            <div class="product-footer">
              ${priceHTML}
              ${colourRow}
              ${sizeRow}
              <button type="button" class="product-add-btn" data-add
                ${!hasSizes ? "disabled" : ""}>
                ${!hasSizes ? "Coming soon" : "Add to bag"}
              </button>
            </div>
          </div>
        </article>`;
    })
    .join("");

  sel.productGrid.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  sel.productGrid.querySelectorAll(".fabric-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const body     = btn.nextElementSibling;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      body.hidden = expanded;
    });
  });
};

/* ──────────────────────────────────────────────────────────────────
   RENDER CART
   ────────────────────────────────────────────────────────────────── */

const renderCart = () => {
  if (!selectedGift || !complimentaryGifts.find((g) => g.id === selectedGift)) {
    selectedGift = complimentaryGifts[0].id;
  }

  sel.cartItems.innerHTML = cart
    .map((item) => {
      const product    = products.find((p) => p.id === item.id);
      const thumbStyle = product ? `background-image:url('${product.image}')` : "";
      return `
        <div class="cart-line">
          <div class="cart-thumb" style="${thumbStyle}"></div>
          <div class="cart-line-body">
            <h3>${formatName(item.name)}</h3>
            <small>${item.size}${item.colour ? ` · ${item.colour}` : ""}</small>
            <div class="cart-line-bottom">
              <span class="cart-line-price">${money.format(item.price * item.quantity)}</span>
              <div class="quantity">
                <button type="button" data-decrease="${item.key}">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-increase="${item.key}">+</button>
              </div>
            </div>
            <button type="button" data-remove="${item.key}">Remove</button>
          </div>
        </div>`;
    })
    .join("");

  const gift    = currentGift();
  const giftLine = gift
    ? `<div class="review-line gift-review-line">
         <span>Gift: ${gift.name}</span>
         <strong>Complimentary</strong>
       </div>`
    : "";

  sel.checkoutItems.innerHTML = cart
    .map((item) => `
      <div class="review-line">
        <span>${item.quantity} × ${formatName(item.name)} <span style="opacity:0.6;font-size:0.8em">(${item.size}${item.colour ? ` · ${item.colour}` : ""})</span></span>
        <strong>${money.format(item.price * item.quantity)}</strong>
      </div>`)
    .join("") + giftLine;

  sel.giftPanel.classList.remove("is-locked");
  sel.giftNote.textContent = "Choose your complimentary accessory — included with every order.";

  sel.giftOptions.innerHTML = complimentaryGifts
    .map((g) => `
      <label class="gift-option">
        <input type="radio" name="complimentary-gift" value="${g.id}"
          ${selectedGift === g.id ? "checked" : ""}>
        <img src="${g.image}" alt="${g.name}" class="gift-thumb" />
        <strong>${g.name}</strong>
        <span>Complimentary</span>
      </label>`)
    .join("");

  sel.cartEmpty.hidden          = cart.length > 0;
  sel.cartCount.textContent     = cart.reduce((sum, item) => sum + item.quantity, 0);
  sel.subtotal.textContent      = money.format(getSubtotal());
  sel.shipping.textContent      = getShipping() === 0 ? "A$0.00" : "A$7.90";
  sel.total.textContent         = money.format(getTotal());
  sel.checkoutTotal.textContent = money.format(getTotal());
  sel.checkoutOpen.disabled     = cart.length === 0;

  saveCart();
  saveGift();
};

/* ──────────────────────────────────────────────────────────────────
   CART OPEN / CLOSE
   ────────────────────────────────────────────────────────────────── */

const openCart = () => {
  document.body.classList.add("cart-open");
  sel.cartPanel.setAttribute("aria-hidden", "false");
};

const closeCart = () => {
  document.body.classList.remove("cart-open");
  sel.cartPanel.setAttribute("aria-hidden", "true");
};

/* ──────────────────────────────────────────────────────────────────
   ADD / UPDATE CART
   ────────────────────────────────────────────────────────────────── */

const addToCart = (productCard) => {
  const checkedInput = productCard.querySelector("input[type='radio'][name^='size-']:checked");
  if (!checkedInput) return;
  const size    = checkedInput.value;
  const colourInput = productCard.querySelector("input[type='radio'][name^='colour-']:checked");
  const colour  = colourInput ? colourInput.value : "";
  const key     = `${productCard.dataset.id}-${size}${colour ? `-${colour}` : ""}`;
  const existing = cart.find((item) => item.key === key);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key,
      id:       productCard.dataset.id,
      name:     productCard.dataset.name,
      price:    Number(productCard.dataset.price),
      size,
      colour,
      quantity: 1,
    });
  }

  renderCart();
  openCart();
};

const updateQuantity = (key, delta) => {
  const item = cart.find((line) => line.key === key);
  if (!item) return;
  item.quantity += delta;
  cart = cart.filter((line) => line.quantity > 0);
  renderCart();
};

/* ──────────────────────────────────────────────────────────────────
   STRIPE PAYMENT INTEGRATION
   ────────────────────────────────────────────────────────────────── */

let stripe         = null;
let stripeElements = null;
let paymentElement = null;

const initStripe = async () => {
  const amountCents = Math.round(getTotal() * 100);
  if (amountCents === 0) return;

  if (!stripe) {
    if (typeof Stripe === "undefined") {
      showStripeError("Stripe.js failed to load. Please refresh the page.");
      return;
    }
    stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
  }

  if (paymentElement) {
    paymentElement.unmount();
    paymentElement = null;
    stripeElements = null;
  }

  try {
    const response = await fetch(PAYMENT_INTENT_ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ amount: amountCents, currency: "aud" }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const { clientSecret } = await response.json();

    stripeElements = stripe.elements({
      clientSecret,
      appearance: {
        theme: "flat",
        variables: {
          colorPrimary:    "#111111",
          colorBackground: "#ffffff",
          colorText:       "#111111",
          colorDanger:     "#991b1b",
          fontFamily:      "Cormorant Garamond, serif",
          spacingUnit:     "4px",
          borderRadius:    "0px",
        },
      },
    });

    paymentElement = stripeElements.create("payment");
    paymentElement.mount("#stripe-payment-element");

  } catch (err) {
    showStripeError(`Payment setup failed: ${err.message}`);
  }
};

const showStripeError  = (msg) => { sel.stripeError.textContent = msg; sel.stripeError.hidden = false; };
const clearStripeError = ()    => { sel.stripeError.textContent = "";  sel.stripeError.hidden = true;  };

const validateDeliveryFields = () => {
  const fields = document.querySelectorAll(".checkout-fields input[required]");
  let valid = true;
  fields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.outline = "1px solid #991b1b";
      valid = false;
    } else {
      field.style.outline = "";
    }
  });
  return valid;
};

const handlePlaceOrder = async () => {
  clearStripeError();

  if (!validateDeliveryFields()) {
    showStripeError("Please complete all delivery fields before placing your order.");
    return;
  }

  if (!stripeElements) {
    showStripeError("Payment is not ready. Please wait a moment and try again.");
    return;
  }

  sel.orderLabel.textContent = "Processing…";
  sel.spinner.hidden         = false;
  sel.placeOrder.disabled    = true;

  const name  = sel.nameInput?.value.trim()  || "";
  const email = sel.emailInput?.value.trim() || "";

  const { error, paymentIntent } = await stripe.confirmPayment({
    elements: stripeElements,
    confirmParams: {
      payment_method_data: {
        billing_details: { name, email },
      },
      return_url: window.location.href,
    },
    redirect: "if_required",
  });

  sel.orderLabel.textContent = "Pay now";
  sel.spinner.hidden         = true;
  sel.placeOrder.disabled    = false;

  if (error) {
    showStripeError(error.message);
    return;
  }

  if (paymentIntent && paymentIntent.status === "succeeded") {
    const orderId  = `MJ-${Date.now().toString().slice(-6)}`;
    const gift     = currentGift();
    const giftText = gift ? ` Your complimentary gift, ${gift.name}, is included.` : "";

    sel.confirmCopy.textContent =
      `Order ${orderId} has been placed for ${money.format(getTotal())}. ` +
      `A confirmation has been sent to ${email}.${giftText}`;

    cart         = [];
    selectedGift = complimentaryGifts[0].id;
    renderCart();

    if (paymentElement) { paymentElement.unmount(); paymentElement = null; }

    document.body.classList.remove("checkout-open");
    document.body.classList.add("confirmation-open", "is-locked");
  }
};

/* ──────────────────────────────────────────────────────────────────
   SCROLL — HEADER + PARALLAX
   ────────────────────────────────────────────────────────────────── */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;

const updateHeader = () =>
  sel.header.classList.toggle("is-scrolled", window.scrollY > 24);

const updateParallax = () => {
  if (reduceMotion.matches) { ticking = false; return; }

  const vh = window.innerHeight || 1;
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    const speed    = Number(el.dataset.parallax) || 0.1;
    const progress = (rect.top - vh / 2) / vh;
    el.style.transform = `translate3d(0, ${progress * speed * -100}px, 0) scale(1.03)`;
  });

  ticking = false;
};

const requestFrame = () => {
  updateHeader();
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
};

/* ──────────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER — scroll reveal
   ────────────────────────────────────────────────────────────────── */

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
);

document.querySelectorAll(".reveal:not([data-products] .reveal)").forEach((el) =>
  revealObserver.observe(el)
);

/* ──────────────────────────────────────────────────────────────────
   SIZE GUIDE POPOVER
   ────────────────────────────────────────────────────────────────── */

sel.productGrid.addEventListener("click", (e) => {
  const infoBtn = e.target.closest("[data-size-info]");
  if (!infoBtn) return;

  document.querySelectorAll(".size-guide-popover").forEach((el) => el.remove());

  const id      = infoBtn.dataset.sizeInfo;
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const isOneSize = product.sizes[0] === "One Size";
  const sizeRows  = isOneSize
    ? `<li class="sgp-size-item">One Size</li>`
    : product.sizes.map((s) => `<li class="sgp-size-item">${s}</li>`).join("");

  const pop = document.createElement("div");
  pop.className = "size-guide-popover";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", `Size guide: ${formatName(product.name)}`);
  pop.innerHTML = `
    <div class="sgp-head">
      <p class="sgp-title">${formatName(product.name)}</p>
      <button class="sgp-close" aria-label="Close size guide">&times;</button>
    </div>
    <ul class="sgp-sizes">${sizeRows}</ul>
    ${product.sizeNote ? `<p class="sgp-note">${product.sizeNote}</p>` : ""}
  `;

  infoBtn.closest(".product-footer").appendChild(pop);
  pop.querySelector(".sgp-close").addEventListener("click", () => pop.remove());

  setTimeout(() => {
    document.addEventListener("click", function dismiss(ev) {
      if (!pop.contains(ev.target) && ev.target !== infoBtn) {
        pop.remove();
        document.removeEventListener("click", dismiss);
      }
    });
  }, 0);
});

/* ──────────────────────────────────────────────────────────────────
   INITIALISE
   ────────────────────────────────────────────────────────────────── */

renderProducts();
renderCart();
updateHeader();
updateParallax();
document.body.classList.add("is-loaded");

/* ──────────────────────────────────────────────────────────────────
   EVENT LISTENERS
   ────────────────────────────────────────────────────────────────── */

sel.productGrid.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) addToCart(add.closest(".product"));
});

sel.cartItems.addEventListener("click", (e) => {
  const increase = e.target.closest("[data-increase]");
  const decrease = e.target.closest("[data-decrease]");
  const remove   = e.target.closest("[data-remove]");

  if (increase) updateQuantity(increase.dataset.increase, 1);
  if (decrease) updateQuantity(decrease.dataset.decrease, -1);
  if (remove) {
    cart = cart.filter((item) => item.key !== remove.dataset.remove);
    renderCart();
  }
});

sel.giftOptions.addEventListener("change", (e) => {
  const input = e.target.closest("input[name='complimentary-gift']");
  if (!input) return;
  selectedGift = input.value;
  renderCart();
});

document.querySelectorAll("[data-cart-open]").forEach((btn) =>
  btn.addEventListener("click", openCart)
);
document.querySelectorAll("[data-cart-close]").forEach((btn) =>
  btn.addEventListener("click", closeCart)
);

sel.checkoutOpen.addEventListener("click", () => {
  if (!cart.length) return;
  closeCart();
  clearStripeError();
  renderCart();
  document.body.classList.add("checkout-open", "is-locked");
  setTimeout(initStripe, 320);
});

document.querySelector("[data-checkout-close]").addEventListener("click", () => {
  document.body.classList.remove("checkout-open", "is-locked");
});

sel.placeOrder.addEventListener("click", handlePlaceOrder);

document.querySelector("[data-confirmation-close]").addEventListener("click", () => {
  document.body.classList.remove("confirmation-open", "is-locked");
  document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", requestFrame, { passive: true });
window.addEventListener("resize", requestFrame);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    closeSizeGuide();
    document.body.classList.remove("checkout-open", "confirmation-open", "is-locked");
  }
});

/* ──────────────────────────────────────────────────────────────────
   SIZE GUIDE MODAL
   ────────────────────────────────────────────────────────────────── */

const sgModal    = document.getElementById("size-guide-modal");
const sgBackdrop = document.getElementById("sg-backdrop");
const sgClose    = document.getElementById("sg-close");
const sgNavOpen  = document.getElementById("sg-nav-open");

const openSizeGuide  = () => {
  if (!sgModal) return;
  sgModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("size-guide-open", "is-locked");
};

const closeSizeGuide = () => {
  if (!sgModal) return;
  sgModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("size-guide-open", "is-locked");
};

if (sgNavOpen)  sgNavOpen.addEventListener("click", openSizeGuide);
if (sgClose)    sgClose.addEventListener("click", closeSizeGuide);
if (sgBackdrop) sgBackdrop.addEventListener("click", closeSizeGuide);
