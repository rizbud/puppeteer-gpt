import puppeteer, { PuppeteerLaunchOptions } from "puppeteer";

interface LaunchBrowserOptions extends PuppeteerLaunchOptions {
  /**
   * The width of the browser window. Default is `640`
   */
  width?: number;

  /**
   * The height of the browser window. Default is `480`
   */
  height?: number;

  /**
   * If `true`, the browser will be launched in headless mode. Default is `true`
   */
  incognito?: boolean;

  /**
   * If `true`, the browser will be launched in incognito mode. Default is `false`
   */
  lang?: string;
}

/**
 * Launch a puppeteer browser instance
 *
 * @param width  The width of the browser window. Default is `640`
 * @param height  The height of the browser window. Default is `480`
 * @param headless  If `true`, the browser will be launched in headless mode. Default is `true`
 * @param incognito  If `true`, the browser will be launched in incognito mode. Default is `false`
 * @param lang  The language of the browser. Default is `en-US`
 * @param args  Additional arguments to pass to the browser instance
 * @param options  Additional options to pass to the browser instance
 *
 * @returns The browser instance and the first page
 */
export const launchBrowser = async ({
  width = 640,
  height = 480,
  headless = true,
  incognito = false,
  lang = "en-US",
  args = [],
  ...options
}: LaunchBrowserOptions) => {
  const browser = await puppeteer.launch({
    headless,
    ignoreHTTPSErrors: true,
    timeout: 0,
    protocolTimeout: 0,
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-infobars",
      "--ignore-certificate-errors",
      "--ignore-certifcate-errors-spki-list",
      `--window-size=${width},${height}`,
      "--window-position=0,0",
      "--mute-audio",
      incognito ? "--incognito" : "",
      lang ? `--lang=${lang}` : "",
      ...args,
    ],
    ...options,
  });

  const [page] = await browser.pages();

  page.setDefaultNavigationTimeout(0);

  return {
    browser,
    page,
  };
};
