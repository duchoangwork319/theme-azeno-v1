That warning appears because your emails aren't authenticated with your own domain yet. Here's what's happening and what to fix:

---

### Why Gmail shows that warning

By default, Klaviyo sends emails signed with its own shared domain (like `klaviyomail.com`). Gmail sees that the "From" address is your domain, but the email is actually signed by Klaviyo's domain — so it can't verify you as the sender and shows the warning.

---

### The fix: Set up a Branded Sending Domain

This is the main thing you need to do. It adds DKIM, SPF, and DMARC authentication under your own domain so Gmail can verify you.

**Steps:**

1. Go to **Settings > Email > Sending domains** in Klaviyo.
2. Click **Add sending domain**.
3. Enter your root domain (for example, `yourbusiness.com`) and choose a subdomain (for example, `send.yourbusiness.com`).
4. Klaviyo generates DNS records (CNAME or NS records) for you.
5. Add those records to your DNS host (your domain registrar, Cloudflare, and more).
6. Come back to Klaviyo and click **Verify** to confirm the records are live.

Once verified, your emails will be DKIM-signed by your own domain and the Gmail warning will go away.

---

### 3 authentication standards involved

| Standard | What it does |
|----------|-------------|
| **SPF** | Confirms the sending IP is authorized for your domain |
| **DKIM** | Adds a digital signature to verify the sender's identity |
| **DMARC** | Sets a policy for what happens when SPF/DKIM fail |

Setting up the branded sending domain in Klaviyo handles SPF and DKIM automatically. You may also want to add a DMARC record to your DNS separately.

---

### Verify it's working

After setup, send a test email to your Gmail and open the full email header. Look for:

```
dkim=pass
spf=pass
dmarc=pass
```

If all 3 pass, the warning will be gone.

The docs I drew on are **How to set up a branded sending domain** and [Troubleshooting branded sending domain issues](https://help.klaviyo.com/hc/en-us/articles/4417768780827).