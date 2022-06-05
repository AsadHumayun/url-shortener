# url shortener
> Custom mini-URL shortener written in JS using Express.

> This really isn't intended for use in anything big - there are many improvements that can be made!

## Quick guide

### Env variables

`MYURL` - the URL that this application exists on. Example: "MYURL=localhost:1234" or a domain name that you're hosting it on: "MYURL=short.example.com".

`AUTH_KEYS` - a list of auth keys separated by `;`. Example: "AUTH_KEYS=UEJH38F7EY3__25$$!{};Super-Secret-Password".

### API

`GET /`

[UNRESTRICTED]

Primary entry point, gives a form to allow the user to shorten the URL.

`POST /api`

[UNRESTRICTED]

Extracts content of `req.body`, sent via the form retrieved from `GET /`.

Example request body:
```json
{
	"url": "http://example.com",
	"auth": "3280-448282-449456-Z",
}
```

This will create a redirect to `http://example.com` and will return the new URL to the user.

`GET /assets/{file.name}`

[UNRESTRICTED]

Returns a document with file name `{file.name}`. `.env` files cannnot be accessed in this way.

`GET /*`

[404]

404 page.

## NOTE
On the 1st use only, you must run `node index.js --syncsql` to sync the database and force it to be created on your local machine.

If you do not do this, then the programme won't work as the database won't exist.

**Note:** This is only needed on the first boot. Using this again will effectively reset the database in its entirety.

## Author
(c) [AsadHumayun](https://github.com/AsadHumayun)

Authored and maintained by Asad.

> GitHub [@AsadHumayun](https://github.com/AsadHumayun)

> Any suggestions or improvements? Feel free to open a pull request and I'll take a look at it!