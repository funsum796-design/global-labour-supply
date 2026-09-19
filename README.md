# Global Labour Supply — reference-matched UI

This version is rebuilt from the supplied 12-page reference image as the visual source of truth.

The implementation intentionally follows the reference:
- deep navy / near-black background
- thin gold borders
- gold CTAs
- compact rounded cards
- centered section labels
- same page hierarchy and page count
- long Home page
- About, Services, Employer Request, Workers, Worker Application, Process, Saudi Arabia, UAE, Workforce/Candidates and Contact pages
- shared header/footer
- working React routes
- working employer, worker and contact forms
- Vercel `/api/submit` endpoint
- Gmail notification
- optional MongoDB persistence

Setup:
1. npm install
2. npm run dev for the frontend
3. For the Vercel API locally, use `vercel dev`
4. On Vercel add GMAIL_USER, GMAIL_APP_PASSWORD and OWNER_EMAIL.
5. Optionally add MONGODB_URI.

Use a Google App Password, not a normal Gmail password. Never commit `.env`.

## Latest upgrades
- Navigation now uses **Hire Labour** instead of For Employers.
- Added secure-ish Vercel admin endpoint at `/admin` using `ADMIN_PASSWORD`.
- Worker applications and employer requests support document attachments.
- Gmail receives form data and attachments.
- MongoDB stores submissions when `MONGODB_URI` is configured.
- Workforce page reads worker applications from MongoDB (publicly exposing only limited profile fields).
- All route changes scroll to the top.

For production, add a proper identity provider/authentication layer before exposing the admin dashboard publicly.

## Final page map
Public: Home, About Us, Services, Hire Labour, For Workers, Worker Application, Our Process, Saudi Arabia, UAE, Workforce, Contact.
Private: /admin, /admin/applications, /admin/candidates, /admin/requests, /admin/documents, /admin/matching, /admin/messages.

The public navigation uses “Hire Labour” instead of “For Employers”.


## One-click Demo Mode
Open `/admin` and click `One-Click Demo Mode`. The sample dashboard works locally in the browser with no MongoDB, Gmail, or environment variables. Approve/reject and matching actions are demo-only.
