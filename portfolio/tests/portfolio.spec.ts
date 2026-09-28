import { test, expect } from "@playwright/test";
const cases = ["reclimb", "reduce-food-waste", "no-judge", "plantfun-explorer"];

test("five built pages: refresh, local images, desktop widths, readable sections", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of ["/", ...cases.map((c) => `/work/${c}`)]) {
    await page.goto(path);
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    // Open every archive so all images and long content are exercised.
    for (const details of await page.locator("details").all()) {
      if ((await details.getAttribute("open")) === null)
        await details.locator(":scope > summary").click();
    }
    await page.locator('img').evaluateAll(imgs => imgs.forEach(img => { (img as HTMLImageElement).loading = 'eager'; }));
    await expect.poll(() => page.locator('img').evaluateAll(imgs => imgs.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBeTruthy();
    for (const size of [
      { width: 1440, height: 900 },
      { width: 1100, height: 700 },
      { width: 900, height: 600 },
    ]) {
      await page.setViewportSize(size);
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
        )
        .toBeTruthy();
      for (const heading of await page.locator("h1,h2").all()) {
        const box = await heading.boundingBox();
        expect(box?.width).toBeGreaterThan(100);
      }
      if (size.width === 900) await page.screenshot({path: `test-results/${path === '/' ? 'home' : path.split('/').pop()}-narrow.png`, fullPage:true});
    }
    // Explicitly load lazy images and check every source in the built output.
    const sources = await page
      .locator("img")
      .evaluateAll((imgs) => [
        ...new Set(imgs.map((img) => (img as HTMLImageElement).src)),
      ]);
    for (const src of sources) {
      const response = await page.request.get(src);
      expect(response.ok(), src).toBeTruthy();
      expect(response.headers()["content-type"]).toMatch(/^image\//);
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({
      path: `test-results/${path === "/" ? "home" : path.split("/").pop()}-desktop.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});

test("navigation, language stays on current project, drawers, next project and browser back", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Reclimb", exact: true }).click();
  await expect(page).toHaveURL(/work\/reclimb$/);
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveURL(/work\/reclimb$/);
  const research = page
    .locator("details")
    .filter({ has: page.locator("summary", { hasText: "Research process" }) });
  await expect(research).toHaveAttribute("open", "");
  await research.locator("summary").click();
  await expect(research).not.toHaveAttribute("open", "");
  await research.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(research).toHaveAttribute("open", "");
  await page.getByRole("link", { name: "Next project", exact: true }).click();
  await expect(page).toHaveURL(/reduce-food-waste$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goBack();
  await expect(page).toHaveURL(/reclimb$/);
  await page
    .getByRole("link", { name: "← Back to selected work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#work$/);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/#about$/);
});

test("image dialog keyboard close restores focus and scrolling", async ({
  page,
}) => {
  await page.goto("/work/reclimb");
  const trigger = page.getByRole("button", { name: /查看大图/ }).first();
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("");
  await trigger.click();
  await page.getByRole("button", { name: "关闭", exact: true }).click();
  await expect(trigger).toBeFocused();
});

test("copy success and denied clipboard feedback; valid email links", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  await page.getByRole("button", { name: "复制邮箱" }).click();
  await expect(page.getByRole("status")).toHaveText("邮箱地址已复制。");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "jiachen.sun.design@gmail.com",
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("denied")) },
    });
  });
  await page.getByRole("button", { name: "复制邮箱" }).click();
  await expect(page.getByRole("status")).toContainText("未能复制");
  await expect(page.getByRole("link", { name: "发送邮件" })).toHaveAttribute(
    "href",
    "mailto:jiachen.sun.design@gmail.com",
  );
});

test("English first visit, missing route, image failure", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "en-US" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("http://127.0.0.1:4173/missing-page");
  await expect(
    page.getByRole("heading", { name: "This page could not be found" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Return home" }).click();
  await page.route("**/assets/images/reclimb-hero.png", (r) => r.abort());
  await page.reload();
  await page
    .getByRole("link", { name: "Reclimb", exact: true })
    .scrollIntoViewIfNeeded();
  await expect(
    page.getByText("Image unavailable", { exact: true }),
  ).toBeVisible();
  await context.close();
});
