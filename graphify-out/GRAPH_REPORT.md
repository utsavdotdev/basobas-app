# Graph Report - basobas-app  (2026-07-29)

## Corpus Check
- 151 files · ~75,081 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 901 nodes · 1148 edges · 79 communities (59 shown, 20 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `09b9699f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Property Detail Screen|Property Detail Screen]]
- [[_COMMUNITY_Property Reviews Screen|Property Reviews Screen]]
- [[_COMMUNITY_Filter Modal|Filter Modal]]
- [[_COMMUNITY_Project README|Project README]]
- [[_COMMUNITY_My Reviews Screen|My Reviews Screen]]
- [[_COMMUNITY_Tenant Profile Screen|Tenant Profile Screen]]
- [[_COMMUNITY_List Property Screen|List Property Screen]]
- [[_COMMUNITY_Report Screen|Report Screen]]
- [[_COMMUNITY_Visit Detail Screen|Visit Detail Screen]]
- [[_COMMUNITY_Auth Layout Concept|Auth Layout Concept]]
- [[_COMMUNITY_KYC Flow Concept|KYC Flow Concept]]
- [[_COMMUNITY_Listing Creation Concept|Listing Creation Concept]]
- [[_COMMUNITY_Visit Request Concept|Visit Request Concept]]
- [[_COMMUNITY_ESLint Config Detail|ESLint Config Detail]]
- [[_COMMUNITY_Landlord Layout Concept|Landlord Layout Concept]]
- [[_COMMUNITY_My Reviews Concept|My Reviews Concept]]
- [[_COMMUNITY_Visits Tab Concept|Visits Tab Concept]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
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

## God Nodes (most connected - your core abstractions)
1. `ScreenHeader()` - 20 edges
2. `expo` - 15 edges
3. `ok()` - 15 edges
4. `err()` - 15 edges
5. `BasoBas — Tenant Experience` - 15 edges
6. `useAuthStore` - 14 edges
7. `useOnboardingStore` - 14 edges
8. `BasoBas — Landlord Experience` - 13 edges
9. `BasoBas — Visit Request Workflow` - 13 edges
10. `getErrorMessage()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `App Icon (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/icon.png → CLAUDE.md
- `Android Adaptive Icon (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/adaptive-icon.png → CLAUDE.md
- `Splash Screen (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/splash.png → CLAUDE.md
- `Favicon (basobas-app)` --references--> `Expo Project Visual Assets`  [INFERRED]
  assets/favicon.png → CLAUDE.md
- `LandlordDashboard()` --calls--> `useAuthStore`  [INFERRED]
  app/(landlord)/(tabs)/index.tsx → src/store/authStore.ts

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

## Communities (79 total, 20 thin omitted)

### Community 0 - "Expo SDK Dependencies"
Cohesion: 0.04
Nodes (47): dependencies, @clerk/expo, expo, expo-blur, expo-camera, expo-constants, expo-crypto, expo-document-picker (+39 more)

### Community 1 - "StatusPill Component"
Cohesion: 0.06
Nodes (29): Amenity, AMENITY_ICONS, FORMATTER, { height: SCREEN_HEIGHT }, ListingDetail, ListingDetailScreenProps, MOCK_LISTING, Owner (+21 more)

### Community 2 - "Expo App Config (app.json)"
Cohesion: 0.07
Nodes (28): backgroundColor, foregroundImage, adaptiveIcon, newArchEnabled, package, tsconfigPaths, typedRoutes, expo (+20 more)

### Community 3 - "Role Routing & Navigation"
Cohesion: 0.05
Nodes (23): RootLayout (auth/role routing), LandlordVisitsScreen(), Props, ScreenHeader(), ListingDetailScreen, Props, RequestDetailScreen, TenantProfileScreen (+15 more)

### Community 4 - "Package Dependencies"
Cohesion: 0.08
Nodes (23): devDependencies, @babel/core, babel-preset-expo, eslint, eslint-config-expo, eslint-config-prettier, prettier, prettier-plugin-tailwindcss (+15 more)

### Community 5 - "Atomic Design Components"
Cohesion: 0.17
Nodes (11): DockTab, DockTabProps, styles, LANDLORD_DOCK_ITEMS, TENANT_DOCK_ITEMS, GlassDock(), styles, FloatingDock (+3 more)

### Community 6 - "Profile Setup Screens"
Cohesion: 0.12
Nodes (8): ActivityItem, DEFAULT_ACTIVITY, DEFAULT_INSIGHTS, DEFAULT_STATS, InsightItem, LandlordDashboardProps, s, StatItem

### Community 7 - "Root Layout & Settings"
Cohesion: 1.00
Nodes (3): FloatingDock rendered with role-specific variant prop in each tab layout, LandlordTabsLayout, TenantTabsLayout

### Community 8 - "Listing Detail & Modals"
Cohesion: 0.15
Nodes (13): EMPTY_COPY, formatDate(), subtitleFor(), TabKey, TABS, Visit, VisitCard(), VISITS (+5 more)

### Community 9 - "New Listing Creation Flow"
Cohesion: 0.07
Nodes (24): NewListingStep1(), PropertyType, styles, TYPES, AMENITIES_APARTMENT, AMENITIES_HOUSE, AMENITIES_ROOM, AMENITIES_STUDIO (+16 more)

### Community 10 - "Expo/NativeWind Toolchain"
Cohesion: 0.33
Nodes (9): BasoBas design token palette (brand green, neutrals), app.json - BasoBas Expo app config, babel.config.js - nativewind/reanimated preset, metro.config.js - withNativeWind wrapper, nativewind-env.d.ts type reference, package.json - Expo 54 + React Native 0.81 + NativeWind, prettier.config.js - tailwindcss plugin, tailwind.config.js - nativewind preset + design tokens (+1 more)

### Community 11 - "Tenant Home & Notifications"
Cohesion: 0.12
Nodes (15): BasoBas Design System, Border Radius, Buttons, Cards, Colors, Components, Do's and Don'ts, Elevation (+7 more)

### Community 12 - "Profile & AI Preferences"
Cohesion: 0.13
Nodes (32): styles, err(), getErrorMessage(), ok(), Result, KYCInput, KYCResult, submitKYC() (+24 more)

### Community 13 - "Auth Funnel Screens"
Cohesion: 0.29
Nodes (5): BG_MAP, ChipColor, ChipVariant, Props, TEXT_MAP

### Community 14 - "Visits & Requests (Landlord)"
Cohesion: 0.15
Nodes (10): FilterTab, formatPrice(), FORMATTER, LandlordProperty, MyPropertiesScreenProps, PROPERTIES_DATA, PropertyCard(), PropertyStatus (+2 more)

### Community 15 - "FilterChip Component"
Cohesion: 0.29
Nodes (5): RequestStatus, Tab, TABS, VISIT_REQUESTS, VisitRequest

### Community 16 - "TypeScript Configuration"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 17 - "Branding Asset Set"
Cohesion: 0.73
Nodes (6): Android Adaptive Icon (basobas-app), Favicon (basobas-app), App Icon (basobas-app), Splash Screen (basobas-app), Graphify Knowledge Graph Concept, Expo Project Visual Assets

### Community 18 - "Feature Demo Screens"
Cohesion: 0.05
Nodes (39): 1. Property Discovery, 1. Receive Request, 2. Request Creation, 2. Take Action on Request, 3. Awaiting Response, 3. Post-Visit Follow-Up, 48-Hour Reminder, 4. Managing Multiple Applicants (+31 more)

### Community 19 - "KYC Verification Screens"
Cohesion: 0.06
Nodes (44): DocTypeChipProps, DocumentUploadZoneProps, KYCLandlordScreen(), styles, DocTypeChipProps, DocumentUploadZoneProps, KYCTenantScreen(), styles (+36 more)

### Community 20 - "Menu Components"
Cohesion: 0.13
Nodes (14): Props, SectionLabel(), MenuCard(), Props, MenuRow(), Props, INITIAL_PROFILE, UserProfile (+6 more)

### Community 21 - "Metro Bundler Config"
Cohesion: 0.67
Nodes (3): config, { getDefaultConfig }, { withNativeWind }

### Community 22 - "SectionLabel Atom"
Cohesion: 0.67
Nodes (3): Role-Based Routing, Auth gate redirects unauthenticated users from loading screen, Role type: tenant | landlord | null

### Community 23 - "Toggle Atom"
Cohesion: 0.33
Nodes (5): OTPCell, OTPCellProps, OTPInput, OTPInputProps, styles

### Community 25 - "Profile Edit Screens"
Cohesion: 0.67
Nodes (3): EditProfileScreen, KYCUploadScreen, ListPropertyScreen

### Community 26 - "Property Detail Screen"
Cohesion: 0.07
Nodes (29): Add New Listing Flow (4 Steps), Add New Listing Prompt (Bottom of List), All Applicants Screen, BasoBas — Landlord Experience, Everything the Landlord Sees and Does, Filter Tab Bar, Header, Landlord Bottom Navigation Dock (+21 more)

### Community 27 - "Property Reviews Screen"
Cohesion: 0.07
Nodes (27): BasoBas — Tenant Experience, Category Chips (Horizontal Scroll), Content Area (Scrollable), Content Sections (Top to Bottom), Everything the Tenant Sees and Does, Filter Options, Gallery Header, Header (Fixed, Always Visible) (+19 more)

### Community 31 - "Filter Modal"
Cohesion: 0.29
Nodes (5): ScreenBody(), ScreenBodyProps, ScreenBodyWithActionProps, CITIES, City

### Community 33 - "My Reviews Screen"
Cohesion: 0.11
Nodes (16): FeatureSlide, s, SLIDES, MapIllustration(), styles, NextButton, NextButtonProps, OnboardingLayoutProps (+8 more)

### Community 34 - "Tenant Profile Screen"
Cohesion: 0.11
Nodes (18): BasoBas — Authentication & Onboarding Flow, Every Step, Every Rule, Every Decision, KYC Verification States, OTP Technical Rules, Profile Setup Rules, Returning User Flow, Screen 01 — Landing Screen, Screen 02 — Phone Entry Screen (+10 more)

### Community 36 - "List Property Screen"
Cohesion: 0.11
Nodes (17): 1. Privacy First — The Address Rule, 2. No Broker, No Commission, 3. Verification Builds Trust, 4. Phone Number Is Identity, 5. Broker Replacement, Not Broker Supplement, BasoBas — Product Vision, Core Principles, Dual Role Users (+9 more)

### Community 37 - "Report Screen"
Cohesion: 0.33
Nodes (4): DayOption, DAYS, styles, TIME_SLOTS

### Community 39 - "Visit Detail Screen"
Cohesion: 0.18
Nodes (6): DetailRowProps, MOCK_VISIT, STATUS_STYLES, styles, SummaryCardProps, VisitData

### Community 52 - "Community 52"
Cohesion: 0.06
Nodes (27): AMENITIES, Amenity, FilterDrawer(), PROPERTY_TYPES, PropertyType, SortOption, SORTS, NotificationPrefsModal() (+19 more)

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (8): BasoBas — Project Documentation Index, Critical Rules — Read Before Anything Else, Documentation Files, Platform, Reading Order by Role, Rental Marketplace App for Nepal · Version 1.0, The Problem in One Paragraph, What is BasoBas?

### Community 54 - "Community 54"
Cohesion: 0.25
Nodes (7): BasoBas — Complete Feature List, Core Features — Free for All Users, Every Feature, Who It Serves, and Whether It Is Free or Pro, Features That Will Never Be Gated, Free Tier Limits, Post-MVP Roadmap Features, Pro Features — Tenant Only, Paid Plan

### Community 55 - "Community 55"
Cohesion: 0.05
Nodes (33): AuthGate(), ConfirmationScreen(), DetailRowProps, styles, SummaryCardProps, LoadingScreen(), styles, maskPhone() (+25 more)

### Community 58 - "Community 58"
Cohesion: 0.15
Nodes (8): getRadiusCircleSizeForKm(), RadiusMapView(), RadiusMapViewProps, RING_COLORS, ALL_NEARBY, NearbyProperty, NEPAL_LOCATIONS, SearchLocation

### Community 61 - "Community 61"
Cohesion: 0.33
Nodes (4): PropertyCardVariant, Props, STATUS_BADGES, StatusOverlay

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (4): DayOption, DAYS, styles, TIME_SLOTS

### Community 63 - "Community 63"
Cohesion: 0.40
Nodes (3): Listing, MOCK_LISTINGS, styles

### Community 64 - "Community 64"
Cohesion: 0.40
Nodes (3): Props, Status, STATUS_STYLES

### Community 65 - "Community 65"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 67 - "Community 67"
Cohesion: 0.67
Nodes (4): NotificationsScreen(), dockBottomReserve(), HomeTab(), LandlordDashboard()

## Ambiguous Edges - Review These
- `ReportScreen()` → `PropertyDetailScreen`  [AMBIGUOUS]
  app/(tenant)/report.tsx · relation: conceptually_related_to

## Knowledge Gaps
- **478 isolated node(s):** `name`, `slug`, `version`, `scheme`, `favicon` (+473 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `ReportScreen()` and `PropertyDetailScreen`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `LandlordDashboard()` connect `Community 67` to `New Listing Creation Flow`, `Profile Setup Screens`, `Community 55`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `useAuthStore` connect `Community 55` to `Community 67`, `Profile & AI Preferences`, `Profile Setup Screens`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `usePropertyStore` connect `Community 52` to `Community 67`, `Filter Modal`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _479 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Expo SDK Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `StatusPill Component` be split into smaller, more focused modules?**
  _Cohesion score 0.06401137980085349 - nodes in this community are weakly interconnected._