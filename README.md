# Trewick Custom Renovations — Netlify-ready site

Files:
- index.html — main bathroom remodeling landing page
- thank-you.html — form confirmation page
- assets/site.css — styling
- assets/site.js — pricing calculator + lead category tagging
- assets/img/ — optimized project photos and logo
- netlify.toml — basic Netlify configuration

## Netlify deployment
1. In Netlify, choose **Add new project / Deploy manually** (wording can vary).
2. Upload the entire contents of this folder, or upload the ZIP after extracting if Netlify requests a folder.
3. Netlify should detect the HTML form automatically because it uses `data-netlify="true"`.
4. Test the temporary `*.netlify.app` site thoroughly before changing Cloudflare DNS.
5. In Netlify, configure form notifications so submissions go to your preferred email.
6. Only after approval, connect `trewickcustom.com` and update Cloudflare DNS.

## Lead routing
The form stores a hidden `lead_category`:
- Priority Lead: generally ready now–3 months and budget is not obviously below the selected project's starting price.
- Review: scope/budget needs judgment or project type is "Other".
- Future Follow-Up: generally 3–6+ months or planning/research stage.

This routing is intentionally conservative. It does not automatically reject projects.

## Revision notes
- Added premium parallax/fixed-background image sections with mobile-safe fallback.
- Added scroll-triggered reveal animation and gallery hover polish.
- Added client remodel-visualization section.
- Replaced an older gallery image with the newly supplied modern white bathroom image.
- Added the newly supplied shower + sauna project image as a premium visual section.
- Added a direct Google-review search link while retaining verified review excerpts in the static site. Automatic live review syncing requires a Google Places API or third-party review widget and credentials, so it is intentionally not hard-coded into this deploy package.
- Expanded SEO metadata while preserving fast static HTML and semantic headings.


## Revision 2
- Improved upgrade-option contrast: blue text on white cards.
- Added four newly supplied project images to the site assets.
- Rebuilt the project gallery as a balanced rectangular mosaic with no empty lower-right gap.
- Added a kitchen example while preserving bathroom remodeling as the site's primary focus.

## Revision 3
- Added the supplied pre-renovation photo of the sauna/bathroom space.
- Added a dedicated before-and-after sauna/bathroom transformation section.
- Added the supplied renovated kitchen/island photo to the gallery.
- Preserved the balanced rectangular gallery treatment and readable upgrade-option styling.

## Revision 4
- Corrected the Before & After feature so the After position displays the completed bathroom with the red infrared sauna.


## Form / Thank-you fix
- Intake form now posts to `/thank-you/`.
- Added a real `/thank-you/index.html` success page.
- Kept `/thank-you.html` as a redirect for compatibility.
- Confirmed Netlify form markup is present (`netlify`, `data-netlify="true"`, hidden `form-name`, honeypot).
- IMPORTANT: email alerts are configured in the Netlify dashboard, not in site code. After deploy, enable an email notification for the `bathroom-intake` form under Netlify Forms / Form notifications.


## Form fix v2
- Form now posts directly to `/thank-you.html`.
- `thank-you.html` is a complete root-level page, not a redirect.
- Removed the nested `/thank-you/` route and `_redirects` rule to avoid Netlify Drop routing ambiguity.
- Corrected the Netlify honeypot attribute.
- Netlify form detection remains enabled with `data-netlify="true"` and hidden `form-name`.


## SEO structured data update
- Added LocalBusiness/HomeAndConstructionBusiness JSON-LD to the homepage.
- Includes business name, website, phone, email, owner, Houston service area, and core remodeling services.
- Does not include self-serving review or aggregateRating markup.
