import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a mobile device
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  const errors = [];
  
  page.on('pageerror', error => {
    errors.push(`[PageError] ${error.message}`);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[ConsoleError] ${msg.text()}`);
    }
  });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  console.log('Waiting for a few seconds to let animations run...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  if (errors.length > 0) {
    console.log('Errors found:');
    console.log(errors.join('\n'));
  } else {
    console.log('No errors found during load and initial animations.');
  }

  await browser.close();
})();
