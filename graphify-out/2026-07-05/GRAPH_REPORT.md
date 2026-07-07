# Graph Report - basobas-app  (2026-07-04)

## Corpus Check
- 147 files · ~54,170 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 792 nodes · 1170 edges · 82 communities (53 shown, 29 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e72d673b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Confirmation Screen & Detail Rows|Confirmation Screen & Detail Rows]]
- [[_COMMUNITY_Phone Auth & Public Landlord Profile|Phone Auth & Public Landlord Profile]]
- [[_COMMUNITY_Landlord Visits, Requests & Tenant Filter|Landlord Visits, Requests & Tenant Filter]]
- [[_COMMUNITY_Expo & Native Dependencies|Expo & Native Dependencies]]
- [[_COMMUNITY_Expo App Config & Build Manifest|Expo App Config & Build Manifest]]
- [[_COMMUNITY_Onboarding Slides & Step Content|Onboarding Slides & Step Content]]
- [[_COMMUNITY_Product Docs Vision & Experience|Product Docs: Vision & Experience]]
- [[_COMMUNITY_StatusPill Component & Status States|StatusPill Component & Status States]]
- [[_COMMUNITY_package.json Dependencies|package.json Dependencies]]
- [[_COMMUNITY_Landing, Loading & Brand Logo|Landing, Loading & Brand Logo]]
- [[_COMMUNITY_Notifications & Profile Screens|Notifications & Profile Screens]]
- [[_COMMUNITY_Root & Tenant Layouts|Root & Tenant Layouts]]
- [[_COMMUNITY_Router Navigation & Screen Hierarchy|Router Navigation & Screen Hierarchy]]
- [[_COMMUNITY_Profile Edit & AI Preferences|Profile Edit & AI Preferences]]
- [[_COMMUNITY_Landlord Tabs, Dashboard & Listings|Landlord Tabs, Dashboard & Listings]]
- [[_COMMUNITY_Atomic Design Atoms & Molecules|Atomic Design Atoms & Molecules]]
- [[_COMMUNITY_New Listing Wizard Steps 1-3|New Listing Wizard Steps 1-3]]
- [[_COMMUNITY_Design Tokens & NativeWind Config|Design Tokens & NativeWind Config]]
- [[_COMMUNITY_FilterChip Component & Color Variants|FilterChip Component & Color Variants]]
- [[_COMMUNITY_TypeScript Config & Path Aliases|TypeScript Config & Path Aliases]]
- [[_COMMUNITY_App Icons, Splash & Graphify Concept|App Icons, Splash & Graphify Concept]]
- [[_COMMUNITY_Feature Illustration Screens|Feature Illustration Screens]]
- [[_COMMUNITY_MenuCard & MenuRow Components|MenuCard & MenuRow Components]]
- [[_COMMUNITY_Metro Bundler Config (NativeWind)|Metro Bundler Config (NativeWind)]]
- [[_COMMUNITY_SectionLabel Component|SectionLabel Component]]
- [[_COMMUNITY_Toggle Component|Toggle Component]]
- [[_COMMUNITY_ESLint Flat Config|ESLint Flat Config]]
- [[_COMMUNITY_GlassDock useDockState Hook|GlassDock useDockState Hook]]
- [[_COMMUNITY_AI Preferences Screen|AI Preferences Screen]]
- [[_COMMUNITY_Edit Profile, KYC Upload, List Property|Edit Profile, KYC Upload, List Property]]
- [[_COMMUNITY_Project & Concept Descriptions|Project & Concept Descriptions]]
- [[_COMMUNITY_Landlord Request Detail|Landlord Request Detail]]
- [[_COMMUNITY_Expo App Config|Expo App Config]]
- [[_COMMUNITY_Verification Screen|Verification Screen]]
- [[_COMMUNITY_Profile Tab|Profile Tab]]
- [[_COMMUNITY_Auth Stack Layout|Auth Stack Layout]]
- [[_COMMUNITY_AuthOnboarding Linear Flow Concept|Auth/Onboarding Linear Flow Concept]]
- [[_COMMUNITY_KYC Verification Concept|KYC Verification Concept]]
- [[_COMMUNITY_Listing Creation Flow Concept|Listing Creation Flow Concept]]
- [[_COMMUNITY_Visit Request Flow Concept|Visit Request Flow Concept]]
- [[_COMMUNITY_ESLint Flat Config Concept|ESLint Flat Config Concept]]
- [[_COMMUNITY_Landlord Layout|Landlord Layout]]
- [[_COMMUNITY_Landlord Profile Tab|Landlord Profile Tab]]
- [[_COMMUNITY_Local Claude Settings|Local Claude Settings]]
- [[_COMMUNITY_My Reviews Screen|My Reviews Screen]]
- [[_COMMUNITY_Visits Tab Screen|Visits Tab Screen]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]

## God Nodes (most connected - your core abstractions)
1. `ScreenHeader()` - 38 edges
2. `useOnboardingStore` - 26 edges
3. `expo` - 15 edges
4. `BasoBas — Tenant Experience` - 15 edges
5. `ok()` - 14 edges
6. `err()` - 14 edges
7. `BasoBas — Landlord Experience` - 13 edges
8. `BasoBas — Visit Request Workflow` - 13 edges
9. `StepProgressBar()` - 11 edges
10. `Project Documentation Index` - 11 edges

## Surprising Connections (you probably didn't know these)
- `getInitialHref()` --conceptually_related_to--> `Dual Role System`  [INFERRED]
  src/config/devMode.ts → docs/APP_VISION.md
- `useOnboardingStore` --conceptually_related_to--> `KYC Mandatory For Landlord`  [INFERRED]
  src/store/onboardingStore.ts → docs/AUTH_FLOW.md
- `useOnboardingStore` --conceptually_related_to--> `KYC Verification States`  [INFERRED]
  src/store/onboardingStore.ts → docs/AUTH_FLOW.md
- `useOnboardingStore` --conceptually_related_to--> `Onboarding Steps`  [INFERRED]
  src/store/onboardingStore.ts → docs/AUTH_FLOW.md
- `OnboardingLayout()` --conceptually_related_to--> `Onboarding Steps`  [INFERRED]
  src/components/onboarding/OnboardingLayout.tsx → docs/AUTH_FLOW.md

## Import Cycles
- 1-file cycle: `metro.config.js -> metro.config.js`

## Hyperedges (group relationships)
- **Auth/onboarding funnel (loading -> onboarding -> phone -> otp -> role -> profile -> kyc -> confirmation)** — auth_loading, auth_onboarding, auth_phone, auth_otp, auth_role, auth_profile_setup, auth_kyc_tenant, auth_kyc_landlord, auth_confirmation [EXTRACTED 1.00]
- **Landlord new listing 4-step creation flow** — landlord_new_step1, landlord_new_step2, landlord_new_step3, landlord_new_step4 [EXTRACTED 1.00]
- **KYC document upload + ImagePicker compression pattern** — auth_kyc_tenant, auth_kyc_landlord, auth_profile_setup [INFERRED 0.85]
- **Tenant Bottom Navigation Flow** — app_tenant_tabs_layout_tenanttabslayout, glassdock_glassdock, glassdock_constants_tenantdockitems_tenant_dock_items, app_tenant_tabs_index_hometab [INFERRED 0.85]
- **Onboarding 3-step screen composition** — onboarding_onboardinglayout_onboardinglayout, onboarding_stepprogressbar_stepprogressbar, onboarding_paginationdots_paginationdots, onboarding_nextbutton_nextbutton, onboarding_skipbutton_skipbutton, onboarding_onboardingeyebrow_onboardingeyebrow, concept_onboarding_steps [INFERRED 0.85]
- **Visit workflow visual concepts** — onboarding_visitillustration_visitillustration, onboarding_verifiedillustration_verifiedillustration, concept_visit_status_lifecycle, concept_post_visit_followup, concept_location_unlock_rule, app_vision_visit_request_workflow [INFERRED 0.85]
- **KYC data flow (types -> store -> docs)** — types_onboardingtypes_onboardingkycdata, types_onboardingtypes_documenttype, types_onboardingtypes_kycstatus, store_onboardingstore_useonboardingstore, store_onboardingstore_onboardingstate, concept_kyc_states, concept_kyc_mandatory_landlord, concept_verification_trust [INFERRED 0.85]

## Communities (82 total, 29 thin omitted)

### Community 0 - "Confirmation Screen & Detail Rows"
Cohesion: 0.10
Nodes (13): DetailRowProps, styles, SummaryCardProps, DocTypeChipProps, DocumentUploadZoneProps, styles, DocumentUploadZoneProps, styles (+5 more)

### Community 1 - "Phone Auth & Public Landlord Profile"
Cohesion: 0.07
Nodes (4): Props, ScreenHeader(), ReportScreen(), SavedScreen()

### Community 2 - "Landlord Visits, Requests & Tenant Filter"
Cohesion: 0.09
Nodes (22): RequestDetailScreen, TenantProfileScreen, LandlordVisitsScreen, FilterModal, HomeTab, TenantTabsLayout, SearchTab, VisitsTab (+14 more)

### Community 3 - "Expo & Native Dependencies"
Cohesion: 0.04
Nodes (45): dependencies, @clerk/expo, expo, expo-blur, expo-camera, expo-constants, expo-crypto, expo-document-picker (+37 more)

### Community 4 - "Expo App Config & Build Manifest"
Cohesion: 0.07
Nodes (28): backgroundColor, foregroundImage, adaptiveIcon, newArchEnabled, package, tsconfigPaths, typedRoutes, expo (+20 more)

### Community 5 - "Onboarding Slides & Step Content"
Cohesion: 0.06
Nodes (37): FeatureSlide, LandingScreen(), Nav, s, SLIDES, styles, FeatureSlide, SLIDES (+29 more)

### Community 6 - "Product Docs: Vision & Experience"
Cohesion: 0.09
Nodes (33): Authentication & Onboarding Flow, Features List, Landlord Experience, Project Documentation Index, Product Vision, Tenant Experience, Visit Request Workflow, Address Privacy Rule (+25 more)

### Community 7 - "StatusPill Component & Status States"
Cohesion: 0.14
Nodes (30): err(), getErrorMessage(), ok(), Result, KYCInput, KYCResult, submitKYC(), completeOnboarding() (+22 more)

### Community 8 - "package.json Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @babel/core, eslint, eslint-config-expo, eslint-config-prettier, prettier, prettier-plugin-tailwindcss, tailwindcss (+2 more)

### Community 9 - "Landing, Loading & Brand Logo"
Cohesion: 0.19
Nodes (11): fmtTimer(), maskPhone(), OTPScreen(), _styles, PhoneScreen(), styles, OTPCell, OTPCellProps (+3 more)

### Community 10 - "Notifications & Profile Screens"
Cohesion: 0.23
Nodes (4): dockBottomReserve(), ScreenBody(), ScreenBodyProps, ScreenBodyWithActionProps

### Community 11 - "Root & Tenant Layouts"
Cohesion: 0.09
Nodes (25): Index(), RootLayout(), TenantLayout, ConfirmationScreen(), DevMode, getDevMode(), getInitialHref(), useClerkSupabase() (+17 more)

### Community 12 - "Router Navigation & Screen Hierarchy"
Cohesion: 0.15
Nodes (14): RootLayout (auth/role routing), expo-router Stack navigation, FilterModal Screen, PublicLandlordProfileScreen, MapScreen(), GalleryModal Screen, PropertyDetailScreen, PropertyReviewsScreen (+6 more)

### Community 13 - "Profile Edit & AI Preferences"
Cohesion: 0.29
Nodes (6): LandlordVisitsScreen(), ListingDetailScreen, RequestDetailScreen, ListingsTab(), RequestsTab(), TenantProfileScreen

### Community 14 - "Landlord Tabs, Dashboard & Listings"
Cohesion: 0.16
Nodes (12): Role-Based Routing, LandlordDashboard (home/stats/visits), ListingDetailScreen (stats + pending requests), LandlordListingsTab (2-col property grid), NewListingStep1 (basics/property type/counters), NewListingStep2 (location/map pin), NewListingStep3 (photos/description/amenities/rules), NewListingStep4 (rent/deposit/publish) (+4 more)

### Community 15 - "Atomic Design Atoms & Molecules"
Cohesion: 0.06
Nodes (33): 1. Property Discovery, 1. Receive Request, 2. Request Creation, 2. Take Action on Request, 3. Awaiting Response, 3. Post-Visit Follow-Up, 4. Managing Multiple Applicants, 4a. Accepted Path (+25 more)

### Community 16 - "New Listing Wizard Steps 1-3"
Cohesion: 0.33
Nodes (3): NewListingStep2(), NewListingStep3(), NewListingStep4()

### Community 17 - "Design Tokens & NativeWind Config"
Cohesion: 0.33
Nodes (9): BasoBas design token palette (brand green, neutrals), app.json - BasoBas Expo app config, babel.config.js - nativewind/reanimated preset, metro.config.js - withNativeWind wrapper, nativewind-env.d.ts type reference, package.json - Expo 54 + React Native 0.81 + NativeWind, prettier.config.js - tailwindcss plugin, tailwind.config.js - nativewind preset + design tokens (+1 more)

### Community 18 - "FilterChip Component & Color Variants"
Cohesion: 0.07
Nodes (29): Add New Listing Flow (4 Steps), Add New Listing Prompt (Bottom of List), All Applicants Screen, BasoBas — Landlord Experience, Everything the Landlord Sees and Does, Filter Tab Bar, Header, Landlord Bottom Navigation Dock (+21 more)

### Community 19 - "TypeScript Config & Path Aliases"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 20 - "App Icons, Splash & Graphify Concept"
Cohesion: 0.73
Nodes (6): Android Adaptive Icon (basobas-app), Favicon (basobas-app), App Icon (basobas-app), Splash Screen (basobas-app), Graphify Knowledge Graph Concept, Expo Project Visual Assets

### Community 21 - "Feature Illustration Screens"
Cohesion: 0.07
Nodes (27): BasoBas — Tenant Experience, Category Chips (Horizontal Scroll), Content Area (Scrollable), Content Sections (Top to Bottom), Everything the Tenant Sees and Does, Filter Options, Gallery Header, Header (Fixed, Always Visible) (+19 more)

### Community 22 - "MenuCard & MenuRow Components"
Cohesion: 0.13
Nodes (16): KYCLandlordScreen(), KYCTenantScreen(), useDocumentPicker(), VerificationScreen(), Stack, ConfirmationScreen(), DetailRowProps, Nav (+8 more)

### Community 23 - "Metro Bundler Config (NativeWind)"
Cohesion: 0.67
Nodes (3): config, { getDefaultConfig }, { withNativeWind }

### Community 24 - "SectionLabel Component"
Cohesion: 0.11
Nodes (17): 1. Privacy First — The Address Rule, 2. No Broker, No Commission, 3. Verification Builds Trust, 4. Phone Number Is Identity, 5. Broker Replacement, Not Broker Supplement, BasoBas — Product Vision, Core Principles, Dual Role Users (+9 more)

### Community 25 - "Toggle Component"
Cohesion: 0.11
Nodes (17): BasoBas — Authentication & Onboarding Flow, Every Step, Every Rule, Every Decision, OTP Technical Rules, Profile Setup Rules, Returning User Flow, Screen 01 — Landing Screen, Screen 02 — Phone Entry Screen, Screen 03 — OTP Verification Screen (+9 more)

### Community 29 - "Edit Profile, KYC Upload, List Property"
Cohesion: 0.67
Nodes (3): EditProfileScreen, KYCUploadScreen, ListPropertyScreen

### Community 33 - "Landlord Request Detail"
Cohesion: 0.18
Nodes (8): Nav, NEPAL_CITIES, PREFERENCES, ProfileFormValues, profileSchema, s, Props, styles

### Community 55 - "Community 55"
Cohesion: 0.44
Nodes (9): initialKYC, initialProfile, OnboardingState, DocumentType, OnboardingKYCData, OnboardingPayload, OnboardingProfileData, PropertyPreference (+1 more)

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (7): RoleCardProps, ROLES, RoleSelectionScreen(), styles, OnboardingHeader(), Props, styles

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (7): OnboardingEyebrow(), Props, styles, Nav, RoleCardProps, ROLES, s

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (7): NEPAL_CITIES, PREFERENCES, ProfileFormValues, profileSchema, ProfileSetupScreen(), styles, useAvatarPicker()

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (8): BasoBas — Project Documentation Index, Critical Rules — Read Before Anything Else, Documentation Files, Platform, Reading Order by Role, Rental Marketplace App for Nepal · Version 1.0, The Problem in One Paragraph, What is BasoBas?

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (4): DocTypeChipProps, DocumentUploadZoneProps, Nav, s

### Community 61 - "Community 61"
Cohesion: 0.25
Nodes (8): scripts, android, format, ios, lint, prebuild, start, web

### Community 62 - "Community 62"
Cohesion: 0.29
Nodes (5): BG_MAP, ChipColor, ChipVariant, Props, TEXT_MAP

### Community 63 - "Community 63"
Cohesion: 0.33
Nodes (4): AIPreferencesScreen(), EditProfileScreen(), LandlordProfileTab(), ProfileTab()

### Community 64 - "Community 64"
Cohesion: 0.40
Nodes (4): NotificationsScreen(), NewListingStep1(), HomeTab(), LandlordDashboard()

### Community 65 - "Community 65"
Cohesion: 0.33
Nodes (4): PropertyCardVariant, Props, STATUS_BADGES, StatusOverlay

### Community 66 - "Community 66"
Cohesion: 0.40
Nodes (4): main, name, private, version

### Community 67 - "Community 67"
Cohesion: 0.40
Nodes (3): NotificationsScreen(), NotificationPrefsModal Screen, SettingsScreen()

### Community 68 - "Community 68"
Cohesion: 0.40
Nodes (3): Props, Status, STATUS_STYLES

### Community 76 - "Community 76"
Cohesion: 1.00
Nodes (3): FloatingDock rendered with role-specific variant prop in each tab layout, LandlordTabsLayout, TenantTabsLayout

## Ambiguous Edges - Review These
- `ReportScreen()` → `PropertyDetailScreen`  [AMBIGUOUS]
  app/(tenant)/report.tsx · relation: conceptually_related_to
- `HomeTab` → `MapIllustration`  [AMBIGUOUS]
  app/(tenant)/(tabs)/index.tsx · relation: conceptually_related_to

## Knowledge Gaps
- **360 isolated node(s):** `name`, `slug`, `version`, `scheme`, `favicon` (+355 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `ReportScreen()` and `PropertyDetailScreen`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `HomeTab` and `MapIllustration`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `useOnboardingStore` connect `MenuCard & MenuRow Components` to `Confirmation Screen & Detail Rows`, `Landlord Request Detail`, `Onboarding Slides & Step Content`, `Product Docs: Vision & Experience`, `Root & Tenant Layouts`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 60`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `ScreenHeader()` connect `Phone Auth & Public Landlord Profile` to `Community 64`, `Community 67`, `Community 73`, `Notifications & Profile Screens`, `Profile Edit & AI Preferences`, `New Listing Wizard Steps 1-3`, `AI Preferences Screen`, `Community 63`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useOnboardingStore` (e.g. with `KYC Mandatory For Landlord` and `KYC Verification States`) actually correct?**
  _`useOnboardingStore` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _362 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Confirmation Screen & Detail Rows` be split into smaller, more focused modules?**
  _Cohesion score 0.09788359788359788 - nodes in this community are weakly interconnected._