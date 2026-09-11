import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser for scroll test...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  const errors = [];
  page.on('pageerror', error => errors.push(`[PageError] ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[ConsoleError] ${msg.text()}`);
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  // Scroll through all sections
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => {
      document.querySelector('.overflow-y-scroll').scrollBy(0, window.innerHeight);
    });
    console.log(`Scrolled to section ${i+1}`);
    await new Promise(r => setTimeout(r, 1000));
  }
  
  if (errors.length > 0) {
    console.log('Errors found during scroll test:');
    console.log(errors.join('\n'));
  } else {
    console.log('No errors found during scroll test.');
  }

  await browser.close();
})();
