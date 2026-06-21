# Graph Report - .  (2026-06-20)

## Corpus Check
- Corpus is ~15,839 words - fits in a single context window. You may not need a graph.

## Summary
- 339 nodes · 410 edges · 52 communities (38 shown, 14 thin omitted)
- Extraction: 85% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.87)
- Token cost: 195,261 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Expo SDK Dependencies|Expo SDK Dependencies]]
- [[_COMMUNITY_StatusPill Component|StatusPill Component]]
- [[_COMMUNITY_Expo App Config (app.json)|Expo App Config (app.json)]]
- [[_COMMUNITY_Role Routing & Navigation|Role Routing & Navigation]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Atomic Design Components|Atomic Design Components]]
- [[_COMMUNITY_Profile Setup Screens|Profile Setup Screens]]
- [[_COMMUNITY_Root Layout & Settings|Root Layout & Settings]]
- [[_COMMUNITY_Listing Detail & Modals|Listing Detail & Modals]]
- [[_COMMUNITY_New Listing Creation Flow|New Listing Creation Flow]]
- [[_COMMUNITY_ExpoNativeWind Toolchain|Expo/NativeWind Toolchain]]
- [[_COMMUNITY_Tenant Home & Notifications|Tenant Home & Notifications]]
- [[_COMMUNITY_Profile & AI Preferences|Profile & AI Preferences]]
- [[_COMMUNITY_Auth Funnel Screens|Auth Funnel Screens]]
- [[_COMMUNITY_Visits & Requests (Landlord)|Visits & Requests (Landlord)]]
- [[_COMMUNITY_FilterChip Component|FilterChip Component]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Branding Asset Set|Branding Asset Set]]
- [[_COMMUNITY_Feature Demo Screens|Feature Demo Screens]]
- [[_COMMUNITY_KYC Verification Screens|KYC Verification Screens]]
- [[_COMMUNITY_Menu Components|Menu Components]]
- [[_COMMUNITY_Metro Bundler Config|Metro Bundler Config]]
- [[_COMMUNITY_SectionLabel Atom|SectionLabel Atom]]
- [[_COMMUNITY_Toggle Atom|Toggle Atom]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_Profile Edit Screens|Profile Edit Screens]]
- [[_COMMUNITY_Project README|Project README]]
- [[_COMMUNITY_Report Screen|Report Screen]]
- [[_COMMUNITY_Auth Layout Concept|Auth Layout Concept]]
- [[_COMMUNITY_KYC Flow Concept|KYC Flow Concept]]
- [[_COMMUNITY_Listing Creation Concept|Listing Creation Concept]]
- [[_COMMUNITY_Visit Request Concept|Visit Request Concept]]
- [[_COMMUNITY_ESLint Config Detail|ESLint Config Detail]]
- [[_COMMUNITY_Landlord Layout Concept|Landlord Layout Concept]]
- [[_COMMUNITY_My Reviews Concept|My Reviews Concept]]
- [[_COMMUNITY_Visits Tab Concept|Visits Tab Concept]]

## God Nodes (most connected - your core abstractions)
1. `ScreenHeader()` - 48 edges
2. `expo` - 15 edges
3. `useAuth` - 10 edges
4. `scripts` - 8 edges
5. `PropertyCard()` - 8 edges
6. `LandlordProfileTab()` - 7 edges
7. `PropertyDetailScreen` - 7 edges
8. `RoleScreen()` - 5 edges
9. `FloatingDock()` - 5 edges
10. `package.json - Expo 54 + React Native 0.81 + NativeWind` - 5 edges

## Surprising Connections (you probably didn't know these)
- `App Icon (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/icon.png → CLAUDE.md
- `Android Adaptive Icon (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/adaptive-icon.png → CLAUDE.md
- `Splash Screen (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/splash.png → CLAUDE.md
- `Favicon (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/favicon.png → CLAUDE.md
- `useAuth` --shares_data_with--> `SettingsScreen()`  [INFERRED]
  src/store/authStore.ts → app/(landlord)/settings.tsx

## Import Cycles
- 1-file cycle: `metro.config.js -> metro.config.js`

## Hyperedges (group relationships)
- **Multi-step Listing Creation Flow** — new_step_1_newlistingstep1, new_step_2_newlistingstep2, new_step_3_newlistingstep3, new_step_4_newlistingstep4, tabs_index_landlorddashboard, tabs_listings_listingstab [EXTRACTED 0.95]
- **Visit Request Approval Flow** — landlord_visits_landlordvisitsscreen, tabs_requests_requeststab, request__id__requestdetailscreen, tenant__id__tenantprofilescreen, listing__id__listingdetailscreen [EXTRACTED 0.95]
- **KYC Verification Flow** — auth_kyc_tenant_kyctenantscreen, auth_kyc_landlord_kyclandlordscreen, landlord_verification_verificationscreen [INFERRED 0.85]
- **Tenant Property Discovery Flow** — tenant_searchresults_searchresultsscreen, tenant_filter_filtermodal, tenant_map_mapscreen, tenant_property_propertydetailscreen, tenant_property_gallery_gallerymodal [EXTRACTED 1.00]
- **Tenant Visit Engagement Flow** — tenant_property_propertydetailscreen, tenant_schedulevisit_schedulevisitscreen, tenant_visit_visitdetailscreen, tenant_reviews_writereviewscreen, tenant_reviews_propertyreviewsscreen [INFERRED 0.95]
- **Tenant Account Management Flow** — tenant_settings_settingsscreen, tenant_editprofile_editprofilescreen, tenant_preferences_preferencesscreen, tenant_aipreferences_aipreferencesscreen, tenant_kycupload_kycuploadscreen, tenant_notifications_notificationsscreen, tenant_notificationsprefs_notificationprefsmodal [INFERRED 0.95]
- **Property listing concept group** — concept_property_listing, molecules_propertycard_propertycard, organisms_propertyhero_propertyhero, organisms_propertymappin_propertymappin, organisms_listingcomposer_listingcomposer [INFERRED 0.95]
- **Atomic design system layers** — concept_atomic_design_layers, atoms_avatar_avatar, atoms_sectionlabel_sectionlabel, atoms_statuspill_statuspill, atoms_toggle_toggle, molecules_menucard_menucard, organisms_floatingdock_floatingdock [INFERRED 0.95]
- **Expo + NativeWind + TypeScript toolchain** — config_package_json, config_app_json, config_babel_config, config_metro_config, config_tailwind, config_tsconfig, config_nativewind_env, config_eslint_config, config_prettier_config [EXTRACTED 1.00]
- **Expo App Branding Asset Set** — assets_icon, assets_adaptive_icon, assets_splash, assets_favicon, expo_project_assets [INFERRED 0.95]

## Communities (52 total, 14 thin omitted)

### Community 0 - "Expo SDK Dependencies"
Cohesion: 0.06
Nodes (33): dependencies, expo, expo-blur, expo-camera, expo-constants, expo-file-system, expo-font, @expo-google-fonts/dm-sans (+25 more)

### Community 1 - "StatusPill Component"
Cohesion: 0.09
Nodes (21): Props, Status, STATUS_STYLES, Status type union (8 states), StatusPill(), Property listing concept group (Card/Hero/MapPin/Composer), PropertyCard(), PropertyCardVariant (+13 more)

### Community 2 - "Expo App Config (app.json)"
Cohesion: 0.08
Nodes (25): backgroundColor, foregroundImage, adaptiveIcon, tsconfigPaths, typedRoutes, expo, android, assetBundlePatterns (+17 more)

### Community 3 - "Role Routing & Navigation"
Cohesion: 0.09
Nodes (18): RootLayout (auth/role routing), AIPreferencesScreen, expo-router Stack navigation, FilterModal Screen, PublicLandlordProfileScreen, MapScreen(), NotificationsScreen(), NotificationPrefsModal Screen (+10 more)

### Community 4 - "Package Dependencies"
Cohesion: 0.09
Nodes (22): devDependencies, @babel/core, eslint, eslint-config-expo, eslint-config-prettier, prettier, prettier-plugin-tailwindcss, tailwindcss (+14 more)

### Community 5 - "Atomic Design Components"
Cohesion: 0.12
Nodes (10): Avatar(), Props, Atomic design: atoms, molecules, organisms, FormField(), Props, Props, SearchBar(), FloatingDock() (+2 more)

### Community 7 - "Root Layout & Settings"
Cohesion: 0.24
Nodes (10): RootLayout(), RoleScreen(), SettingsScreen(), FloatingDock rendered with role-specific variant prop in each tab layout, AuthState, Role, useAuth, LandlordTabsLayout (+2 more)

### Community 8 - "Listing Detail & Modals"
Cohesion: 0.15
Nodes (5): Role-Based Routing, ScreenHeader(), Auth gate redirects unauthenticated users from loading screen, Role type: tenant | landlord | null, SavedScreen()

### Community 9 - "New Listing Creation Flow"
Cohesion: 0.22
Nodes (5): NewListingStep1(), NewListingStep2(), NewListingStep3(), NewListingStep4(), ListingsTab()

### Community 10 - "Expo/NativeWind Toolchain"
Cohesion: 0.33
Nodes (9): BasoBas design token palette (brand green, neutrals), app.json - BasoBas Expo app config, babel.config.js - nativewind/reanimated preset, metro.config.js - withNativeWind wrapper, nativewind-env.d.ts type reference, package.json - Expo 54 + React Native 0.81 + NativeWind, prettier.config.js - tailwindcss plugin, tailwind.config.js - nativewind preset + design tokens (+1 more)

### Community 11 - "Tenant Home & Notifications"
Cohesion: 0.29
Nodes (4): NotificationsScreen(), HomeTab(), LandlordDashboard(), SearchTab()

### Community 12 - "Profile & AI Preferences"
Cohesion: 0.25
Nodes (4): AIPreferencesScreen(), EditProfileScreen(), LandlordProfileTab(), ProfileTab()

### Community 13 - "Auth Funnel Screens"
Cohesion: 0.25
Nodes (4): LandingScreen(), LoadingScreen(), OTPScreen(), PhoneScreen()

### Community 14 - "Visits & Requests (Landlord)"
Cohesion: 0.29
Nodes (5): LandlordVisitsScreen(), ListingDetailScreen, RequestDetailScreen, RequestsTab(), TenantProfileScreen

### Community 15 - "FilterChip Component"
Cohesion: 0.29
Nodes (5): BG_MAP, ChipColor, ChipVariant, Props, TEXT_MAP

### Community 16 - "TypeScript Configuration"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 17 - "Branding Asset Set"
Cohesion: 0.73
Nodes (6): Android Adaptive Icon (basobas-app), Favicon (basobas-app), App Icon (basobas-app), Splash Screen (basobas-app), Graphify Knowledge Graph Concept, Expo Project Visual Assets

### Community 18 - "Feature Demo Screens"
Cohesion: 0.33
Nodes (3): FeatureMapScreen(), FeatureVerifiedScreen(), FeatureVisitsScreen()

### Community 19 - "KYC Verification Screens"
Cohesion: 0.40
Nodes (3): KYCLandlordScreen(), KYCTenantScreen(), VerificationScreen()

### Community 20 - "Menu Components"
Cohesion: 0.33
Nodes (4): MenuCard(), Props, MenuRow(), Props

### Community 21 - "Metro Bundler Config"
Cohesion: 0.67
Nodes (3): config, { getDefaultConfig }, { withNativeWind }

### Community 25 - "Profile Edit Screens"
Cohesion: 0.67
Nodes (3): EditProfileScreen, KYCUploadScreen, ListPropertyScreen

## Ambiguous Edges - Review These
- `ReportScreen()` → `PropertyDetailScreen`  [AMBIGUOUS]
  app/(tenant)/report.tsx · relation: conceptually_related_to

## Knowledge Gaps
- **126 isolated node(s):** `name`, `slug`, `version`, `scheme`, `favicon` (+121 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `ReportScreen()` and `PropertyDetailScreen`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `ScreenHeader()` connect `Listing Detail & Modals` to `StatusPill Component`, `My Reviews Screen`, `Tenant Profile Screen`, `List Property Screen`, `Role Routing & Navigation`, `Profile Setup Screens`, `Root Layout & Settings`, `Report Screen`, `New Listing Creation Flow`, `Visit Detail Screen`, `Tenant Home & Notifications`, `Profile & AI Preferences`, `Auth Funnel Screens`, `Visits & Requests (Landlord)`, `KYC Verification Screens`, `Property Reviews Screen`, `Filter Modal`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Why does `ListingComposer()` connect `StatusPill Component` to `Listing Detail & Modals`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ScreenHeader()` (e.g. with `Role-Based Routing` and `Role type: tenant | landlord | null`) actually correct?**
  _`ScreenHeader()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `useAuth` (e.g. with `RoleScreen()` and `SettingsScreen()`) actually correct?**
  _`useAuth` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _127 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Expo SDK Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._