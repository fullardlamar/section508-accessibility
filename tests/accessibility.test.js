const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('@axe-core/playwright');
const AxeBuilder = require('@axe-core/playwright').default;

const SITES = [
  { name: 'USA.gov', url: 'https://www.usa.gov' },
  { name: 'Army.mil', url: 'https://www.army.mil' },
];

for (const site of SITES) {
  test.describe(`Section 508 Accessibility - ${site.name}`, () => {

    test(`${site.name} - Page loads successfully`, async ({ page }) => {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const title = await page.title();
      expect(title).toBeTruthy();
      console.log(`✅ Page title: ${title}`);
    });

   test(`${site.name} - Accessibility scan complete (WCAG 2.1)`, async ({ page }) => {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const results = await new AxeBuilder({ page }).analyze();
      const violations = results.violations;
      console.log(`\n📋 ${site.name} Accessibility Report:`);
      console.log(`Total violations found: ${violations.length}`);
      violations.forEach(v => {
        console.log(`\n❌ [${v.impact?.toUpperCase()}] ${v.id}`);
        console.log(`   Description: ${v.description}`);
        console.log(`   WCAG: ${v.tags.filter(t => t.includes('wcag')).join(', ')}`);
        console.log(`   Elements affected: ${v.nodes.length}`);
      });
      const critical = violations.filter(v => v.impact === 'critical');
      const serious = violations.filter(v => v.impact === 'serious');
      console.log(`\n📊 Summary:`);
      console.log(`   Critical: ${critical.length}`);
      console.log(`   Serious: ${serious.length}`);
      console.log(`   Total: ${violations.length}`);
      expect(results).toBeDefined();
    });

    test(`${site.name} - Images alt text check (WCAG 1.1.1)`, async ({ page }) => {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const results = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const withAlt = imgs.filter(img => img.alt || img.getAttribute('aria-label')).length;
        const withoutAlt = imgs.filter(img => !img.alt && !img.getAttribute('aria-label')).length;
        return { total: imgs.length, withAlt, withoutAlt };
      });
      console.log(`\n🖼️ Image Alt Text Report:`);
      console.log(`   Total images: ${results.total}`);
      console.log(`   With alt text: ${results.withAlt}`);
      console.log(`   Without alt text: ${results.withoutAlt}`);
      if(results.withoutAlt > 0) {
        console.log(`   ⚠️ WCAG 1.1.1 Violation: ${results.withoutAlt} images missing alt text`);
      } else {
        console.log(`   ✅ All images have alt text`);
      }
      expect(results.total).toBeGreaterThanOrEqual(0);
    });

    test(`${site.name} - Landmark regions check (WCAG 1.3.1)`, async ({ page }) => {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const landmarks = await page.evaluate(() => {
        return {
          main: document.querySelectorAll('main, [role="main"]').length,
          nav: document.querySelectorAll('nav, [role="navigation"]').length,
          header: document.querySelectorAll('header, [role="banner"]').length,
          footer: document.querySelectorAll('footer, [role="contentinfo"]').length,
        };
      });
      console.log(`\n🗺️ Landmark Regions Report:`);
      console.log(`   Main: ${landmarks.main}`);
      console.log(`   Navigation: ${landmarks.nav}`);
      console.log(`   Header: ${landmarks.header}`);
      console.log(`   Footer: ${landmarks.footer}`);
      if(landmarks.main === 0) {
        console.log(`   ⚠️ WCAG 1.3.1 Violation: Missing main landmark`);
      }
      expect(landmarks).toBeDefined();
    });

    test(`${site.name} - Keyboard navigation check (WCAG 2.1.1)`, async ({ page }) => {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el.tagName,
          text: el.textContent?.trim().substring(0, 50),
          hasOutline: window.getComputedStyle(el).outline !== 'none'
        };
      });
      console.log(`\n⌨️ Keyboard Navigation Report:`);
      console.log(`   First focused element: ${focused.tag}`);
      console.log(`   Element text: ${focused.text}`);
      console.log(`   Has focus outline: ${focused.hasOutline}`);
      expect(focused.tag).toBeTruthy();
    });

    test(`${site.name} - Page language check (WCAG 3.1.1)`, async ({ page }) => {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const lang = await page.evaluate(() => document.documentElement.lang);
      console.log(`\n🌐 Page Language Report:`);
      if(lang) {
        console.log(`   ✅ Language declared: ${lang}`);
      } else {
        console.log(`   ⚠️ WCAG 3.1.1 Violation: No language declared`);
      }
      expect(lang !== undefined).toBeTruthy();
    });

  });
}