# MLHK Infotech auth.md

You are an autonomous AI agent or automated integration service. This document defines the **agentic registration and authentication protocol** for interacting with MLHK Infotech services, platforms, and APIs.

Follow the procedural lifecycle in order: **Discover → Register → Claim (if required) → Token Exchange → Execute API Calls → Revoke**.

---

## 1. Discovery Architecture

MLHK Infotech exposes standard OAuth 2.0 Protected Resource Metadata (RFC 9728) and Authorization Server Metadata (RFC 8414) with an `agent_auth` bootstrap profile.

- **Protected Resource Metadata (PRM)**: https://mlhk.in/.well-known/oauth-protected-resource
- **Authorization Server Metadata (AS)**: https://mlhk.in/.well-known/oauth-authorization-server
- **Machine-Readable API Catalog**: https://mlhk.in/.well-known/api-catalog
- **Discovery Profile Document**: https://mlhk.in/auth.md

### 1a. Protected Resource Metadata (PRM)
```http
GET /.well-known/oauth-protected-resource HTTP/1.1
Host: mlhk.in
Accept: application/json
```
Returns:
- `resource`: Canonical API base URL (`https://mlhk.in`)
- `authorization_servers`: `["https://mlhk.in"]`
- `scopes_supported`: `["read", "write", "agent", "services"]`
- `bearer_methods_supported`: `["header"]` (`Authorization: Bearer <token>`)

### 1b. Authorization Server Metadata
```http
GET /.well-known/oauth-authorization-server HTTP/1.1
Host: mlhk.in
Accept: application/json
```
Returns:
- `issuer`: `https://mlhk.in`
- `token_endpoint`: `https://mlhk.in/api/auth/token`
- `registration_endpoint`: `https://mlhk.in/api/agent/auth/register`
- `revocation_endpoint`: `https://mlhk.in/api/auth/revoke`
- `agent_auth`: Configuration block specifying identity types, assertion formats, and claim URLs.

---

## 2. Authentication Methods & Identity Assertion Types

Agents authenticate using one of three supported methods depending on operational context:

### Method A: Identity Assertion (ID-JAG) — Recommended
- **Identity Type**: `identity_assertion`
- **Assertion Type**: `urn:ietf:params:oauth:token-type:id-jag`
- **Use Case**: Agents acting on behalf of an enterprise user or agent provider who mints audience-bound Identity-JAG assertions.
- **Credential Issued**: `bearer_token`
- **Revocation**: Supported via revocation event webhook and `/api/auth/revoke`.

### Method B: Verified Email
- **Identity Type**: `identity_assertion`
- **Assertion Type**: `verified_email`
- **Use Case**: Agent possesses a verified user email identity.
- **Claim Ceremony**: An authorization code / magic link claim is completed via `https://mlhk.in/api/agent/claim`.
- **Credential Issued**: `bearer_token`

### Method C: Anonymous Registration
- **Identity Type**: `anonymous`
- **Use Case**: Ephemeral agents requesting read-only public service exploration or initial inquiry.
- **Claim Ceremony**: Deferred until human takes ownership via `claim_uri` (`https://mlhk.in/api/agent/claim`).
- **Credential Issued**: `bearer_token` (scoped to `read` / `agent`).

---

## 3. Step-by-Step Registration & Access Workflow

### Step 1: Submit Agent Identity
Send an HTTP POST request to the registration endpoint:
```http
POST /api/agent/auth/register HTTP/1.1
Host: mlhk.in
Content-Type: application/json

{
  "client_name": "MyAgent/1.0",
  "identity_type": "identity_assertion",
  "assertion_type": "urn:ietf:params:oauth:token-type:id-jag",
  "assertion": "<SIGNED_ID_JAG_JWT>"
}
```

### Step 2: Handle Claim Ceremony (if applicable)
If using `anonymous` or `verified_email` requiring user approval, poll or direct user to:
```
https://mlhk.in/api/agent/claim?claim_id=<CLAIM_ID>
```

### Step 3: Token Exchange
Exchange the service-signed registration assertion for an OAuth 2.0 Bearer access token:
```http
POST /api/auth/token HTTP/1.1
Host: mlhk.in
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<ASSERTION>
```
Response:
```json
{
  "access_token": "mlhk_at_agent_sample_token",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read agent"
}
```

### Step 4: Making Authenticated API Requests
Include the bearer token in the `Authorization` header:
```http
GET /api/services HTTP/1.1
Host: mlhk.in
Authorization: Bearer mlhk_at_agent_sample_token
```

### Step 5: Revocation
Revoke access immediately when the agent session concludes:
```http
POST /api/auth/revoke HTTP/1.1
Host: mlhk.in
Content-Type: application/x-www-form-urlencoded

token=mlhk_at_agent_sample_token&token_type_hint=access_token
```

---

## 4. Contact & Support
- **Organization**: MLHK Infotech
- **Technical Contact**: Hariom Vishwkarma (`admin@mlhk.in`)
- **Direct Portal**: https://mlhk.in/contact

