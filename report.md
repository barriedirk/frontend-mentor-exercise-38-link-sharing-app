error
Form Controls
1 occurrence
Read more

autocomplete attribute must be used correctly

<input data-testid="password" id="password-input" autocomplete="password" placeholder="Enter your pa ...

warning
Navigation & Interaction
AI Detected1 occurrence

The submit button has the attribute disabled without any visible indication or explanation. This can confuse keyboard and screen reader users who may not understand why the button is inactive. This causes difficulty in form submission and may block users from completing the login process.

<button data-testid="button-login-submit" class="btn--submit mt-5 button button--primary" type="submit" aria-label="Log in to your account" disabled="">Login</button>


    Structure & Semantics

    Uses semantic HTML elements like <form>, <fieldset>, <label>, and <input> with correct for and id relationships, ensuring form controls are properly associated with their labels.
    Screen Reader Support

    The form uses aria-labelledby on the form and fieldset elements to provide clear accessible names, improving screen reader context.
    Navigation & Interaction

    Icons inside input fields use aria-hidden="true" to avoid distracting screen readers with decorative content.
    Language

    The document declares the language with <html lang="en">, helping screen readers select the correct pronunciation rules.
    Page Behavior

    The use of aria-live="assertive" and role="status" on the progress bar container provides timely updates to assistive technologies about loading status.





    error
Structure & Semantics
1 occurrence
Read more

element id must begin with a letter

<style id="_goober"> @keyframes go2264125279{from{transform:scale(0) rotate(45deg);opacity:0;}to{tra ...

error
Accessibility
2 occurrences
Read more
<fieldset> must have a <legend> as the first child

<fieldset class="form-group input-text" role="group" aria-labelledby="email-label"><label id="email- ...

error
Markup Style
1 occurrence
Read more

Inline style is not allowed

<div data-rht-toaster="" style="position: fixed; z-index: 9999; inset: 16px; pointer-events: none;"> ...

warning
Structure & Semantics
AI Detected1 occurrence

The footer contains navigation links but is not marked up as a <nav> element. This matters because using <nav> clearly indicates navigation sections to browsers and assistive technologies, improving content understanding and user navigation.

<footer class="text-center mt-auto py-4 text-gray-500 text-xs">Challenge by<a class="m-0.5 " href="https://www.frontendmentor.io/profile/barriedirk/solutions" target="_blank" rel="noreferrer" aria-label="View solutions by Barrie Freyre on Frontend Mentor">Frontend Mentor</a>. Coded by<a class="m-0.5" href="https://www.linkedin.com/in/barriefreyre/" target="_blank" rel="noreferrer" aria-label="Visit Barrie Freyre's LinkedIn profile">Barrie Freyre</a>.</footer>

warning
Structure & Semantics
AI Detected1 occurrence

The form uses <fieldset> elements with role="group" but lacks <legend> elements to describe the groups. This matters because <legend> provides a clear label for grouped form controls, helping users and assistive technologies understand the form structure.

<form class="flex flex-col gap-5" aria-labelledby="login-heading"><fieldset class="form-group input-text" role="group" aria-labelledby="email-label"><label id="email-label" class="form-label text-grey-900" for="email-input">Email Address</label>...</fieldset><fieldset class="form-group input-text" role="group" aria-labelledby="password-label"><label id="password-label" class="form-label text-grey-900" for="password-input">Password</label>...</fieldset></form>

warning
Structure & Semantics
AI Detected1 occurrence

The <button> element with class "link" is used for navigation to 'Login Credentials' demo but is a button instead of a link. This matters because links should be used for navigation to meet user expectations and improve semantic clarity.

<button class="link" type="button" data-testid="button-login-demo-credentials" aria-label="Login with demo credentials">Login Credentials</button>






    Structure & Semantics

    Uses semantic elements like <header>, <main>, <footer>, and <form> appropriately to structure the page content.
    Structure & Semantics

    Proper use of <label> elements associated with form inputs via 'for' and 'id' attributes enhances form semantics.
    Structure & Semantics

    The heading hierarchy is logical with a main <h1> for the login page, supporting clear content structure.



    error
Syntax & Validation
7 occurrences
Read more

Use only valid CSS properties to ensure consistent rendering and avoid unexpected styling failures.

grid-name: mlMain;

project/packages/frontend/src/layout/mainLayout/MainLayout.module.css:13
error
Syntax & Validation
3 occurrences
Read more

Use only recognized property values to ensure styles apply correctly and consistently.

transition: all 0.3 ease;

project/packages/frontend/src/components/icon/icons/Icons.module.css:4
warning
Responsive Design
57 occurrences
Read more

Consider using relative units (em, rem) instead of absolute units (px, pt) to support resizing and improve accessibility.

gap: 10px;

project/packages/frontend/src/styles/utilities/form.css:5
warning
Best Practice
2 occurrences
Read more

Order selectors from least to most specific to prevent unexpected style overrides.

.form-input-group:is(:focus, :active),
.form-input-group:has(:focus, :active) {
  border: 1px solid  ...

project/packages/frontend/src/styles/utilities/form.css:53
warning
Maintainability
1 occurrence
Read more

Consolidate duplicate selectors to maintain an organized and efficient stylesheet.

.form-group.row .form-label {
    font-size: var(--fs-16);
  }

project/packages/frontend/src/styles/utilities/form.css:133
warning
Specificity & Cascade
4 occurrences
Read more

Keep selector specificity low to maintain a flat hierarchy that is easier to maintain and override when needed.

.form-group.input-file.row .form-label,
  .form-group.input-file.row .form-helper-text {
    align-s ...

project/packages/frontend/src/styles/utilities/form.css:137
warning
Accessibility
2 occurrences
Read more

Avoid position: fixed as it can cause content to be cut off when zoomed, creating accessibility issues for users who need to enlarge content.

position: fixed;

project/packages/frontend/src/components/loading/Loading.css:2
warning
Accessibility
8 occurrences
Read more

Provide alternatives for users who prefer reduced motion to prevent motion sickness and other accessibility issues.

animation: colorAnimation 1s infinite;

project/packages/frontend/src/components/loading/Loading.css:22
warning
Specificity & Cascade
5 occurrences
Read more

Avoid !important as it breaks the natural cascade and makes future style changes more difficult to implement.

animation-duration: 0.01ms !important;

project/packages/frontend/src/styles/base/reset.css:68
warning
Syntax & Validation
2 occurrences
Read more

Avoid empty blocks to keep CSS clean and prevent unnecessary code bloat.

.links {
}

project/packages/frontend/src/features/links/pages/MainLinks.module.css:1
info
Best Practice
4 occurrences
Read more

Use logical properties (e.g., inline-start instead of left) to support different reading directions and improve internationalization.

margin-top: 0.25rem;

project/packages/frontend/src/styles/utilities/form.css:103
info
Best Practice
21 occurrences
Read more

Consider using CSS functions like calc(), min(), and clamp() to create more responsive and flexible layouts that adapt to different viewport sizes.

padding: 14px 20px;

project/packages/frontend/src/styles/utilities/form.css:13
info
Best Practice
16 occurrences
Read more

Use CSS custom properties (variables) to centralize values, improve consistency, and make site-wide changes easier to implement.

box-shadow: rgba(94, 62, 246, 0.4) 0px 8px 24px;

project/packages/frontend/src/styles/utilities/form.css:56
info
Responsive Design
2 occurrences
Read more

Consider using min-width instead of max-width and using a mobile-first approach, which can lead to cleaner code and better performance on smaller devices.

@media screen and (max-width: 47.9375em) {
  .header__text {
    position: absolute;

project/packages/frontend/src/features/links/pages/header/Header.css:30



Consistent use of CSS custom properties (variables) for colors, fonts, and sizes improves maintainability and theming.
Layout & Styling

Good use of Flexbox and Grid for layout, providing flexible and modern responsive design patterns.
Responsive Design

Media queries use min-width for mobile-first responsive design, enhancing adaptability across devices.
Readability

Clear and descriptive class naming conventions improve code readability and ease of maintenance.
Performance

Use of gap property in flex layouts reduces the need for margin hacks, improving layout performance and clarity.


error
Logic & Correctness
AI Detected1 occurrence

Duplicate test case for 'GET /links' in backend-e2e/src/backend/backend.e2e.spec.ts. This causes redundant tests and confusion about test coverage.

  it('should return the user links on GET /links', async () => {
    const response = await axios.get(`${baseUrl}/links`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.links)).toBe(true);

    if (response.data.links.length > 0) {
      const link = response.data.links[0];
      expect(link).toHaveProperty('id');
      expect(link).toHaveProperty('platform');
      expect(link).toHaveProperty('url');
    }
  });

  it('should return the user links on GET /links', async () => {
    const response = await axios.get(`${baseUrl}/links`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.links)).toBe(true);

    if (response.data.links.length > 0) {
      const link = response.data.links[0];
      expect(link).toHaveProperty('id');
      expect(link).toHaveProperty('platform');
      expect(link).toHaveProperty('url');
    }
  });

project/packages/backend-e2e/src/backend/backend.e2e.spec.ts:19
error
Logic & Correctness
AI Detected1 occurrence

In ProfileForm.tsx, the 'error' prop for email, slug, and lastName inputs incorrectly references 'errors.lastName'. This causes wrong error messages to display and confuses users.

      <InputForm<ProfileFormValues>
        name="email"
        control={control}
        label="Email"
        type="text"
        error={errors.lastName}
        autoComplete="email"
        placeholder="e.g. ben@example.com"
        styleName="row"
        dataTestid="profile-email"
      />

project/packages/frontend/src/features/links/pages/profile/ProfileForm.tsx:61
error
Logic & Correctness
AI Detected1 occurrence

In ProfileForm.tsx, the 'error' prop for slug input incorrectly references 'errors.lastName'. This causes slug validation errors to be missed or misreported.

      <InputForm<ProfileFormValues>
        name="slug"
        control={control}
        label="Slug"
        type="text"
        error={errors.lastName}
        autoComplete="slug"
        placeholder="e.g. ben-wright"
        styleName="row"
        dataTestid="profile-slug"
      />

project/packages/frontend/src/features/links/pages/profile/ProfileForm.tsx:72
error
Logic & Correctness
AI Detected1 occurrence

In Links.tsx, toast.success is called on error catch block instead of toast.error. This causes users to see success messages even when saving links fails.

    } catch (error) {
      console.error('Failed to save links', error);

      toast.success('Failed to save links', { id: idToast });
    } finally {
      loadingSignal.hide();
    }

project/packages/frontend/src/features/links/pages/links/Links.tsx:88
error
Logic & Correctness
AI Detected1 occurrence

In UserController.ts create method, loginSchema is used to validate registration data. This causes missing validation of required registration fields and potential invalid user creation.

  static async create(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();
      return res.status(400).json({ errors: flattened.fieldErrors });
    }

    const data: LoginInput = result.data;

project/packages/backend/src/controllers/UserController.ts:20
error
Logic & Correctness
AI Detected1 occurrence

In UserController.ts updateSaveLocally method, if both req.file and req.body.avatar_url exist, removeAvatar is called on req.body.avatar_url which may cause unintended deletion of avatar. This causes potential data loss of user avatar.

    if (req.file && req.body.avatar_url) {
      removeAvatar(req.body.avatar_url);
    }

project/packages/backend/src/controllers/UserController.ts:87
error
Logic & Correctness
AI Detected1 occurrence

In UserController.ts update method, UserModel.findById query selects only some fields but UserRow interface expects more fields. This mismatch can cause undefined values and runtime errors.

    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    let avatarUrl = currentUser.avatar_url;
    let oldAvatarPublicId = currentUser.avatar_public_id;

project/packages/backend/src/controllers/UserController.ts:121