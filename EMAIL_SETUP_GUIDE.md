# 📧 Email Setup Guide for Craft Gallery

## How to Receive Form Submissions via Email

Your website now uses **EmailJS** - a free service that sends emails directly from your website without needing a backend server.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Register with your email (the one where you want to receive messages)
4. Verify your email address

---

### Step 2: Add Email Service

1. After login, go to **"Email Services"** from the dashboard
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or any other
4. Click **"Connect Account"**
5. Follow the prompts to authorize EmailJS
6. Copy your **Service ID** (looks like: `service_abc1234`)

---

### Step 3: Create Email Template

1. Go to **"Email Templates"** from the dashboard
2. Click **"Create New Template"**
3. Use this template:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from Craft Gallery Contact Form
```

4. Click **"Save"**
5. Copy your **Template ID** (looks like: `template_xyz5678`)

---

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. Copy your **Public Key** (looks like: `aBcD123eFgH456`)

---

### Step 5: Update Your Website Code

Open your `script.js` file and replace these three values (around line 152):

```javascript
const SERVICE_ID = "service_abc1234";     // ← Replace with YOUR Service ID
const TEMPLATE_ID = "template_xyz5678";   // ← Replace with YOUR Template ID
const PUBLIC_KEY = "aBcD123eFgH456";      // ← Replace with YOUR Public Key
```

**Example:**
```javascript
const SERVICE_ID = "service_8k3h9j2";
const TEMPLATE_ID = "template_contact_form";
const PUBLIC_KEY = "XyZ9pQr3StU2vWx";
```

---

### Step 6: Test It!

1. Open your website
2. Fill the contact form
3. Click "Send Message"
4. Check your email inbox! 📬

---

## 📋 EmailJS Free Plan Limits

- ✅ **200 emails per month** (free forever)
- ✅ No credit card required
- ✅ Works on any website

If you need more than 200 emails/month, upgrade to a paid plan ($7-15/month).

---

## 🔧 Troubleshooting

### Problem: Emails not arriving

**Solution 1:** Check spam/junk folder
**Solution 2:** Verify all 3 IDs are correct in script.js
**Solution 3:** Check browser console (F12) for error messages

### Problem: "Failed to send" error

**Possible causes:**
- Wrong Service ID, Template ID, or Public Key
- Email service not connected properly
- Internet connection issue

### Problem: Template variables not working

Make sure your EmailJS template uses these exact variable names:
- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`
- `{{to_name}}`

---

## 🎨 Customize Email Template

You can customize what the email looks like in EmailJS dashboard:

**Subject line ideas:**
- `New Contact: {{from_name}}`
- `🎨 Gallery Inquiry from {{from_name}}`
- `Contact Form: {{message}}`

**Add auto-reply:**
In EmailJS, you can set up an automatic reply to the customer!

---

## 💡 Pro Tips

1. **Add reCAPTCHA** to prevent spam (optional)
2. **Create different templates** for different forms
3. **Track submissions** in EmailJS dashboard (Analytics tab)
4. **Set up auto-responses** to customers

---

## 🆘 Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: support@emailjs.com
- Video Tutorial: Search "EmailJS tutorial" on YouTube

---

## 📝 Quick Reference

| What | Where to Find It |
|------|------------------|
| Service ID | EmailJS → Email Services → Click your service |
| Template ID | EmailJS → Email Templates → Click your template |
| Public Key | EmailJS → Account → General |

---

**That's it!** Your contact form will now send emails directly to your inbox. 🎉

No server, no PHP, no complicated setup needed!
