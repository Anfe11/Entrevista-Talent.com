const puppeteer = require('puppeteer');

getListOffers = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	let jobs = [];

	await page.goto('https://zwangerpesiri.isolvedhire.com/jobs/');

	jobs = await page.evaluate(() => {
		var html_jobs = document.querySelectorAll(".list-group-item.strip-side-borders");
        var arrayJobs = [];

        for( var i in html_jobs){
        if (typeof html_jobs[i] == "function") continue;
        if (typeof html_jobs[i] == "number") continue;
        var temp = html_jobs[i];
        var job = {};
        job.title = temp.querySelector(".job-info h4").textContent;
        job.location = temp.querySelector(".listing-details li").textContent;
        job.url = temp.href;
        arrayJobs.push(job);
        }
        console.log (arrayJobs);
        return arrayJobs;
	});

	console.log(jobs);
	await browser.close();

	return jobs;
};

module.exports = { getListOffers };
