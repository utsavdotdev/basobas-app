# Graph Report - basobas-app  (2026-08-25)

## Corpus Check
- 268 files · ~166,657 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1584 nodes · 3115 edges · 103 communities (91 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `168e2367`
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
- [[_COMMUNITY_Community 34|Community 34]]
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
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Visits Empty States|Visits Empty States]]
- [[_COMMUNITY_Filter Modal|Filter Modal]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Filter Chips|Filter Chips]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_eSewa Payment Flow|eSewa Payment Flow]]
- [[_COMMUNITY_OTP Input|OTP Input]]
- [[_COMMUNITY_Landlord Properties Migration|Landlord Properties Migration]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Property Card|Property Card]]
- [[_COMMUNITY_KYC Benefits List|KYC Benefits List]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Tenant Visit Workflow|Tenant Visit Workflow]]
- [[_COMMUNITY_Listing Step 1 Types|Listing Step 1 Types]]
- [[_COMMUNITY_Community 61|Community 61]]
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
- `AuthGate()` --calls--> `useAuth()`  [INFERRED]
  app/_layout.tsx → src/hooks/useAuth.ts
- `PhoneEntryScreen()` --calls--> `useAuth()`  [INFERRED]
  app/(auth)/phone.tsx → src/hooks/useAuth.ts
- `LandlordTabsLayout()` --calls--> `useClerkSupabase()`  [INFERRED]
  app/(landlord)/(tabs)/_layout.tsx → src/hooks/useClerkSupabase.ts
- `LandlordDashboard()` --calls--> `useClerkSupabase()`  [INFERRED]
  app/(landlord)/(tabs)/index.tsx → src/hooks/useClerkSupabase.ts
- `LandlordDashboard()` --calls--> `useAuthStore`  [INFERRED]
  app/(landlord)/(tabs)/index.tsx → src/store/authStore.ts

## Import Cycles
- 1-file cycle: `metro.config.js -> metro.config.js`

## Hyperedges (group relationships)
- **eSewa Payment Function Pipeline** — docs_esewa_payment_testing_create_order, docs_esewa_payment_testing_verify_payment, docs_esewa_payment_testing_failure_callback, docs_esewa_payment_testing_status_polling [INFERRED 0.85]
- **Visit workflow visual concepts** — onboarding_visitillustration_visitillustration, onboarding_verifiedillustration_verifiedillustration, concept_visit_status_lifecycle, concept_post_visit_followup, concept_location_unlock_rule, app_vision_visit_request_workflow [INFERRED 0.85]
- **Landlord Listing Detail Data Flow** — previous_context_listing_detail_rewire, previous_context_owner_profile, previous_context_property_stats, previous_context_property_pause [INFERRED 0.85]

## Communities (103 total, 12 thin omitted)

### Community 0 - "Edit Profile & Share Details"
Cohesion: 0.06
Nodes (85): NEPAL_CITIES, styles, PublicLandlordProfileScreen(), styles, verificationLabel(), yearOf(), err(), getErrorMessage() (+77 more)

### Community 1 - "Pro Gate & Plans"
Cohesion: 0.22
Nodes (5): EsewaFormFields, PlanId, PurchasePlanState, styles, WEBVIEW_UA

### Community 2 - "Dependency Ecosystem"
Cohesion: 0.04
Nodes (51): dependencies, @clerk/expo, expo, expo-blur, expo-camera, expo-constants, expo-crypto, expo-document-picker (+43 more)

### Community 3 - "Map Camera & Location"
Cohesion: 0.16
Nodes (12): AndroidMap, AppMapViewProps, IosMap, MapAnnotationData, MapCameraPosition, MapCircleData, MapMarkerData, fmtKm() (+4 more)

### Community 4 - "Auth & Root Layout"
Cohesion: 0.12
Nodes (20): FOLLOW_UP_RESPONSE_LABELS, FollowUpResponse, formatVisitDate(), LANDLORD_FOLLOW_UP_LABELS, Button(), ButtonProps, LABEL_COLORS, styles (+12 more)

### Community 5 - "Notifications Inbox"
Cohesion: 0.13
Nodes (15): LANDLORD_TABS, NotificationsEmptyState(), initialsOf(), NotificationRow(), NotificationRowProps, NotificationSectionProps, NotificationsList(), NotificationsListProps (+7 more)

### Community 6 - "KYC Document Selector"
Cohesion: 0.07
Nodes (27): DocumentTypeSelector(), DocumentTypeSelectorProps, KYCDocumentType, Option, OPTIONS, styles, DocumentUploadCard(), DocumentUploadCardProps (+19 more)

### Community 7 - "App Configuration"
Cohesion: 0.06
Nodes (31): backgroundColor, foregroundImage, adaptiveIcon, config, newArchEnabled, package, permissions, versionCode (+23 more)

### Community 8 - "Function Entry Points"
Cohesion: 0.10
Nodes (26): getJwks(), getJwksUrl(), verifyClerkJwt(), arrayBufferToBase64(), checkEsewaTransactionStatus(), generateSignature(), getEsewaConfig(), grantUserPass() (+18 more)

### Community 9 - "AI Preferences Screen"
Cohesion: 0.13
Nodes (3): Props, ScreenHeader(), Props

### Community 10 - "Onboarding Flow"
Cohesion: 0.11
Nodes (16): FeatureSlide, s, SLIDES, MapIllustration(), styles, NextButton, NextButtonProps, OnboardingLayoutProps (+8 more)

### Community 11 - "Build Tooling"
Cohesion: 0.06
Nodes (33): devDependencies, @babel/core, babel-preset-expo, eslint, eslint-config-expo, eslint-config-prettier, jest, patch-package (+25 more)

### Community 12 - "Project Documentation"
Cohesion: 0.05
Nodes (51): Authentication & Onboarding Flow, Features List, Landlord Experience, Project Documentation Index, Product Vision, Tenant Experience, Visit Request Workflow, Address Privacy Rule (+43 more)

### Community 13 - "Landlord Dashboard"
Cohesion: 0.10
Nodes (7): LandlordDashboard, ActivityItem, EMPTY_STATS, InsightItem, LandlordDashboardProps, s, StatItem

### Community 14 - "Listing Detail Amenities"
Cohesion: 0.09
Nodes (18): AMENITY_ICONS, AMENITY_LABELS, AmenityRow, EXTRA_DETAIL_ICONS, EXTRA_DETAIL_LABELS, ExtraDetailRow, FORMATTER, { height: SCREEN_HEIGHT } (+10 more)

### Community 15 - "KYC Rejection Notice"
Cohesion: 0.09
Nodes (32): KYCRejectionNotice(), Props, styles, HERO_BY_STATUS, HeroConfig, KYCStatusHero(), Props, styles (+24 more)

### Community 16 - "Glass Dock Navigation"
Cohesion: 0.19
Nodes (11): DockTab, DockTabProps, styles, LANDLORD_DOCK_ITEMS, TENANT_DOCK_ITEMS, GlassDock(), styles, FloatingDock (+3 more)

### Community 17 - "Property Detail Screen"
Cohesion: 0.13
Nodes (15): AMENITY_ICONS, AMENITY_LABELS, AmenityRow, EXTRA_DETAIL_ICONS, EXTRA_DETAIL_LABELS, ExtraDetailRow, fmtNpr(), { height: SCREEN_HEIGHT } (+7 more)

### Community 18 - "Listing Wizard Amenities"
Cohesion: 0.22
Nodes (9): ProGateState, useProGate(), useProGateStore, ProGateModal(), MenuCard(), Props, MenuRow(), Props (+1 more)

### Community 19 - "Property Type Mappers"
Cohesion: 0.06
Nodes (50): DeclineRequestScreen(), REASONS, styles, run(), acceptReschedule(), acceptVisit(), cancelVisitRequest(), CreateVisitRequestInput (+42 more)

### Community 20 - "Screen Body Layout"
Cohesion: 0.27
Nodes (8): useClerkSupabase(), useProfileBootstrap(), useVisitRealtime(), LandlordKYCUploadScreen(), KYCUploadScreen(), TenantLayout(), FollowUpPrompt(), RescheduleVisitScreen()

### Community 21 - "Auth Loading Screens"
Cohesion: 0.14
Nodes (12): KYCInput, OnboardingInput, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 22 - "Visit Status & Dates"
Cohesion: 0.10
Nodes (26): LABEL_TO_CHIP, LandlordVisitsScreen(), initialsOf(), TenantVisitRequest, TenantVisitStatusUi, TIME_SLOT_LABELS, VisitStatusLabel, StatusChip() (+18 more)

### Community 23 - "Filter Drawer"
Cohesion: 0.13
Nodes (14): APK_SRC, APP_JSON, argv, BUMP_LEVELS, bumpVersion(), draft, GRADLE, main() (+6 more)

### Community 24 - "Visits Store State"
Cohesion: 0.14
Nodes (16): getNotificationRoute(), GetNotificationsOpts, NOTIFICATION_SELECT, NotificationRoute, NotificationSelectRow, Supabase, NotificationsState, Patch (+8 more)

### Community 25 - "Profile Setup Form"
Cohesion: 0.23
Nodes (10): usePurchasePlan(), useUserStore, AIPreferencesScreen(), EditProfileScreen(), Feature, FEATURES, Plan, PlanId (+2 more)

### Community 26 - "Suggest Time Picker"
Cohesion: 0.07
Nodes (39): c, sp, status, StatusKey, t, Card(), CardProps, styles (+31 more)

### Community 27 - "Notification Prefs Icons"
Cohesion: 0.15
Nodes (4): NotificationPrefsModal(), NotifRowProps, styles, ToggleProps

### Community 28 - "Schedule Visit Drawer"
Cohesion: 0.18
Nodes (10): DEFAULT_TIME_SLOTS, formatDateLong(), isPastDate(), MONTH_NAMES, MonthGridDay, ScheduleSelection, ScheduleVisitDrawer(), ScheduleVisitDrawerProps (+2 more)

### Community 29 - "Tenant Root Layout"
Cohesion: 0.18
Nodes (9): countSelected(), DetailRow, MediaItem, NewListingStep4(), parseJSON(), styles, parseMoney(), parseOptionalInt() (+1 more)

### Community 30 - "KYC Confirmation Screen"
Cohesion: 0.31
Nodes (7): maskPhone(), OTPVerificationScreen(), s, EditProfileScreen(), AuthStore, Profile, useAuthStore

### Community 31 - "Landlord KYC Upload"
Cohesion: 0.06
Nodes (33): 1. Property Discovery, 1. Receive Request, 2. Request Creation, 2. Take Action on Request, 3. Awaiting Response, 3. Post-Visit Follow-Up, 4. Managing Multiple Applicants, 4a. Accepted Path (+25 more)

### Community 32 - "Tenant KYC Upload"
Cohesion: 0.06
Nodes (31): 1. Unit Test Cases, 2. Integration Test Cases, 3. System Test Cases — End-to-End Journeys, 4. KYC AI Verification — Evaluation Test Cases, 5.2 Testing — Detailed Test Cases, 5. Security Test Cases, 6. Usability Test Cases, 7. Traceability Summary (+23 more)

### Community 33 - "Design System Docs"
Cohesion: 0.08
Nodes (25): UI & Figma Implementation Rules, BasoBas Design System, Border Radius, Button Styles (Primary/Secondary/Ghost), Buttons, Cards, Colors, Components (+17 more)

### Community 34 - "Community 34"
Cohesion: 0.28
Nodes (7): useLocation(), UseLocationResult, DEFAULT_LOCATION, LandlordLocationPicker(), styles, AppMapViewHandle, GeocodeResult

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
Cohesion: 0.40
Nodes (4): Props, Status, STATUS_STYLES, StatusPill()

### Community 39 - "Community 39"
Cohesion: 0.09
Nodes (21): { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }, GeoJsonFeature, ListingDetailScreen(), PropertyPreviewSheet(), PropertyPreviewSheetProps, sheetStyles, FilterTab, FORMATTER (+13 more)

### Community 40 - "Landlord Visits & Requests"
Cohesion: 0.07
Nodes (51): AllApplicantsScreen(), ChipKey, CHIPS, styles, UI_TO_PILL, styles, DetailsSharedScreen(), styles (+43 more)

### Community 41 - "Property Store Filters"
Cohesion: 0.22
Nodes (6): CityFilter, INITIAL_FILTERS, PropertyFilters, PropertyStore, SavedScreen(), PropertyPublic

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (9): IconComponent, ProPill(), Props, Size, Variant, Feature, PaymentSuccessScreen(), Status (+1 more)

### Community 43 - "Clerk Auth Migrations"
Cohesion: 0.14
Nodes (17): buildDays(), compactVisit(), DayOption, LandlordRescheduleScreen(), MONTHS, SLOT_START, styles, TIMES (+9 more)

### Community 44 - "Community 44"
Cohesion: 0.19
Nodes (10): AMENITIES, FilterDrawer(), FilterDrawerProps, PROPERTY_TYPES, SORT_OPTIONS, BhkFilter, usePropertyStore, BHK_FILTERS (+2 more)

### Community 45 - "Community 45"
Cohesion: 0.07
Nodes (37): ConfirmationScreen(), DocTypeChipProps, DocumentUploadZoneProps, KYCLandlordScreen(), styles, DocTypeChipProps, DocumentUploadZoneProps, KYCTenantScreen() (+29 more)

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (8): INITIAL_PROFILE, proDaysRemaining(), ProfileRow, ProSubscription, useProDaysRemaining(), UserProfile, UserState, UserStats

### Community 47 - "Visits Empty States"
Cohesion: 0.11
Nodes (15): EMPTY_COPY, OPEN_UI, TabKey, TABS, EmptyStateProps, styles, VisitEmptyState(), Skeleton() (+7 more)

### Community 48 - "Filter Modal"
Cohesion: 0.25
Nodes (6): AMENITIES, Amenity, FilterDrawer(), PROPERTY_TYPES, SortOption, SORTS

### Community 49 - "Community 49"
Cohesion: 0.32
Nodes (5): useAuth(), LandlordProfileTab(), STATUS_BADGE_STYLES, styles, VERIFICATION_COPY

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

### Community 55 - "Community 55"
Cohesion: 0.42
Nodes (6): useLandlordPendingCount(), useNotificationsRealtime(), createClerkSupabaseClient(), supabasePublic, useNotificationsStore, LandlordTabsLayout()

### Community 56 - "Property Card"
Cohesion: 0.33
Nodes (4): PropertyCardVariant, Props, STATUS_BADGES, StatusOverlay

### Community 57 - "KYC Benefits List"
Cohesion: 0.29
Nodes (5): dockBottomReserve(), ScreenBody(), ScreenBodyProps, ScreenBodyWithActionProps, LandlordDashboard()

### Community 58 - "Community 58"
Cohesion: 0.50
Nodes (4): CITIES, City, fmtNpr(), HomeTab()

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
Cohesion: 0.19
Nodes (11): DetailRowProps, styles, SummaryCardProps, initialKYC, initialProfile, OnboardingState, OnboardingKYCData, OnboardingPayload (+3 more)

### Community 72 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 73 - "Deno Function Config"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 81 - "KYC Fix Migration"
Cohesion: 0.22
Nodes (8): BasoBas — Project Documentation Index, Critical Rules — Read Before Anything Else, Documentation Files, Platform, Reading Order by Role, Rental Marketplace App for Nepal · Version 1.0, The Problem in One Paragraph, What is BasoBas?

### Community 87 - "Home Index"
Cohesion: 0.19
Nodes (8): KEYHOLE, morph, SplashScreen(), styles, AuthGate(), clerkTokenCache, AppReadyState, useAppReadyStore

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

### Community 110 - "Community 110"
Cohesion: 0.09
Nodes (19): pickFromOptions(), Props, SectionLabel(), ContextRules, DOCUMENT_MIME_TYPES, IMAGE_MIME_TYPES, MediaValidationContext, MediaValidationResult (+11 more)

## Knowledge Gaps
- **700 isolated node(s):** `name`, `slug`, `version`, `scheme`, `favicon` (+695 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useClerkSupabase()` connect `Screen Body Layout` to `Edit Profile & Share Details`, `Pro Gate & Plans`, `Map Camera & Location`, `Auth & Root Layout`, `Notifications Inbox`, `KYC Document Selector`, `Landlord Dashboard`, `Listing Detail Amenities`, `KYC Rejection Notice`, `Property Detail Screen`, `Property Type Mappers`, `Visit Status & Dates`, `Profile Setup Form`, `Suggest Time Picker`, `Tenant Root Layout`, `KYC Confirmation Screen`, `Community 34`, `Community 39`, `Landlord Visits & Requests`, `Property Store Filters`, `Community 42`, `Clerk Auth Migrations`, `Community 44`, `Community 45`, `Visits Empty States`, `Community 49`, `Community 55`, `KYC Benefits List`, `Community 58`, `Community 71`, `Home Index`, `Community 110`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `ScreenHeader()` connect `AI Preferences Screen` to `Notifications Inbox`, `KYC Document Selector`, `Landlord Visits & Requests`, `Property Store Filters`, `KYC Rejection Notice`, `Listing Wizard Amenities`, `Visit Status & Dates`, `Profile Setup Form`, `Community 61`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `run()` connect `Property Type Mappers` to `Filter Drawer`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `useClerkSupabase()` (e.g. with `PropertyDetailScreen()` and `HomeTab()`) actually correct?**
  _`useClerkSupabase()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _702 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Edit Profile & Share Details` be split into smaller, more focused modules?**
  _Cohesion score 0.06121212121212121 - nodes in this community are weakly interconnected._
- **Should `Dependency Ecosystem` be split into smaller, more focused modules?**
  _Cohesion score 0.0392156862745098 - nodes in this community are weakly interconnected._