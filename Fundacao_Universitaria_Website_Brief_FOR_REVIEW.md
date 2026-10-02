# Fundação Universitária Website Brief

**Document status:** FOR_REVIEW  
**Prepared for:** Fundação Universitária  
**Prepared by:** AI Solutions Architecture  
**Date:** 2 October 2026  
**Reference website:** African Unique — https://africanunique.com/

---

## 1. Business problem

The Fundação Universitária needs a public website that makes projects led by or involving **women and young people across Mozambique** easy to discover.

The website must allow visitors to:

- find projects by province;
- understand what each project offers;
- view agricultural and food products with images and prices;
- discover both products and services;
- contact or enquire about a project.

The website is therefore a **national project and product showcase/directory**, not automatically an online checkout platform.

---

## 2. Locked scope

### 2.1 Geographic coverage

The site will provide access to all Mozambique geographic entries:

1. Cabo Delgado
2. Gaza
3. Inhambane
4. Manica
5. Maputo Province
6. Cidade de Maputo
7. Nampula
8. Niassa
9. Sofala
10. Tete
11. Zambézia

Cidade de Maputo is represented separately from Maputo Province so that projects can be located accurately.

### 2.2 People and project focus

The directory will cover:

- women-led projects;
- youth-led projects;
- projects supporting women and youth;
- projects that sell products;
- projects that provide services;
- mixed projects where both products and services are offered.

### 2.3 Product focus

Agricultural and food products must be displayed with:

- product image;
- product name;
- project or producer name;
- province;
- unit or pack size, where provided;
- price in Mozambican Metical (MZN), where provided;
- availability/status, where provided;
- contact or enquiry action.

No price, quantity, production capacity, certification, or availability claim should be invented. Missing information must be shown as “Preço sob consulta” or omitted until supplied and approved.

### 2.4 Brand direction

- Predominant colour: green.
- Green direction is based on the Fundação Universitária identity.
- The attached identity image shows the name **“Fundação Universitária”** in dark green below a circular green-and-yellow emblem.
- The final design should use the logo supplied by the foundation in the correct approved format.
- The design should remain clean, welcoming, credible, and community-oriented.

### 2.5 Language

- Primary language: Portuguese for Mozambique.
- English version: recommended for the MVP if approved content and translation capacity are available.
- Portuguese is the authoritative content version.

---

## 3. Website objective

### Primary objective

Help a visitor find a relevant project, product, or service in a specific province and make contact.

### Secondary objectives

- increase visibility for women and young entrepreneurs;
- show the geographic reach of the foundation’s work;
- provide a credible public showcase for partners and supporters;
- make agricultural products easier to discover;
- create a structured foundation for future project registration and content updates.

### Desired visitor action

The main call to action is:

> **Encontrar um projecto** / **Find a project**

Secondary calls to action:

- **Ver produtos** — View products
- **Ver serviços** — View services
- **Explorar por província** — Explore by province
- **Contactar projecto** — Contact project
- **Submeter projecto** — Submit a project, only if the foundation approves this workflow

---

## 4. Proposed information architecture

### 4.1 Home page

1. Header with Fundação Universitária logo
2. Main statement and introduction
3. Main actions:
   - Explorar por província
   - Ver projectos de mulheres
   - Ver projectos de jovens
4. Province selector/grid
5. Featured agricultural products
6. Featured projects
7. Browse by type:
   - Agricultura e alimentos
   - Comércio
   - Serviços
   - Artesanato e produtos culturais
   - Other categories approved by the foundation
8. “Como funciona” section:
   - Explore
   - Choose
   - Contact
9. Foundation introduction
10. Contact/footer

### 4.2 Province directory page

Example: `/provincias/nampula`

The page must contain:

- province name and short introduction;
- number of listed projects, if reliable;
- filters for Women, Youth, All;
- filters for Products, Services, All;
- category filter;
- project/product cards;
- contact action;
- empty-state message if no approved listings exist.

### 4.3 Project detail page

Example: `/projectos/nome-do-projecto`

Each project page may include:

- project name;
- province and locality;
- women/youth classification;
- project description;
- products;
- services;
- product images;
- prices;
- contact details or enquiry form;
- social media or website links, if approved;
- project/gallery images, if publication rights are confirmed.

### 4.4 Product detail page or expanded product card

The MVP may use expanded cards instead of separate product pages. Each agricultural product must still provide:

- image;
- name;
- unit/size;
- price;
- producer/project;
- province;
- enquiry/contact action.

### 4.5 About page

Content to be supplied and approved by the foundation:

- foundation mission;
- who the foundation supports;
- geographic reach;
- programmes or areas of work;
- partners, if publication is approved;
- contact information.

### 4.6 Contact page

Minimum content:

- official email;
- official telephone/WhatsApp, if approved;
- location/address, if approved;
- general enquiry form;
- privacy notice for submitted information.

### 4.7 Optional submission page

**Not included in the locked MVP unless approved.**

Future function: women, young people, or project coordinators submit a project for review. All submissions must enter an approval process before appearing publicly.

---

## 5. Homepage content direction

### Proposed Portuguese hero copy

**Descubra projectos de mulheres e jovens em Moçambique**

Explore produtos, serviços e iniciativas locais de todas as províncias — de Maputo a Cabo Delgado.

**Primary CTA:** Explorar por província  
**Secondary CTA:** Ver produtos

This is proposed interface copy and requires foundation approval before publication.

### Proposed supporting statement

A Fundação Universitária dá visibilidade a projectos, produtos e serviços desenvolvidos por mulheres e jovens em diferentes comunidades de Moçambique.

This statement must be confirmed against the foundation’s official mandate before publication.

---

## 6. Core data model

The website should be driven by structured records rather than manually duplicated page text.

### 6.1 Project record

- Project ID
- Project name
- Short description
- Full description
- Province
- District/locality
- Project type: Women / Youth / Women and Youth / Other approved value
- Categories
- Products
- Services
- Contact name or organisation
- Phone/WhatsApp
- Email
- Social links
- Images
- Publication status
- Last verified date

### 6.2 Product record

- Product ID
- Project ID
- Product name
- Product category
- Agricultural/food classification
- Description
- Image
- Unit or pack size
- Price
- Currency: MZN
- Availability
- Location
- Contact action
- Price last updated
- Publication approval

### 6.3 Service record

- Service ID
- Project ID
- Service name
- Description
- Category
- Location
- Price or “Preço sob consulta”
- Image, if relevant
- Contact action
- Publication approval

---

## 7. Search, filter, and discovery requirements

The visitor must be able to browse using:

- province;
- women/youth/all;
- products/services/all;
- category;
- keyword search, if the dataset is large enough;
- featured/latest listings, only where dates are reliable.

The site must work on mobile first because many visitors and project owners may access it through mobile devices.

---

## 8. Contact model for the MVP

The MVP will use a **contact/enquiry model**, not online checkout.

Recommended actions:

- WhatsApp link, where an official number is supplied;
- telephone link;
- email enquiry;
- website contact form for general foundation enquiries.

The website will not include the following unless separately approved:

- online payment;
- shopping cart;
- delivery management;
- stock management;
- automatic order confirmation;
- seller accounts;
- public self-registration.

---

## 9. Visual direction

### Design principles

- Green-led palette derived from the logo.
- White space and strong readability.
- Authentic photography of products and communities.
- Clear province navigation.
- Large touch targets for mobile users.
- Product cards with image, name, price, and location.
- Human and institutional tone: credible but not bureaucratic.
- No excessive animation or complicated effects.

### Reference influence

Inspired by African Unique’s:

- image-led product cards;
- category browsing;
- featured selection sections;
- marketplace-style discovery experience.

The implementation must be original and adapted to Fundação Universitária. It must not copy African Unique’s branding, text, images, layout, or proprietary assets.

### Colour starting point

The designer should derive final colour tokens from the approved logo file. Until the brand palette is formally supplied:

- primary: dark institutional green;
- secondary: medium/natural green;
- accent: logo yellow, used sparingly;
- background: white and very light neutral green;
- text: dark neutral, not green-only.

---

## 10. Content and governance rules

- Only approved project, product, service, price, contact, and partner information may be published.
- Every product image must have a confirmed source and publication permission.
- Agricultural product images should represent the actual product whenever possible.
- Do not use generic stock images as if they depict a beneficiary or project.
- Prices must include the unit or pack size when available.
- Display “Preço sob consulta” when no approved price is available.
- Each price should have a last-updated date in the content-management source, even if that date is not displayed publicly.
- Project owners must not be described as beneficiaries, partners, producers, or sellers unless the foundation confirms the wording.
- Sensitive personal data must not be published without an approved basis and consent.
- The website must include a clear process for correcting or removing outdated project information.

---

## 11. MVP acceptance criteria

The MVP is accepted when:

- the Fundação Universitária logo is displayed correctly;
- the site is visibly green-led and responsive;
- all 11 geographic entries are accessible;
- a visitor can filter or browse projects by province;
- women/youth project classification is visible where supplied;
- agricultural products can display images, names, units, and MZN prices;
- services can be listed separately from products;
- each listing has a contact/enquiry action where contact data is approved;
- the homepage explains the purpose of the directory;
- the site includes an About and Contact area;
- Portuguese content is complete for all published pages;
- English content is either complete and approved or intentionally excluded from the first release;
- the site works on current mobile and desktop browsers;
- no unapproved facts, images, prices, or personal contact details are published;
- the foundation can provide corrections and updates through an agreed content process.

---

## 12. Content required from Fundação Universitária

To populate the site, the foundation must provide:

1. approved logo files, preferably SVG and PNG;
2. official foundation name and short description;
3. official mission/about text;
4. official contact details;
5. approved list of projects;
6. project province and locality;
7. project classification: women, youth, or both;
8. products and services offered by each project;
9. product images and image permissions;
10. approved prices and units;
11. project contact method;
12. partner names/logos, if they should be shown;
13. privacy/contact-form requirements;
14. decision on whether English is included in the first release.

---

## 13. Explicit exclusions from this brief

The following are not assumed:

- e-commerce checkout;
- payment processing;
- delivery/logistics;
- inventory synchronisation;
- automatic price updates;
- public project self-registration;
- user accounts;
- a donor reporting portal;
- a mobile app;
- a full CRM.

These can be considered as later phases if the directory produces sufficient value and the foundation has the operating capacity to maintain them.

---

## 14. Recommended implementation sequence

### Phase 1 — Content and design foundation

- confirm logo and brand colours;
- approve homepage message;
- create the project/product data template;
- collect the first approved listings;
- design homepage and province directory.

### Phase 2 — Working MVP

- implement homepage;
- implement province navigation;
- implement project/product/service cards;
- implement images, prices, filters, and contact actions;
- implement About and Contact pages;
- test mobile and desktop layouts.

### Phase 3 — Population and governance

- add approved projects from all geographic entries;
- verify image rights and contact details;
- establish price-update and correction process;
- publish the first release.

### Phase 4 — Future improvements

- controlled project submission;
- administrator dashboard;
- search analytics;
- featured campaigns;
- multilingual expansion;
- optional commerce or booking integrations, only after operational processes are defined.

---

## 15. Locked product decision

For this brief, the website is locked as:

> **A green, mobile-first, Portuguese-led national directory and showcase for Fundação Universitária projects involving women and young people in Mozambique, organised by province and displaying agricultural products with images and prices, alongside services and other offerings, with contact/enquiry actions rather than online checkout.**

Any change to this statement should be treated as a scope change.
