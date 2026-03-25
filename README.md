# ♿ Section 508 Accessibility Testing Framework

An automated accessibility testing framework built with Playwright and axe-core, designed to validate federal government websites against Section 508 and WCAG 2.1 compliance standards.

## 🌐 Live Demo
👉 **[View Interactive Demo](https://fullardlamar.github.io/section508-accessibility)**

## 📊 Test Results
![Tests](https://img.shields.io/badge/tests-12%20passing-brightgreen)
![Section 508](https://img.shields.io/badge/Section%20508-Compliant%20Testing-blue)
![WCAG](https://img.shields.io/badge/WCAG%202.1-AA-green)
![CI/CD](https://img.shields.io/badge/CI%2FCD-passing-brightgreen)

## 🎯 What This Project Does
This framework automatically scans federal government websites for accessibility violations and generates detailed reports mapped to specific Section 508 and WCAG 2.1 success criteria.

## ♿ Accessibility Test Coverage
| Test | WCAG Criteria | Section 508 | Description |
|------|--------------|-------------|-------------|
| Page Load Validation | 1.1 | 1194.22(a) | Verifies page loads correctly |
| Full Accessibility Scan | Multiple | Multiple | Complete axe-core violation scan |
| Image Alt Text | 1.1.1 | 1194.22(a) | Images must have text alternatives |
| Landmark Regions | 1.3.1 | 1194.22(n) | Page must have proper structure |
| Keyboard Navigation | 2.1.1 | 1194.22(a) | All functions keyboard accessible |
| Page Language | 3.1.1 | 1194.22(i) | Page language must be declared |

## 🏛️ Sites Tested
- **USA.gov** — Primary federal government portal
- **Army.mil** — Department of the Army website

## 🔧 Tech Stack
| Tool | Purpose |
|------|---------|
| Playwright | Browser automation |
| axe-core | Accessibility scanning engine |
| JavaScript | Primary language |
| GitHub Actions | CI/CD pipeline |

## ⚙️ Installation
```bash
git clone https://github.com/fullardlamar/section508-accessibility.git
cd section508-accessibility
npm install
npx playwright install chromium
```

## 🚀 Running Tests
```bash
npx playwright test --reporter=list
```

## 📋 Federal Standards Referenced
- **Section 508** — Rehabilitation Act requiring federal IT accessibility
- **WCAG 2.1 Level AA** — Web Content Accessibility Guidelines
- **ARIA** — Accessible Rich Internet Applications specification
- **DHS Trusted Tester** — Department of Homeland Security testing methodology

## 🔒 Why This Matters for DoD
All DoD and federal agency software must comply with Section 508. Failure to comply can result in legal action and loss of federal funding. This framework automates the testing process ensuring continuous compliance monitoring.

## 👤 Author
**Lamar Fullard** | QA Automation Engineer
- 🔗 [GitHub](https://github.com/fullardlamar)
- 🔗 [LinkedIn](https://www.linkedin.com/in/lamar-fullard-aa7000118)
- 🌐 [Portfolio](https://fullardlamar.github.io)
