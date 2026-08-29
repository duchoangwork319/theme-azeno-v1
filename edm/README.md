Here's the breakdown for all 3:

---

### 1. Post-delivery review + referral request

**Within Klaviyo only:**
- Trigger on `Fulfilled` order event from Shopify
- Delay 2–3 days after fulfillment
- Send review request email with in-email review collection block
- Display review widgets on your Shopify product pages

**Needs external server:**
- Generating unique referral codes per customer (unless you pre-generate and store them as profile properties via API)
- Pushing those codes back into Klaviyo as profile properties

---

### 2. Immediate post-subscribe promo

**Within Klaviyo only:**
- Trigger on `Subscribe` event from your Klaviyo form
- Send promo code immediately using a static or Klaviyo-generated coupon
- No Shopify or server dependency needed

**Needs external server:**
- Nothing required, unless you want dynamic or unique promo codes generated outside Klaviyo

---

### 3. Landing page subscribe + code

**Within Klaviyo only:**
- Trigger on `Subscribe` event filtered to a specific list or segment
- Send the code immediately after subscription
- Works fully if the landing page uses a Klaviyo-hosted form

**Needs external server:**
- If the landing page is external (not Klaviyo-hosted), you need a server to call Klaviyo's REST API to push the subscriber into the right list
- Browser-only is possible using Klaviyo's Client API for basic subscription, but server-side is safer and more reliable for list targeting