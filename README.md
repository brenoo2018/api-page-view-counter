<p align="center">
</p>
<h3 align="center"> Api Page View Counter</h3>
<p align="center">
</p>
<br>

## Api Page View Counter

This API service was developed with the aim of solving the challenge proposed by the E-inscription team who use Cloudflare Worker to handle page views using the D1 database.

### Tools used:

- Cloudflare Worker + D1
- Wrangler
- Vitest

## Quick start

- Clone this repository (`git clone https://github.com/brenoo2018/api-page-view-counter.git`)
- Inside the folder api-page-view-counter, run: `npm install`
- Run migrations: `npm run migrations`
- Run unit tests: `npm run test`
- Run unit tests with coverage: `npm run test:coverage`
- Run run server: `npm run start`

## Routes

| Request | Route            | Body | Response | Description                   |
| ------- | ---------------- | ---- | -------- | ----------------------------- |
| POST    | `/pageview/:key` |      | `number` | Returns the page view counter |
| GET     | `/pageview/:key` |      | `number` | Returns the page view counter |

## Acknowledgements

I would like to thank the E-inscription company team for the opportunity for the challenge.

## License

Nest is [MIT licensed](LICENSE).
