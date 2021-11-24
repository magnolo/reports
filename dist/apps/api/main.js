/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
    // @Get('navigation')
    // getNavigation() {
    //   return this.appService.getNews();
    // }
    getContent(slug) {
        return this.appService.getData(slug, false, 'card');
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AppController.prototype, "getData", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':slug'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('slug')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AppController.prototype, "getContent", null);
AppController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('ranks'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const news_component_1 = __webpack_require__("./apps/api/src/app/news/news.component.ts");
const report_service_1 = __webpack_require__("./apps/api/src/app/report/report.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const report_component_1 = __webpack_require__("./apps/api/src/app/report/report.component.ts");
const news_service_1 = __webpack_require__("./apps/api/src/app/news/news.service.ts");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [common_1.HttpModule],
        controllers: [app_controller_1.AppController, report_component_1.ReportController, news_component_1.NewsController],
        providers: [app_service_1.AppService, report_service_1.ReportService, news_service_1.NewsService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rxjs_1 = __webpack_require__("rxjs");
const operators_1 = __webpack_require__("rxjs/operators");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.baseUrl = 'https://app.23degrees.io/api/v2/content';
        this.url = `${this.baseUrl}?space=all&order_by=updated_at desc&page=0&page_size=100&type=folder`;
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDIxMGI4YTAzYzZiYTAwMWQ1MmZiYzEiLCJlbWFpbCI6InJhbmtpbmdzQDIzZGVncmVlcy5pbyIsInNsdWciOiJyYW5raW5ncy11bmQtbW9uaXRvcmluZyIsInJvbGVzIjpbIjVkNDhhYmM1ODMxODZjMDAxZWY2Yzc5MCIsIjVmNjQ5MDdjY2JkMDBkMDAxYzViMDhlZSIsIjVkNDhhYmM1ODMxODZjMDAxZWY2Yzc5MSIsIjVkNGFlZDBlMmU1YTMxMDAyMDY0ZWEzMSIsIjVkNGFlZDI5MmU1YTMxMDAyMDY0ZWEzMiIsIjVmMmFjYTQwZTJmNmQzMDAxZGMyZDgyMCIsIjVlZDExNzdkZGE4YTc3MDAxZDJhZDJiYSIsIjVmZTA1MWNmYWU3YTcyMDAxY2VkODUyYSJdLCJpYXQiOjE2MzczMTM3MDl9.oogUWwv2VubvXiOvSXSTt0VKb9TI_bBA6qtOjXp0uVY';
    }
    getData(slug = 'ZUSlRmBAfim8r4ex-collection-edutcation-and-digitalization', includeSubfolders = true, projection = 'simple') {
        this.httpService.get(`${this.baseUrl}/${slug}`);
        return this.httpService
            .get(`${this.url}&parent=${slug}&projection=${projection}&includesubfolders=${includeSubfolders ? 'yes' : 'no'}`, {
            headers: {
                Authorization: 'Bearer ' + this.token,
            },
        })
            .pipe((0, operators_1.catchError)((boom) => {
            console.log('boom');
            return (0, rxjs_1.of)(boom);
        }), (0, operators_1.map)((response) => response.data.payload));
    }
};
AppService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof common_1.HttpService !== "undefined" && common_1.HttpService) === "function" ? _a : Object])
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/app/news/news.component.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const news_service_1 = __webpack_require__("./apps/api/src/app/news/news.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    getRanks() {
        return this.newsService.getNews();
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], NewsController.prototype, "getRanks", null);
NewsController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('news'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof news_service_1.NewsService !== "undefined" && news_service_1.NewsService) === "function" ? _a : Object])
], NewsController);
exports.NewsController = NewsController;


/***/ }),

/***/ "./apps/api/src/app/news/news.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const faker = __webpack_require__("faker/locale/de_AT");
const randomNumber = (max) => Math.floor(Math.random() * max);
let NewsService = class NewsService {
    getNews() {
        const news = [];
        for (let i = 0; i <= 4; i++) {
            const item = {
                slug: `news-${i}`,
                name: faker.lorem.words(),
                created_at: faker.date.recent(),
                description: faker.lorem.paragraph(),
                text: faker.lorem.paragraphs(),
                image: {
                    url: `https://source.unsplash.com/random/800x600?sig=${randomNumber(1000)}`,
                },
            };
            news.push(item);
        }
        return news;
    }
};
NewsService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], NewsService);
exports.NewsService = NewsService;


/***/ }),

/***/ "./apps/api/src/app/report/report.component.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportController = void 0;
const tslib_1 = __webpack_require__("tslib");
const report_service_1 = __webpack_require__("./apps/api/src/app/report/report.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    getRanks() {
        return this.reportService.getRanks();
    }
    getCategories() {
        return this.reportService.getCategories();
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], ReportController.prototype, "getRanks", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('categories'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], ReportController.prototype, "getCategories", null);
ReportController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('reports'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof report_service_1.ReportService !== "undefined" && report_service_1.ReportService) === "function" ? _a : Object])
], ReportController);
exports.ReportController = ReportController;


/***/ }),

/***/ "./apps/api/src/app/report/report.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const faker = __webpack_require__("faker/locale/de_AT");
const randomNumber = (max) => Math.floor(Math.random() * max);
let ReportService = class ReportService {
    constructor(httpService) {
        this.httpService = httpService;
        this.countryRestUrl = 'https://restcountries.com/v3.1/alpha/';
    }
    getCountryDetails(code) {
        return this.httpService.get(`${this.countryRestUrl}${code}`);
    }
    getRanks(count = 40, category) {
        const reports = [];
        const cat = Object.assign({}, category) || {
            slug: 'category-1',
            name: faker.lorem.words(),
            description: faker.lorem.paragraph(),
        };
        for (let i = 0; i < count; i++) {
            const report = {
                slug: `report-${i}`,
                name: faker.commerce.productName(),
                description: faker.lorem.paragraph(),
                category: cat,
                image: {
                    url: `https://source.unsplash.com/random/800x600?sig=${randomNumber(1000)}`,
                },
                type: 'composite',
                score: randomNumber(100),
                trend: randomNumber(20),
                ranks: [
                    {
                        score: randomNumber(100),
                        trend: randomNumber(20),
                        rank: 1,
                        country_code: faker.address.countryCode().toLowerCase(),
                        country_name: faker.address.country()
                    },
                ],
                indicators_count: randomNumber(40),
            };
            reports.push(report);
        }
        // const codes = reports.map((report) => report.ranks.map((rank) => rank.country_code));
        // console.log(codes.join(','));
        // this.getCountryDetails(codes.join(',')).toPromise()
        return reports;
    }
    getCategories() {
        const categories = [];
        for (let i = 0; i < 5; i++) {
            const category = {
                slug: `category-${i}`,
                name: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                short: faker.lorem.slug(),
                color: faker.internet.color(),
                tags: [],
            };
            category.reports = this.getRanks(8, category);
            categories.push(category);
        }
        return categories;
    }
};
ReportService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof common_1.HttpService !== "undefined" && common_1.HttpService) === "function" ? _a : Object])
], ReportService);
exports.ReportService = ReportService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "faker/locale/de_AT":
/***/ ((module) => {

module.exports = require("faker/locale/de_AT");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map