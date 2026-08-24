# Graph Report - basobas-app  (2026-08-24)

## Corpus Check
- 251 files · ~149,760 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1452 nodes · 2829 edges · 104 communities (93 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e583340`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 96|Community 96]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 98|Community 98]]
- [[_COMMUNITY_Community 99|Community 99]]
- [[_COMMUNITY_Community 100|Community 100]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 102|Community 102]]

## God Nodes (most connected - your core abstractions)
1. `useClerkSupabase()` - 77 edges
2. `ok()` - 67 edges
3. `err()` - 67 edges
4. `getErrorMessage()` - 65 edges
5. `ScreenHeader()` - 29 edges
6. `c` - 27 edges
7. `font` - 25 edges
8. `useVisitsStore` - 24 edges
9. `useUserStore` - 21 edges
10. `radius` - 21 edges

## Surprising Connections (you probably didn't know these)
- `LandlordTabsLayout()` --calls--> `useClerkSupabase()`  [INFERRED]
  app/(landlord)/(tabs)/_layout.tsx → src/hooks/useClerkSupabase.ts
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

## Communities (104 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (42): DetailRowProps, styles, SummaryCardProps, DocTypeChipProps, DocumentUploadZoneProps, KYCLandlordScreen(), styles, DocTypeChipProps (+34 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (25): ChipKey, CHIPS, styles, UI_TO_PILL, LandlordRow, font, radius, status (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (51): dependencies, @clerk/expo, expo, expo-blur, expo-camera, expo-constants, expo-crypto, expo-document-picker (+43 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (38): PrimaryButton(), Props, styles, c, sp, Button(), ButtonProps, LABEL_COLORS (+30 more)

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (18): buildDays(), compactVisit(), DayOption, LandlordRescheduleScreen(), MONTHS, SLOT_START, styles, TIMES (+10 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (4): NotificationPrefsModal(), NotifRowProps, styles, ToggleProps

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (5): Props, ScreenHeader(), Props, GENERAL_REASONS, REASON_INFO

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (39): 1. Property Discovery, 1. Receive Request, 2. Request Creation, 2. Take Action on Request, 3. Awaiting Response, 3. Post-Visit Follow-Up, 48-Hour Reminder, 4. Managing Multiple Applicants (+31 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (15): AMENITY_ICONS, AMENITY_LABELS, AmenityRow, EXTRA_DETAIL_ICONS, EXTRA_DETAIL_LABELS, ExtraDetailRow, FORMATTER, { height: SCREEN_HEIGHT } (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.21
Nodes (10): useLocation(), UseLocationResult, DEFAULT_LOCATION, LandlordLocationPicker(), styles, MapMarkerData, NewListingStep2(), GeocodeResult (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (6): CityFilter, INITIAL_FILTERS, PropertyFilters, PropertyStore, SavedScreen(), PropertyPublic

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (29): Add New Listing Flow (4 Steps), Add New Listing Prompt (Bottom of List), All Applicants Screen, BasoBas — Landlord Experience, Everything the Landlord Sees and Does, Filter Tab Bar, Header, Landlord Bottom Navigation Dock (+21 more)

### Community 12 - "Community 12"
Cohesion: 0.06
Nodes (33): backgroundColor, foregroundImage, adaptiveIcon, config, newArchEnabled, package, permissions, googleMaps (+25 more)

### Community 13 - "Community 13"
Cohesion: 0.07
Nodes (27): BasoBas — Tenant Experience, Category Chips (Horizontal Scroll), Content Area (Scrollable), Content Sections (Top to Bottom), Everything the Tenant Sees and Does, Filter Options, Gallery Header, Header (Fixed, Always Visible) (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (16): FeatureSlide, s, SLIDES, MapIllustration(), styles, NextButton, NextButtonProps, OnboardingLayoutProps (+8 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (17): devDependencies, @babel/core, babel-preset-expo, eslint, eslint-config-expo, eslint-config-prettier, jest, patch-package (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.19
Nodes (11): DockTab, DockTabProps, styles, LANDLORD_DOCK_ITEMS, TENANT_DOCK_ITEMS, GlassDock(), styles, FloatingDock (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (15): getJwks(), getJwksUrl(), verifyClerkJwt(), arrayBufferToBase64(), checkEsewaTransactionStatus(), generateSignature(), getEsewaConfig(), grantUserPass() (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.11
Nodes (18): BasoBas — Authentication & Onboarding Flow, Every Step, Every Rule, Every Decision, KYC Verification States, OTP Technical Rules, Profile Setup Rules, Returning User Flow, Screen 01 — Landing Screen, Screen 02 — Phone Entry Screen (+10 more)

### Community 19 - "Community 19"
Cohesion: 0.06
Nodes (101): NEPAL_CITIES, styles, err(), getErrorMessage(), ok(), Result, DashboardActivity, getLandlordDashboard() (+93 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (17): 1. Privacy First — The Address Rule, 2. No Broker, No Commission, 3. Verification Builds Trust, 4. Phone Number Is Identity, 5. Broker Replacement, Not Broker Supplement, BasoBas — Product Vision, Core Principles, Dual Role Users (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.07
Nodes (16): dockBottomReserve(), ScreenBody(), ScreenBodyProps, ScreenBodyWithActionProps, LandlordDashboard, ActivityItem, CITIES, City (+8 more)

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (15): BasoBas Design System, Border Radius, Buttons, Cards, Colors, Components, Do's and Don'ts, Elevation (+7 more)

### Community 23 - "Community 23"
Cohesion: 0.43
Nodes (4): useLandlordPendingCount(), createClerkSupabaseClient(), supabasePublic, LandlordTabsLayout()

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (5): EsewaFormFields, PlanId, PurchasePlanState, styles, WEBVIEW_UA

### Community 25 - "Community 25"
Cohesion: 0.06
Nodes (32): KEYHOLE, morph, SplashScreen(), styles, AuthGate(), ConfirmationScreen(), maskPhone(), OTPVerificationScreen() (+24 more)

### Community 26 - "Community 26"
Cohesion: 0.15
Nodes (12): 1. Create an eSewa Order, 2. Verify the Database, 3. Simulate the eSewa Callback (Verify Payment), 4. Simulate a Failure Callback, 5. Check Payment Status (Polling), End-to-End Test Flow, eSewa v2 (Test/UAT) Payment — Testing Guide, Flow Overview (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.21
Nodes (16): AllApplicantsScreen(), useClerkSupabase(), DeclineRequestScreen(), REASONS, styles, DetailsSharedScreen(), ShareDetailsScreen(), RequestDetailScreen() (+8 more)

### Community 28 - "Community 28"
Cohesion: 0.06
Nodes (31): 1. Unit Test Cases, 2. Integration Test Cases, 3. System Test Cases — End-to-End Journeys, 4. KYC AI Verification — Evaluation Test Cases, 5.2 Testing — Detailed Test Cases, 5. Security Test Cases, 6. Usability Test Cases, 7. Traceability Summary (+23 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (8): BasoBas — Project Documentation Index, Critical Rules — Read Before Anything Else, Documentation Files, Platform, Reading Order by Role, Rental Marketplace App for Nepal · Version 1.0, The Problem in One Paragraph, What is BasoBas?

### Community 30 - "Community 30"
Cohesion: 0.22
Nodes (4): MenuRowProps, MenuRowWithSubtextProps, styles, ToggleProps

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (7): BasoBas — Complete Feature List, Core Features — Free for All Users, Every Feature, Who It Serves, and Whether It Is Free or Pro, Features That Will Never Be Gated, Free Tier Limits, Post-MVP Roadmap Features, Pro Features — Tenant Only, Paid Plan

### Community 32 - "Community 32"
Cohesion: 0.29
Nodes (5): BG_MAP, ChipColor, ChipVariant, Props, TEXT_MAP

### Community 33 - "Community 33"
Cohesion: 0.25
Nodes (5): DocumentUploadCard(), DocumentUploadCardProps, styles, styles, UploadPlaceholder()

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (5): OTPCell, OTPCellProps, OTPInput, OTPInputProps, styles

### Community 36 - "Community 36"
Cohesion: 0.24
Nodes (6): { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }, GeoJsonFeature, CameraPosition, ClusterFeature, MapBounds, PropertyPin

### Community 37 - "Community 37"
Cohesion: 0.13
Nodes (11): AMENITIES_APARTMENT, AMENITIES_HOUSE, AMENITIES_ROOM, AMENITIES_STUDIO, BATHROOM_OPTIONS, FieldErrors, FURNISHING, KITCHEN_OPTIONS (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.33
Nodes (4): PropertyCardVariant, Props, STATUS_BADGES, StatusOverlay

### Community 39 - "Community 39"
Cohesion: 0.11
Nodes (17): EMPTY_COPY, OPEN_UI, TabKey, TABS, Props, STATUS_STYLES, VisitStatus, VisitStatusBadge() (+9 more)

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (11): formatDuration(), styles, VideoUploadCard(), VideoUploadCardProps, VideoUploadCardStatus, LandlordKYCUploadScreen(), styles, VideoSlotState (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.40
Nodes (3): PropertyType, styles, TYPES

### Community 42 - "Community 42"
Cohesion: 0.40
Nodes (3): MediaItem, MediaType, styles

### Community 43 - "Community 43"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 44 - "Community 44"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 45 - "Community 45"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 46 - "Community 46"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 47 - "Community 47"
Cohesion: 0.23
Nodes (10): usePurchasePlan(), useUserStore, AIPreferencesScreen(), EditProfileScreen(), Feature, FEATURES, Plan, PlanId (+2 more)

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (3): config, { getDefaultConfig }, { withNativeWind }

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 60 - "Community 60"
Cohesion: 0.20
Nodes (9): IconComponent, ProPill(), Props, Size, Variant, Feature, PaymentSuccessScreen(), Status (+1 more)

### Community 64 - "Community 64"
Cohesion: 0.18
Nodes (9): countSelected(), DetailRow, MediaItem, NewListingStep4(), parseJSON(), styles, parseMoney(), parseOptionalInt() (+1 more)

### Community 65 - "Community 65"
Cohesion: 0.13
Nodes (15): AMENITY_ICONS, AMENITY_LABELS, AmenityRow, EXTRA_DETAIL_ICONS, EXTRA_DETAIL_LABELS, ExtraDetailRow, fmtNpr(), { height: SCREEN_HEIGHT } (+7 more)

### Community 68 - "Community 68"
Cohesion: 0.13
Nodes (16): asRecord(), asStringArray(), FOLLOW_UP_RESPONSE_LABELS, MONTH_INDEX, parseAvailableFrom(), parseDateLabel(), PRICE_FORMATTER, PropertyPrivateLocation (+8 more)

### Community 76 - "Community 76"
Cohesion: 0.24
Nodes (10): COL_WIDTH, formatTime(), KYCStatusTimeline(), Props, resolveActiveStep(), Step, StepKey, STEPS (+2 more)

### Community 77 - "Community 77"
Cohesion: 0.20
Nodes (10): HERO_BY_STATUS, HeroConfig, KYCStatusHero(), Props, styles, Props, Status, STATUS_STYLES (+2 more)

### Community 78 - "Community 78"
Cohesion: 0.12
Nodes (15): DocumentTypeSelector(), DocumentTypeSelectorProps, KYCDocumentType, Option, OPTIONS, styles, DocumentUploadCardStatus, Benefit (+7 more)

### Community 79 - "Community 79"
Cohesion: 0.18
Nodes (15): CreateVisitRequestInput, canTransition(), deriveStatusUi(), PatchLandlord, PatchTenant, Supabase, TenantRow, TRANSITIONS (+7 more)

### Community 80 - "Community 80"
Cohesion: 0.25
Nodes (8): INITIAL_PROFILE, proDaysRemaining(), ProfileRow, ProSubscription, useProDaysRemaining(), UserProfile, UserState, UserStats

### Community 81 - "Community 81"
Cohesion: 0.18
Nodes (10): DEFAULT_TIME_SLOTS, formatDateLong(), isPastDate(), MONTH_NAMES, MonthGridDay, ScheduleSelection, ScheduleVisitDrawer(), ScheduleVisitDrawerProps (+2 more)

### Community 82 - "Community 82"
Cohesion: 0.22
Nodes (7): FilterTab, FORMATTER, MyPropertiesScreen(), MyPropertiesScreenProps, STATUS_STYLES, TABS, LandlordPropertySummary

### Community 83 - "Community 83"
Cohesion: 0.25
Nodes (6): AMENITIES, Amenity, FilterDrawer(), PROPERTY_TYPES, SortOption, SORTS

### Community 84 - "Community 84"
Cohesion: 0.39
Nodes (4): useProfileBootstrap(), useVisitRealtime(), TenantLayout(), VisitRequestRow

### Community 85 - "Community 85"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 86 - "Community 86"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 88 - "Community 88"
Cohesion: 0.21
Nodes (9): getRadiusCircleSizeForKm(), RadiusMapView(), RadiusMapViewProps, RING_COLORS, fmtKm(), INITIAL_CAMERA, MapCenter, styles (+1 more)

### Community 89 - "Community 89"
Cohesion: 0.19
Nodes (10): AMENITIES, FilterDrawer(), FilterDrawerProps, PROPERTY_TYPES, SORT_OPTIONS, BhkFilter, usePropertyStore, BHK_FILTERS (+2 more)

### Community 90 - "Community 90"
Cohesion: 0.17
Nodes (11): ProGateState, useProGate(), useProGateStore, ProGateModal(), MenuCard(), Props, MenuRow(), Props (+3 more)

### Community 91 - "Community 91"
Cohesion: 0.20
Nodes (10): scripts, android, format, ios, lint, postinstall, prebuild, start (+2 more)

### Community 92 - "Community 92"
Cohesion: 0.14
Nodes (13): KYCRejectionNotice(), Props, styles, formatDateTime(), LandlordVerificationScreen(), styles, Props, SectionLabel() (+5 more)

### Community 93 - "Community 93"
Cohesion: 0.09
Nodes (32): LABEL_TO_CHIP, LandlordVisitsScreen(), FilterKey, FILTERS, inFilter(), isOpen(), styles, UI_TO_PILL (+24 more)

### Community 94 - "Community 94"
Cohesion: 0.50
Nodes (4): FollowUpResponse, FollowUpOptionCard(), FollowUpOptionCardProps, styles

### Community 95 - "Community 95"
Cohesion: 0.29
Nodes (7): ListingDetailScreen(), PropertyPreviewSheet(), PropertyPreviewSheetProps, sheetStyles, PropertyCard(), PROPERTY_STATUS_COLORS, formatMonthlyPrice()

### Community 96 - "Community 96"
Cohesion: 0.47
Nodes (4): calculateRiskScore(), clamp(), RISK_SCORE_WEIGHTS, RiskScoreInput

### Community 97 - "Community 97"
Cohesion: 0.25
Nodes (7): AndroidMap, AppMapViewHandle, AppMapViewProps, IosMap, MapAnnotationData, MapCameraPosition, MapCircleData

### Community 98 - "Community 98"
Cohesion: 0.70
Nodes (3): fuzzyNameMatch(), levenshtein(), normalizeName()

### Community 99 - "Community 99"
Cohesion: 0.60
Nodes (3): normalizeNepalPhone(), PhoneNormalizationResult, stripDialingNoise()

### Community 100 - "Community 100"
Cohesion: 0.09
Nodes (28): styles, SLOT_START, styles, SLOT_START, styles, compactPrice(), FOLLOW_UP_ROWS, styles (+20 more)

### Community 101 - "Community 101"
Cohesion: 0.40
Nodes (4): main, name, private, version

## Knowledge Gaps
- **657 isolated node(s):** `name`, `slug`, `version`, `scheme`, `favicon` (+652 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useClerkSupabase()` connect `Community 27` to `Community 0`, `Community 1`, `Community 3`, `Community 4`, `Community 8`, `Community 9`, `Community 10`, `Community 19`, `Community 21`, `Community 23`, `Community 24`, `Community 25`, `Community 39`, `Community 40`, `Community 47`, `Community 60`, `Community 64`, `Community 65`, `Community 78`, `Community 82`, `Community 84`, `Community 88`, `Community 89`, `Community 90`, `Community 92`, `Community 93`, `Community 95`, `Community 100`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `ScreenHeader()` connect `Community 6` to `Community 1`, `Community 3`, `Community 4`, `Community 100`, `Community 40`, `Community 10`, `Community 78`, `Community 47`, `Community 19`, `Community 25`, `Community 27`, `Community 92`, `Community 93`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `PrimaryButton()` connect `Community 3` to `Community 0`, `Community 40`, `Community 92`, `Community 78`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `useClerkSupabase()` (e.g. with `PropertyDetailScreen()` and `HomeTab()`) actually correct?**
  _`useClerkSupabase()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _657 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05803571428571429 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10227272727272728 - nodes in this community are weakly interconnected._