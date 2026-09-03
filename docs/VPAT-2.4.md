# VPAT 2.4 — urupe-ui

## WCAG 2.1 Level A

| Criteria | Conformance Level | Remarks |
|----------|------------------|---------|
| 1.1.1 Non-text Content | Supports | All images and icons have text alternatives |
| 1.2.1 Audio/Video | Not Applicable | No audio/video content |
| 1.3.1 Info and Relationships | Supports | Semantic HTML and ARIA roles used |
| 1.3.2 Meaningful Sequence | Supports | DOM order matches visual order |
| 1.3.3 Sensory Characteristics | Supports | Instructions don't rely solely on shape/color |
| 1.4.1 Use of Color | Supports | Color is never sole indicator |
| 1.4.2 Audio Control | Not Applicable | No audio content |
| 2.1.1 Keyboard | Supports | All functionality available via keyboard |
| 2.1.2 No Keyboard Trap | Supports | Focus can be moved away from all components |
| 2.4.1 Bypass Blocks | Supports | Skip navigation links provided |
| 2.4.2 Page Titled | Supports | SEO component manages page titles |
| 2.4.3 Focus Order | Supports | Tab order follows visual layout |
| 3.3.1 Error Identification | Supports | Error messages linked via aria-describedby |
| 3.3.2 Labels | Supports | Form inputs have associated labels |

## WCAG 2.1 Level AA

| Criteria | Conformance Level | Remarks |
|----------|------------------|---------|
| 1.4.3 Contrast (Minimum) | Supports | All themes pass 4.5:1 ratio |
| 1.4.4 Resize Text | Supports | Responsive design supports 200% zoom |
| 1.4.5 Images of Text | Supports | No images of text used |
| 2.4.5 Multiple Ways | Supports | Navigation, search, and sitemap available |
| 2.4.6 Headings and Labels | Supports | Descriptive headings and labels |
| 2.4.7 Focus Visible | Supports | Custom focus indicators on all themes |
| 3.1.1 Language of Page | Supports | lang attribute set via SEO component |
| 3.2.3 Consistent Navigation | Supports | Navigation consistent across pages |
| 3.3.3 Error Suggestion | Supports | Error messages suggest corrections |
| 3.3.4 Error Prevention | Supports | Confirmation dialogs for destructive actions |

## Revised Section 508

| Criteria | Conformance Level | Remarks |
|----------|------------------|---------|
| 1194.21(a) | Supports | Software is accessible without visual display |
| 1194.21(b) | Supports | Platform accessibility features used |
| 1194.21(c) | Supports | No audio-only features |
| 1194.21(d) | Supports | Color is not sole indicator |
| 1194.21(e) | Supports | Visual output is clear |
| 1194.21(f) | Supports | Text is readable and selectable |
| 1194.21(g) | Supports | Input modalities supported |
| 1194.21(h) | Supports | Keyboard operation provided |
| 1194.21(i) | Supports | No timing-dependent features |

## Conformance Notes

- **Tested versions:** urupe-ui v4.0.0
- **Tested browsers:** Chrome, Firefox, Safari, Edge
- **Testing tools:** axe-core, VoiceOver, NVDA, manual keyboard testing
- **Known exceptions:** RichTextEditor (ProseMirror) has partial ARIA support

## Contact

For accessibility feedback or to report issues, use GitHub Security Advisories.
