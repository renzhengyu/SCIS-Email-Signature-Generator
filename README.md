# SCIS Email Signature Generator

A lightweight, zero-dependency, single-page web application designed for **Shanghai Community International School (SCIS)** faculty and staff to generate standardized, compliant email signatures easily for Microsoft Outlook (Web, Mac, and Windows).

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![SCIS Brand Identity Guidelines Ver. 1.1 Compliant](https://img.shields.io/badge/SCIS%20Brand%20Guidelines-Ver.%201.1-13284B)
![GitHub Pages Compatible](https://img.shields.io/badge/GitHub%20Pages-Ready-brightgreen)
![License: Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg)

---

## 🌟 Key Features

- **Strict Compliance with SCIS Brand Identity Guidelines Ver. 1.1**:
  - **Typography**: `Gill Sans` font family (`font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif`).
  - **Font Sizes**: 10.5pt Bold for Name, 10pt Regular for details, 10pt Bold for School Name.
  - **Colors**: Black (`#000000`) for Name and School Name; Official Gray (**`#808285`**) for Job Title, Address, Phone, and Email/Website labels; SCIS Blue (`#0066cc`) for hyperlinks.
- **Campus Presets & Auto-fill**:
  - Automatically populates exact address and phone details for:
    - **Hongqiao Campus (Main / Systemwide)**: `1161 Hongqiao Road, Changning, Shanghai, China 200051` | `Phone: 86-21-6261-4338`
    - **Hongqiao ECE Campus**: `2212 Hongqiao Road, Changning, Shanghai, China 200336` | `Phone: 86-21-6295-1222`
    - **Pudong Campus**: `198 Hengqiao Road, Zhoupu, Pudong, Shanghai, China 201315` | `Phone: 86-21-5812-9888`
- **Smart Email Input**:
  - Automatically appends `@scis-china.org` if only a username (e.g. `llin`) is typed.
- **Telephone Extension Handling**:
  - Optional field. Formats seamlessly as `Phone: 86-21-XXXX-XXXX ext. 1234` when entered.
- **1-Click Outlook Ready Clipboard Copy**:
  - Uses native Rich Text Clipboard APIs with DOM range selection fallback to ensure perfect formatting when pasted into Outlook Web App, Outlook for Mac, or Outlook for Windows.
- **Built-in Setup Instructions**:
  - Includes step-by-step guides and links to official Microsoft documentation: [Microsoft Outlook Signature Guide](https://support.microsoft.com/en-us/outlook/mail/how-to-add-and-change-an-email-signature-in-outlook).
- **Privacy-focused Analytics**:
  - Embedded Umami Analytics integration for privacy-first tracking of page views and signature copy events.

---

## 📁 Repository Structure

```
├── .gitignore     # Git ignore patterns (.DS_Store, system files)
├── index.html     # Main Single-Page HTML template, Umami script & Outlook guides
├── styles.css     # SCIS Navy (#13284B) theme & responsive UI styling
├── app.js         # Generator logic, campus presets, & clipboard handling
├── README.md      # Documentation & deployment guide
└── LICENSE        # The Unlicense (Public Domain)
```

---

## ⚖️ License

This project is released into the public domain under **[The Unlicense](LICENSE)**.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software for any purpose, commercial or non-commercial, without requiring any attribution or acknowledgment.
