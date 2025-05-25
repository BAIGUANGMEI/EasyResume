import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { readFile } from 'fs/promises';
import url from 'url';
import path from 'path';

const generatePdf = async () => {
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

    // 从 JSON 文件读取数据，并加载 HTML 模板
    const data = JSON.parse(await readFile(path.resolve(__dirname, 'resume.json'), 'utf8'));
    const templateSrc = await readFile(path.resolve(__dirname, 'template.html'), 'utf8');

    // 编译模板并渲染数据
    const template = Handlebars.compile(templateSrc);
    const html = template(data);

    // 使用 Puppeteer 启动无头浏览器生成 PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: path.resolve(__dirname, 'output', 'resume.pdf'),
        format: 'a4',
        printBackground: true
    });
    await browser.close();
    console.log('PDF 已生成');
};

generatePdf();