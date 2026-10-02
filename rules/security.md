Scope: all code — especially auth, user input, money, secrets, uploads, dependencies.

# Security

- **Never** log secrets, tokens, passwords, full request bodies, or PII (email,
  phone, address, payment/bank info, transaction details).
- Secrets come from environment variables. Never commit a `.env`, never paste a
  secret in code, never put one in a test fixture.
- Validate and **escape** all user input that crosses a boundary (DB, shell,
  HTML, regex, file path).
- SQL: parameterized queries via the ORM/driver. No string concatenation. No
  `db.execute(rawUserInput)`.
- Authorization is **per-resource**, not per-route. Check that the caller can
  access *this specific record* (e.g. this expense belongs to this user), not
  just that they're logged in.
- CSRF protection on state-changing routes from browser sessions. Bearer-token
  APIs are exempt.
- Don't disable framework security defaults (CORS, CSP, HSTS, helmet) without
  surfacing it explicitly.
- File uploads (e.g. receipts): validate MIME by magic bytes, cap size, store
  with a generated key, never trust the filename.
- Money: store amounts as integer minor units (cents) or a decimal type — never
  floats.
- Crypto: use the auth library's primitives. Don't hand-roll JWT, hashing, or signing.
- Dependencies: prefer adding nothing. If you must add one, check it's
  maintained and has no known CVEs.
