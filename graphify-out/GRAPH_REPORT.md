# Graph Report - basobas-app  (2026-08-25)

## Corpus Check
- 269 files · ~166,391 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1582 nodes · 3111 edges · 102 communities (91 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f992ba31`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Edit Profile & Share Details|Edit Profile & Share Details]]
- [[_COMMUNITY_Pro Gate & Plans|Pro Gate & Plans]]
- [[_COMMUNITY_Dependency Ecosystem|Dependency Ecosystem]]
- [[_COMMUNITY_Map Camera & Location|Map Camera & Location]]
- [[_COMMUNITY_Auth & Root Layout|Auth & Root Layout]]
- [[_COMMUNITY_Notifications Inbox|Notifications Inbox]]
- [[_COMMUNITY_KYC Document Selector|KYC Document Selector]]
- [[_COMMUNITY_App Configuration|App Configuration]]
- [[_COMMUNITY_Function Entry Points|Function Entry Points]]
- [[_COMMUNITY_AI Preferences Screen|AI Preferences Screen]]
- [[_COMMUNITY_Onboarding Flow|Onboarding Flow]]
- [[_COMMUNITY_Build Tooling|Build Tooling]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Landlord Dashboard|Landlord Dashboard]]
- [[_COMMUNITY_Listing Detail Amenities|Listing Detail Amenities]]
- [[_COMMUNITY_KYC Rejection Notice|KYC Rejection Notice]]
- [[_COMMUNITY_Glass Dock Navigation|Glass Dock Navigation]]
- [[_COMMUNITY_Property Detail Screen|Property Detail Screen]]
- [[_COMMUNITY_Listing Wizard Amenities|Listing Wizard Amenities]]
- [[_COMMUNITY_Property Type Mappers|Property Type Mappers]]
- [[_COMMUNITY_Screen Body Layout|Screen Body Layout]]
- [[_COMMUNITY_Auth Loading Screens|Auth Loading Screens]]
- [[_COMMUNITY_Visit Status & Dates|Visit Status & Dates]]
- [[_COMMUNITY_Filter Drawer|Filter Drawer]]
- [[_COMMUNITY_Visits Store State|Visits Store State]]
- [[_COMMUNITY_Profile Setup Form|Profile Setup Form]]
- [[_COMMUNITY_Suggest Time Picker|Suggest Time Picker]]
- [[_COMMUNITY_Notification Prefs Icons|Notification Prefs Icons]]
- [[_COMMUNITY_Schedule Visit Drawer|Schedule Visit Drawer]]
- [[_COMMUNITY_Tenant Root Layout|Tenant Root Layout]]
- [[_COMMUNITY_KYC Confirmation Screen|KYC Confirmation Screen]]
- [[_COMMUNITY_Landlord KYC Upload|Landlord KYC Upload]]
- [[_COMMUNITY_Tenant KYC Upload|Tenant KYC Upload]]
- [[_COMMUNITY_Design System Docs|Design System Docs]]
- [[_COMMUNITY_Core Database Schema|Core Database Schema]]
- [[_COMMUNITY_Listing Step 4 Details|Listing Step 4 Details]]
- [[_COMMUNITY_Follow-up Responses|Follow-up Responses]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Landlord Visits & Requests|Landlord Visits & Requests]]
- [[_COMMUNITY_Property Store Filters|Property Store Filters]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Clerk Auth Migrations|Clerk Auth Migrations]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Visits Empty States|Visits Empty States]]
- [[_COMMUNITY_Filter Modal|Filter Modal]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Filter Chips|Filter Chips]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_eSewa Payment Flow|eSewa Payment Flow]]
- [[_COMMUNITY_OTP Input|OTP Input]]
- [[_COMMUNITY_Landlord Properties Migration|Landlord Properties Migration]]
- [[_COMMUNITY_Property Card|Property Card]]
- [[_COMMUNITY_KYC Benefits List|KYC Benefits List]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Tenant Visit Workflow|Tenant Visit Workflow]]
- [[_COMMUNITY_Listing Step 1 Types|Listing Step 1 Types]]
- [[_COMMUNITY_Visit Status Badge|Visit Status Badge]]
- [[_COMMUNITY_App Icon Assets|App Icon Assets]]
- [[_COMMUNITY_Deno Function Config|Deno Function Config]]
- [[_COMMUNITY_Deno Function Config|Deno Function Config]]
- [[_COMMUNITY_Deno Function Config|Deno Function Config]]
- [[_COMMUNITY_Deno Function Config|Deno Function Config]]
- [[_COMMUNITY_Deno Function Config|Deno Function Config]]
- [[_COMMUNITY_Metro Config|Metro Config]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Deno Function Config|Deno Function Config]]
- [[_COMMUNITY_Deno Function Config|Deno Function Config]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Form Field|Form Field]]
- [[_COMMUNITY_Toggle|Toggle]]
- [[_COMMUNITY_Dock State Hook|Dock State Hook]]
- [[_COMMUNITY_Search This Area Button|Search This Area Button]]
- [[_COMMUNITY_KYC Fix Migration|KYC Fix Migration]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Landlord Verification Sync|Landlord Verification Sync]]
- [[_COMMUNITY_Property Map Pin|Property Map Pin]]
- [[_COMMUNITY_Review Card|Review Card]]
- [[_COMMUNITY_Search Bar|Search Bar]]
- [[_COMMUNITY_Home Index|Home Index]]
- [[_COMMUNITY_Share Confirmation|Share Confirmation]]
- [[_COMMUNITY_Map Radius RPC|Map Radius RPC]]
- [[_COMMUNITY_Graphify Workflow|Graphify Workflow]]
- [[_COMMUNITY_Delete Account RLS|Delete Account RLS]]
- [[_COMMUNITY_Community 103|Community 103]]
- [[_COMMUNITY_Community 105|Community 105]]
- [[_COMMUNITY_Community 106|Community 106]]
- [[_COMMUNITY_Community 108|Community 108]]
- [[_COMMUNITY_Community 110|Community 110]]

## God Nodes (most connected - your core abstractions)
1. `useClerkSupabase()` - 90 edges
2. `ok()` - 76 edges
3. `err()` - 74 edges
4. `getErrorMessage()` - 74 edges
5. `c` - 28 edges
6. `font` - 26 edges
7. `useVisitsStore` - 25 edges
8. `Database` - 23 edges
9. `radius` - 22 edges
10. `ScreenHeader()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `PhoneEntryScreen()` --calls--> `useAuth()`  [INFERRED]
  app/(auth)/phone.tsx → src/hooks/useAuth.ts
- `LandlordDashboard()` --calls--> `useClerkSupabase()`  [INFERRED]
  app/(landlord)/(tabs)/index.tsx → src/hooks/useClerkSupabase.ts
- `LandlordDashboard()` --calls--> `useAuthStore`  [INFERRED]
  app/(landlord)/(tabs)/index.tsx → src/store/authStore.ts
- `MyPropertiesScreen()` --calls--> `useClerkSupabase()`  [EXTRACTED]
  app/(landlord)/(tabs)/listings.tsx → src/hooks/useClerkSupabase.ts
- `LandlordProfileTab()` --calls--> `useClerkSupabase()`  [INFERRED]
  app/(landlord)/(tabs)/profile.tsx → src/hooks/useClerkSupabase.ts

## Import Cycles
- 1-file cycle: `metro.config.js -> metro.config.js`

## Hyperedges (group relationships)
- **eSewa Payment Function Pipeline** — docs_esewa_payment_testing_create_order, docs_esewa_payment_testing_verify_payment, docs_esewa_payment_testing_failure_callback, docs_esewa_payment_testing_status_polling [INFERRED 0.85]
- **Visit workflow visual concepts** — onboarding_visitillustration_visitillustration, onboarding_verifiedillustration_verifiedillustration, concept_visit_status_lifecycle, concept_post_visit_followup, concept_location_unlock_rule, app_vision_visit_request_workflow [INFERRED 0.85]
- **Landlord Listing Detail Data Flow** — previous_context_listing_detail_rewire, previous_context_owner_profile, previous_context_property_stats, previous_context_property_pause [INFERRED 0.85]

## Communities (102 total, 11 thin omitted)

### Community 0 - "Edit Profile & Share Details"
Cohesion: 0.05
Nodes (112): NEPAL_CITIES, styles, err(), getErrorMessage(), ok(), Result, DashboardActivity, getLandlordDashboard() (+104 more)

### Community 1 - "Pro Gate & Plans"
Cohesion: 0.22
Nodes (5): EsewaFormFields, PlanId, PurchasePlanState, styles, WEBVIEW_UA

### Community 2 - "Dependency Ecosystem"
Cohesion: 0.04
Nodes (51): dependencies, @clerk/expo, expo, expo-blur, expo-camera, expo-constants, expo-crypto, expo-document-picker (+43 more)

### Community 3 - "Map Camera & Location"
Cohesion: 0.12
Nodes (19): useLocation(), UseLocationResult, DEFAULT_LOCATION, LandlordLocationPicker(), styles, AndroidMap, AppMapViewHandle, AppMapViewProps (+11 more)

### Community 4 - "Auth & Root Layout"
Cohesion: 0.20
Nodes (8): FilterTab, FORMATTER, MyPropertiesScreen(), MyPropertiesScreenProps, STATUS_STYLES, TABS, LandlordPropertySummary, PropertyStatusUi

### Community 5 - "Notifications Inbox"
Cohesion: 0.08
Nodes (31): LANDLORD_TABS, NotificationsEmptyState(), initialsOf(), NotificationRow(), NotificationRowProps, NotificationSectionProps, NotificationsList(), NotificationsListProps (+23 more)

### Community 6 - "KYC Document Selector"
Cohesion: 0.12
Nodes (14): DocumentTypeSelector(), DocumentTypeSelectorProps, KYCDocumentType, Option, OPTIONS, styles, formatDuration(), styles (+6 more)

### Community 7 - "App Configuration"
Cohesion: 0.06
Nodes (31): backgroundColor, foregroundImage, adaptiveIcon, config, newArchEnabled, package, permissions, versionCode (+23 more)

### Community 8 - "Function Entry Points"
Cohesion: 0.10
Nodes (26): getJwks(), getJwksUrl(), verifyClerkJwt(), arrayBufferToBase64(), checkEsewaTransactionStatus(), generateSignature(), getEsewaConfig(), grantUserPass() (+18 more)

### Community 9 - "AI Preferences Screen"
Cohesion: 0.10
Nodes (6): Props, ScreenHeader(), Props, AIPreferencesScreen(), GENERAL_REASONS, REASON_INFO

### Community 10 - "Onboarding Flow"
Cohesion: 0.11
Nodes (16): FeatureSlide, s, SLIDES, MapIllustration(), styles, NextButton, NextButtonProps, OnboardingLayoutProps (+8 more)

### Community 11 - "Build Tooling"
Cohesion: 0.12
Nodes (17): devDependencies, @babel/core, babel-preset-expo, eslint, eslint-config-expo, eslint-config-prettier, jest, patch-package (+9 more)

### Community 12 - "Project Documentation"
Cohesion: 0.05
Nodes (51): Authentication & Onboarding Flow, Features List, Landlord Experience, Project Documentation Index, Product Vision, Tenant Experience, Visit Request Workflow, Address Privacy Rule (+43 more)

### Community 13 - "Landlord Dashboard"
Cohesion: 0.08
Nodes (12): dockBottomReserve(), ScreenBody(), ScreenBodyProps, ScreenBodyWithActionProps, LandlordDashboard, ActivityItem, EMPTY_STATS, InsightItem (+4 more)

### Community 14 - "Listing Detail Amenities"
Cohesion: 0.10
Nodes (15): AMENITY_ICONS, AMENITY_LABELS, AmenityRow, EXTRA_DETAIL_ICONS, EXTRA_DETAIL_LABELS, ExtraDetailRow, FORMATTER, { height: SCREEN_HEIGHT } (+7 more)

### Community 15 - "KYC Rejection Notice"
Cohesion: 0.14
Nodes (13): KYCRejectionNotice(), Props, styles, formatDateTime(), LandlordVerificationScreen(), styles, Props, SectionLabel() (+5 more)

### Community 16 - "Glass Dock Navigation"
Cohesion: 0.19
Nodes (11): DockTab, DockTabProps, styles, LANDLORD_DOCK_ITEMS, TENANT_DOCK_ITEMS, GlassDock(), styles, FloatingDock (+3 more)

### Community 17 - "Property Detail Screen"
Cohesion: 0.13
Nodes (15): AMENITY_ICONS, AMENITY_LABELS, AmenityRow, EXTRA_DETAIL_ICONS, EXTRA_DETAIL_LABELS, ExtraDetailRow, fmtNpr(), { height: SCREEN_HEIGHT } (+7 more)

### Community 18 - "Listing Wizard Amenities"
Cohesion: 0.19
Nodes (11): ProGateState, useProGate(), useProGateStore, ProGateModal(), MenuCard(), Props, MenuRow(), Props (+3 more)

### Community 19 - "Property Type Mappers"
Cohesion: 0.05
Nodes (50): countSelected(), DetailRow, MediaItem, NewListingStep4(), parseJSON(), styles, run(), CreateVisitRequestInput (+42 more)

### Community 20 - "Screen Body Layout"
Cohesion: 0.10
Nodes (25): useClerkSupabase(), useLandlordPendingCount(), useNotificationsRealtime(), useProfileBootstrap(), useVisitRealtime(), DeclineRequestScreen(), REASONS, styles (+17 more)

### Community 21 - "Auth Loading Screens"
Cohesion: 0.17
Nodes (12): scripts, android, format, ios, lint, postinstall, prebuild, preview:android (+4 more)

### Community 22 - "Visit Status & Dates"
Cohesion: 0.10
Nodes (27): LABEL_TO_CHIP, LandlordVisitsScreen(), initialsOf(), LandlordVisitRequest, TenantVisitRequest, TenantVisitStatusUi, TIME_SLOT_LABELS, VisitStatusLabel (+19 more)

### Community 23 - "Filter Drawer"
Cohesion: 0.13
Nodes (14): APK_SRC, APP_JSON, argv, BUMP_LEVELS, bumpVersion(), draft, GRADLE, main() (+6 more)

### Community 24 - "Visits Store State"
Cohesion: 0.29
Nodes (5): DocumentUploadCard(), DocumentUploadCardProps, styles, styles, UploadPlaceholder()

### Community 25 - "Profile Setup Form"
Cohesion: 0.20
Nodes (8): NEPAL_CITIES, PREFERENCES, ProfileFormValues, profileSchema, styles, Props, StepProgressBar(), styles

### Community 26 - "Suggest Time Picker"
Cohesion: 0.07
Nodes (39): PrimaryButton(), Props, styles, c, sp, Button(), ButtonProps, LABEL_COLORS (+31 more)

### Community 27 - "Notification Prefs Icons"
Cohesion: 0.15
Nodes (4): NotificationPrefsModal(), NotifRowProps, styles, ToggleProps

### Community 28 - "Schedule Visit Drawer"
Cohesion: 0.18
Nodes (10): DEFAULT_TIME_SLOTS, formatDateLong(), isPastDate(), MONTH_NAMES, MonthGridDay, ScheduleSelection, ScheduleVisitDrawer(), ScheduleVisitDrawerProps (+2 more)

### Community 29 - "Tenant Root Layout"
Cohesion: 0.33
Nodes (6): ListingDetailScreen(), PropertyPreviewSheet(), sheetStyles, PropertyCard(), PROPERTY_STATUS_COLORS, formatMonthlyPrice()

### Community 30 - "KYC Confirmation Screen"
Cohesion: 0.40
Nodes (4): main, name, private, version

### Community 31 - "Landlord KYC Upload"
Cohesion: 0.06
Nodes (33): 1. Property Discovery, 1. Receive Request, 2. Request Creation, 2. Take Action on Request, 3. Awaiting Response, 3. Post-Visit Follow-Up, 4. Managing Multiple Applicants, 4a. Accepted Path (+25 more)

### Community 32 - "Tenant KYC Upload"
Cohesion: 0.06
Nodes (31): 1. Unit Test Cases, 2. Integration Test Cases, 3. System Test Cases — End-to-End Journeys, 4. KYC AI Verification — Evaluation Test Cases, 5.2 Testing — Detailed Test Cases, 5. Security Test Cases, 6. Usability Test Cases, 7. Traceability Summary (+23 more)

### Community 33 - "Design System Docs"
Cohesion: 0.08
Nodes (25): UI & Figma Implementation Rules, BasoBas Design System, Border Radius, Button Styles (Primary/Secondary/Ghost), Buttons, Cards, Colors, Components (+17 more)

### Community 35 - "Core Database Schema"
Cohesion: 0.07
Nodes (29): Add New Listing Flow (4 Steps), Add New Listing Prompt (Bottom of List), All Applicants Screen, BasoBas — Landlord Experience, Everything the Landlord Sees and Does, Filter Tab Bar, Header, Landlord Bottom Navigation Dock (+21 more)

### Community 36 - "Listing Step 4 Details"
Cohesion: 0.12
Nodes (14): AMENITIES_APARTMENT, AMENITIES_HOUSE, AMENITIES_ROOM, AMENITIES_STUDIO, BATHROOM_OPTIONS, FieldErrors, FURNISHING, KITCHEN_OPTIONS (+6 more)

### Community 37 - "Follow-up Responses"
Cohesion: 0.07
Nodes (27): BasoBas — Tenant Experience, Category Chips (Horizontal Scroll), Content Area (Scrollable), Content Sections (Top to Bottom), Everything the Tenant Sees and Does, Filter Options, Gallery Header, Header (Fixed, Always Visible) (+19 more)

### Community 38 - "Community 38"
Cohesion: 0.20
Nodes (10): HERO_BY_STATUS, HeroConfig, KYCStatusHero(), Props, styles, Props, Status, STATUS_STYLES (+2 more)

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (7): { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }, GeoJsonFeature, PropertyPreviewSheetProps, CameraPosition, ClusterFeature, MapBounds, PropertyPin

### Community 40 - "Landlord Visits & Requests"
Cohesion: 0.06
Nodes (50): AllApplicantsScreen(), ChipKey, CHIPS, styles, UI_TO_PILL, styles, DetailsSharedScreen(), styles (+42 more)

### Community 41 - "Property Store Filters"
Cohesion: 0.22
Nodes (6): CityFilter, INITIAL_FILTERS, PropertyFilters, PropertyStore, SavedScreen(), PropertyPublic

### Community 42 - "Community 42"
Cohesion: 0.09
Nodes (26): usePurchasePlan(), IconComponent, ProPill(), Props, Size, Variant, INITIAL_PROFILE, proDaysRemaining() (+18 more)

### Community 43 - "Clerk Auth Migrations"
Cohesion: 0.13
Nodes (18): buildDays(), compactVisit(), DayOption, LandlordRescheduleScreen(), MONTHS, SLOT_START, styles, TIMES (+10 more)

### Community 44 - "Community 44"
Cohesion: 0.19
Nodes (10): AMENITIES, FilterDrawer(), FilterDrawerProps, PROPERTY_TYPES, SORT_OPTIONS, BhkFilter, usePropertyStore, BHK_FILTERS (+2 more)

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (6): DocTypeChipProps, DocumentUploadZoneProps, styles, OnboardingEyebrow(), Props, styles

### Community 47 - "Visits Empty States"
Cohesion: 0.09
Nodes (27): EMPTY_COPY, OPEN_UI, TabKey, TABS, font, radius, status, StatusKey (+19 more)

### Community 48 - "Filter Modal"
Cohesion: 0.25
Nodes (6): AMENITIES, Amenity, FilterDrawer(), PROPERTY_TYPES, SortOption, SORTS

### Community 49 - "Community 49"
Cohesion: 0.25
Nodes (6): DocTypeChipProps, DocumentUploadZoneProps, KYCTenantScreen(), styles, useDocumentPicker(), DocumentType

### Community 50 - "Filter Chips"
Cohesion: 0.29
Nodes (5): BG_MAP, ChipColor, ChipVariant, Props, TEXT_MAP

### Community 51 - "TypeScript Config"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 52 - "eSewa Payment Flow"
Cohesion: 0.33
Nodes (6): create-esewa-order Edge Function, eSewa v2 Payment Flow, esewa-payment-failed Edge Function, check-payment-status Edge Function, products / transactions / user_passes Tables, verify-esewa-payment Edge Function

### Community 53 - "OTP Input"
Cohesion: 0.33
Nodes (5): OTPCell, OTPCellProps, OTPInput, OTPInputProps, styles

### Community 54 - "Landlord Properties Migration"
Cohesion: 0.11
Nodes (17): 1. Privacy First — The Address Rule, 2. No Broker, No Commission, 3. Verification Builds Trust, 4. Phone Number Is Identity, 5. Broker Replacement, Not Broker Supplement, BasoBas — Product Vision, Core Principles, Dual Role Users (+9 more)

### Community 56 - "Property Card"
Cohesion: 0.33
Nodes (4): PropertyCardVariant, Props, STATUS_BADGES, StatusOverlay

### Community 57 - "KYC Benefits List"
Cohesion: 0.15
Nodes (12): DocumentUploadCardStatus, Benefit, BENEFITS, KYCBenefitsList(), styles, SlotState, KYCUploadScreen(), SlotState (+4 more)

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (6): RoleCardProps, ROLES, styles, OnboardingHeader(), Props, styles

### Community 59 - "Tenant Visit Workflow"
Cohesion: 0.15
Nodes (12): 1. Create an eSewa Order, 2. Verify the Database, 3. Simulate the eSewa Callback (Verify Payment), 4. Simulate a Failure Callback, 5. Check Payment Status (Polling), End-to-End Test Flow, eSewa v2 (Test/UAT) Payment — Testing Guide, Flow Overview (+4 more)

### Community 60 - "Listing Step 1 Types"
Cohesion: 0.40
Nodes (3): PropertyType, styles, TYPES

### Community 62 - "Visit Status Badge"
Cohesion: 0.40
Nodes (3): Props, STATUS_STYLES, VisitStatus

### Community 63 - "App Icon Assets"
Cohesion: 1.00
Nodes (4): Android Adaptive Icon (basobas-app), Favicon (basobas-app), App Icon (basobas-app), Splash Screen (basobas-app)

### Community 64 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 65 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 66 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 67 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 68 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 70 - "Metro Config"
Cohesion: 0.67
Nodes (3): config, { getDefaultConfig }, { withNativeWind }

### Community 71 - "Community 71"
Cohesion: 0.42
Nodes (8): initialKYC, initialProfile, OnboardingState, OnboardingKYCData, OnboardingPayload, OnboardingProfileData, PropertyPreference, UserRole

### Community 72 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 73 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 81 - "KYC Fix Migration"
Cohesion: 0.22
Nodes (8): BasoBas — Project Documentation Index, Critical Rules — Read Before Anything Else, Documentation Files, Platform, Reading Order by Role, Rental Marketplace App for Nepal · Version 1.0, The Problem in One Paragraph, What is BasoBas?

### Community 82 - "Community 82"
Cohesion: 0.16
Nodes (9): ConfirmationScreen(), DetailRowProps, styles, SummaryCardProps, KYCLandlordScreen(), ProfileSetupScreen(), useAvatarPicker(), RoleSelectionScreen() (+1 more)

### Community 83 - "Landlord Verification Sync"
Cohesion: 0.38
Nodes (5): PublicLandlordProfileScreen(), styles, verificationLabel(), yearOf(), LandlordVerificationStatus

### Community 87 - "Home Index"
Cohesion: 0.10
Nodes (21): KEYHOLE, morph, SplashScreen(), styles, AuthGate(), maskPhone(), OTPVerificationScreen(), s (+13 more)

### Community 91 - "Share Confirmation"
Cohesion: 0.47
Nodes (4): calculateRiskScore(), clamp(), RISK_SCORE_WEIGHTS, RiskScoreInput

### Community 93 - "Map Radius RPC"
Cohesion: 0.50
Nodes (4): countryCodeToFlag(), PhoneEntryScreen(), PREFERRED, styles

### Community 98 - "Delete Account RLS"
Cohesion: 0.70
Nodes (3): fuzzyNameMatch(), levenshtein(), normalizeName()

### Community 103 - "Community 103"
Cohesion: 0.60
Nodes (3): normalizeNepalPhone(), PhoneNormalizationResult, stripDialingNoise()

### Community 108 - "Community 108"
Cohesion: 0.24
Nodes (10): COL_WIDTH, formatTime(), KYCStatusTimeline(), Props, resolveActiveStep(), Step, StepKey, STEPS (+2 more)

### Community 110 - "Community 110"
Cohesion: 0.18
Nodes (9): pickFromOptions(), ContextRules, DOCUMENT_MIME_TYPES, IMAGE_MIME_TYPES, MediaValidationContext, MediaValidationResult, RULES, validateImageAsset() (+1 more)

## Knowledge Gaps
- **700 isolated node(s):** `name`, `slug`, `version`, `scheme`, `favicon` (+695 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useClerkSupabase()` connect `Screen Body Layout` to `Edit Profile & Share Details`, `Pro Gate & Plans`, `Map Camera & Location`, `Auth & Root Layout`, `Notifications Inbox`, `KYC Document Selector`, `Landlord Dashboard`, `Listing Detail Amenities`, `KYC Rejection Notice`, `Property Detail Screen`, `Listing Wizard Amenities`, `Property Type Mappers`, `Visit Status & Dates`, `Profile Setup Form`, `Suggest Time Picker`, `Tenant Root Layout`, `Landlord Visits & Requests`, `Property Store Filters`, `Community 42`, `Clerk Auth Migrations`, `Community 44`, `Community 45`, `Visits Empty States`, `Community 49`, `KYC Benefits List`, `Community 82`, `Landlord Verification Sync`, `Home Index`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `run()` connect `Property Type Mappers` to `Filter Drawer`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ScreenHeader()` connect `AI Preferences Screen` to `Notifications Inbox`, `KYC Document Selector`, `Landlord Visits & Requests`, `Property Store Filters`, `KYC Rejection Notice`, `Listing Wizard Amenities`, `Visit Status & Dates`, `KYC Benefits List`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `useClerkSupabase()` (e.g. with `PropertyDetailScreen()` and `HomeTab()`) actually correct?**
  _`useClerkSupabase()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _702 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Edit Profile & Share Details` be split into smaller, more focused modules?**
  _Cohesion score 0.05155607751027599 - nodes in this community are weakly interconnected._
- **Should `Dependency Ecosystem` be split into smaller, more focused modules?**
  _Cohesion score 0.0392156862745098 - nodes in this community are weakly interconnected._